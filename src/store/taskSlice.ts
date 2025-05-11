import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  position: {
    x: number;
    y: number;
  };
  priority: number;
  completed: boolean;
  dueDate?: string;
}

interface TaskState {
  items: Task[];
  selectedTaskId: string | null;
}

const initialState: TaskState = {
  items: [],
  selectedTaskId: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    updateTaskPosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) {
        task.position = action.payload.position;
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: number }>) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    selectTask: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskId = action.payload;
    },
  },
});

export const {
  addTask,
  updateTaskPosition,
  updateTaskPriority,
  toggleTaskCompletion,
  selectTask,
} = taskSlice.actions;

export default taskSlice.reducer; 