import React from 'react';
import { TaskProvider } from './contexts/TaskContext';
import Kanban from './pages/Kanban';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
};

export default App;
