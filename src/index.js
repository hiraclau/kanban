import { createRoot } from 'react-dom/client';
import Board from './pages/Board';
import { TaskProvider } from './contexts/TaskContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <TaskProvider>
    <Board />
  </TaskProvider>,
);
