import { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const useColumn = () => {
  const { addTask, moveTask } = useContext(TaskContext);
  const [draggedTask, setDraggedTask] = useState(null);

  const dragTask = (event, task) => {
    setDraggedTask(task);
  };

  const dragTaskOver = event => {
    event.preventDefault();
  };

  const dropTask = (event, destinationColumn) => {
    event.preventDefault();

    if (draggedTask) {
      moveTask(draggedTask, destinationColumn);
    }
  };

  return { dragTask, dropTask, dragTaskOver };
};

export default useColumn;
