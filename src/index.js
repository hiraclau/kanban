import { createRoot } from 'react-dom/client';
import Board from './pages/Board';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Board />);
