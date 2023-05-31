import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskDefault = { status: 'todo', title: '', description: '' };

  const [task, setTask] = useState(taskDefault);

  const [tasks, setTasks] = useState([
    { status: 'todo', title: 'Estudar IA', description: 'Treinar', id: '1' },
    { status: 'todo', title: 'Ler crime e castigo', description: 'Ler', id: '2' },
    { status: 'todo', title: 'Aprender fazer dadinho de tapioca', description: 'Ler', id: '3' },
    { status: 'todo', title: 'Limpar a casa', description: 'Ler', id: '4' },
    { status: 'todo', title: 'Lavar roupas', description: 'Ler', id: '5' },
    { status: 'todo', title: 'Consertar filtro', description: 'Ler', id: '6' },
    { status: 'todo', title: 'Fartlek', description: 'Ler', id: '7' },
    { status: 'todo', title: 'Aprender Japonês', description: 'Ler', id: '8' },
    { status: 'todo', title: 'Tomar água', description: 'Ler', id: '9' },
  ]);

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
    setTask(prevState => ({ ...prevState, [name]: value }));
  };

  const cleanTask = () => setTask(taskDefault);

  // const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] });

  // const addTask = task => {
  //   const todo = 'todo';
  //   const updatedTasks = { ...tasks };
  //   updatedTasks[todo] = [...updatedTasks[todo], task];
  //   setTasks(updatedTasks);
  // };

  // const moveTask = (draggedTask, destinationColumn) => {
  //   const updatedTasks = { ...tasks };
  //   const sourceColumn = Object.keys(updatedTasks).find(column => updatedTasks[column].includes(draggedTask));

  //   if (sourceColumn !== destinationColumn) {
  //     updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(task => task !== draggedTask);
  //     updatedTasks[destinationColumn] = [...updatedTasks[destinationColumn], draggedTask];
  //     setTasks(updatedTasks);
  //   }
  // };

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
