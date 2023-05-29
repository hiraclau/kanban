import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Board from './pages/Board';

const App = () => {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
};

export default App;
