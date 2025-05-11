# Cursor-Based Task Management System

An innovative task management platform that leverages cursor movements and gestures for intuitive task organization and management.

## Features

- **Cursor-Based Task Creation**
  - Draw-to-create tasks using cursor movements
  - Right-click context menu for quick task addition
  - Edge-drag gesture for new task creation

- **Visual Task Organization**
  - 2D canvas for task arrangement
  - Gesture-based grouping and ungrouping
  - Circular motion completion marking

- **Priority Visualization**
  - Vertical positioning for priority indication
  - Horizontal drag for urgency adjustment
  - Color-coded due date proximity

- **Focus Mode**
  - Double-click zoom for detailed view
  - Mouse wheel size/importance adjustment
  - Click-and-hold task isolation

## Technical Stack

- Frontend: React with TypeScript
- Canvas: Fabric.js for 2D rendering
- Gesture Recognition: Custom algorithm
- State Management: Redux Toolkit
- Storage: IndexedDB with Cloud Sync
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/task-management.git
cd task-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Project Structure

```
task-management/
├── src/
│   ├── components/     # React components
│   ├── core/          # Core functionality
│   ├── gestures/      # Gesture recognition
│   ├── store/         # State management
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── public/            # Static assets
└── tests/            # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
