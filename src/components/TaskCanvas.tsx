import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addTask, updateTaskPosition, updateTaskPriority } from '../store/taskSlice';
import { GestureRecognizer } from '../core/GestureRecognizer';

interface Point {
  x: number;
  y: number;
}

const TaskCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPoints, setDrawingPoints] = useState<Point[]>([]);
  const gestureRecognizer = useRef(new GestureRecognizer());
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth - 64,
        height: window.innerHeight - 200,
        backgroundColor: '#ffffff',
      });

      // Initialize gesture recognition
      setupGestureRecognition();

      return () => {
        fabricCanvasRef.current?.dispose();
      };
    }
  }, []);

  const setupGestureRecognition = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    canvas.on('mouse:down', (options) => {
      if (options.e.button === 2) { // Right click
        handleRightClick(options.e);
      } else {
        setIsDrawing(true);
        setDrawingPoints([{ x: options.e.offsetX, y: options.e.offsetY }]);
      }
    });

    canvas.on('mouse:move', (options) => {
      if (isDrawing) {
        setDrawingPoints(prev => [...prev, { x: options.e.offsetX, y: options.e.offsetY }]);
      }
    });

    canvas.on('mouse:up', () => {
      if (isDrawing) {
        handleDrawingComplete();
      }
      setIsDrawing(false);
    });

    // Prevent context menu on right click
    canvasRef.current?.addEventListener('contextmenu', (e) => e.preventDefault());
  };

  const handleRightClick = (event: MouseEvent) => {
    // TODO: Implement context menu for quick task creation
  };

  const handleDrawingComplete = () => {
    if (drawingPoints.length < 3) return;

    const gesture = gestureRecognizer.current.recognize(drawingPoints);
    if (gesture) {
      // Create a new task based on the recognized gesture
      const task = {
        id: Date.now().toString(),
        title: 'New Task',
        position: { x: drawingPoints[0].x, y: drawingPoints[0].y },
        priority: 1,
        completed: false,
      };
      dispatch(addTask(task));
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg shadow-lg" />
    </div>
  );
};

export default TaskCanvas; 