import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });

  const addTask = task => {
    const todo = 'todo';
    const updatedTasks = { ...tasks };
    updatedTasks[todo] = [...updatedTasks[todo], task];
    setTasks(updatedTasks);
  };

  const moveTask = (draggedTask, destinationColumn) => {
    const updatedTasks = { ...tasks };
    const sourceColumn = Object.keys(updatedTasks).find(column => updatedTasks[column].includes(draggedTask));

    if (sourceColumn !== destinationColumn) {
      updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(task => task !== draggedTask);
      updatedTasks[destinationColumn] = [...updatedTasks[destinationColumn], draggedTask];
      setTasks(updatedTasks);
    }
  };

  const taskContextValue = {
    tasks,
    addTask,
    moveTask,
  };

  return <TaskContext.Provider value={taskContextValue}>{children}</TaskContext.Provider>;
};
