interface Point {
  x: number;
  y: number;
}

export class GestureRecognizer {
  private readonly CIRCLE_THRESHOLD = 0.7;
  private readonly LINE_THRESHOLD = 0.8;

  recognize(points: Point[]): string | null {
    if (points.length < 3) return null;

    // Normalize points
    const normalizedPoints = this.normalizePoints(points);

    // Check for different gestures
    if (this.isCircle(normalizedPoints)) {
      return 'circle';
    } else if (this.isLine(normalizedPoints)) {
      return 'line';
    }

    return null;
  }

  private normalizePoints(points: Point[]): Point[] {
    // Find bounding box
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));

    const width = maxX - minX;
    const height = maxY - minY;
    const scale = Math.max(width, height);

    // Normalize points to 0-1 range
    return points.map(p => ({
      x: (p.x - minX) / scale,
      y: (p.y - minY) / scale
    }));
  }

  private isCircle(points: Point[]): boolean {
    // Calculate center point
    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    // Calculate average radius
    const radius = points.reduce((sum, p) => {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      return sum + Math.sqrt(dx * dx + dy * dy);
    }, 0) / points.length;

    // Calculate variance in radius
    const variance = points.reduce((sum, p) => {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      const currentRadius = Math.sqrt(dx * dx + dy * dy);
      return sum + Math.pow(currentRadius - radius, 2);
    }, 0) / points.length;

    // Check if variance is low enough to be considered a circle
    return variance < this.CIRCLE_THRESHOLD;
  }

  private isLine(points: Point[]): boolean {
    // Calculate the angle between consecutive points
    const angles: number[] = [];
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
      angles.push(Math.abs(angle1 - angle2));
    }

    // Check if angles are consistent (close to 0 or 180 degrees)
    const isConsistent = angles.every(angle => 
      angle < this.LINE_THRESHOLD || Math.abs(angle - Math.PI) < this.LINE_THRESHOLD
    );

    return isConsistent;
  }
} 