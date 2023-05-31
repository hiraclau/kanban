import React, { createContext, useState } from 'react';
import mockData from '../mock/tasks.json';
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskDefault = { status: 'todo', title: '', description: '' };

  const [task, setTask] = useState(taskDefault);

  const [tasks, setTasks] = useState(mockData);

  const newId = () => Math.floor(100000000 + Math.random() * 900000000).toString();

  const addTask = task => {
    setTasks(prevState => prevState.concat({ ...task, id: newId() }));
  };

  const updateTask = task => {
    const filteredTasks = tasks.filter(t => t.id !== task.id);
    setTasks(filteredTasks.concat(task));
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const moveTask = (draggedTask, destinationColumn) => {
    const filteredTasks = tasks.filter(task => task.id !== draggedTask.id);
    draggedTask.status = destinationColumn;
    setTasks(filteredTasks.concat(draggedTask));
  };
  const loadTask = id => {
    const editTask = tasks.find(task => task.id === id);
    setTask(editTask);
  };
  const fillTask = event => {
    const { name, value } = event.target;
    setTask(prevState => ({ ...prevState, [name]: value.trim() }));
  };

  const cleanTask = () => setTask(taskDefault);

  const taskContextValue = {
    tasks,
    task,
    addTask,
    updateTask,
    deleteTask,
    fillTask,
    loadTask,
    moveTask,
    cleanTask,
  };

  return <TaskContext.Provider value={taskContextValue}>{children}</TaskContext.Provider>;
};
