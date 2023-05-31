import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Kanban from './pages/Kanban';
import Home from './pages/Home';

const App = () => {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
};

export default App;
