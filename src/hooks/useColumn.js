import { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const useColumn = () => {
  const { addTask, moveTask } = useContext(TaskContext);
  const [draggedTask, setDraggedTask] = useState(null);

  const dragTask = (event, task) => {
    setDraggedTask(task);
  };

  const dragTaskOverColumn = event => {
    event.preventDefault();
  };

  const dropTask = (event, destinationColumn) => {
    event.preventDefault();

    if (draggedTask) {
      moveTask(draggedTask, destinationColumn);
    }
  };

  const addTaskOn = event => {
    addTask(event.target.value);
  };

  return { dragTask, dropTask, addTaskOn, dragTaskOverColumn };
};

export default useColumn;
