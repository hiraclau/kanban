import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Kanban from './pages/Kanban';

const App = () => {
  return (
    <TaskProvider>
      <Kanban />
    </TaskProvider>
  );
};

export default App;
