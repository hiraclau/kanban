import React, { useState } from 'react';
import Column from '../components/Column';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';

const Board = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const [tasks, setTasks] = useState({
    todo: ['Lavar roupas', 'Limpar a casa', 'Fartlek'],
    doing: ['Aprender muscle-up', 'Estudar IA'],
    done: ['Assistir Guardiões da Galaxia Vol. 3'],
  });

  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (event, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = (event, columnId) => {
    event.preventDefault();

    if (draggedTask) {
      const updatedTasks = { ...tasks };
      const sourceColumn = Object.keys(updatedTasks).find(column => updatedTasks[column].includes(draggedTask));
      console.log(sourceColumn);
      const destinationColumn = columnId;
      console.log(destinationColumn);

      if (sourceColumn !== destinationColumn) {
        updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter(task => task !== draggedTask);
        updatedTasks[destinationColumn] = [...updatedTasks[destinationColumn], draggedTask];
        setTasks(updatedTasks);
      }
    }
  };

  const handleAdd = e => {
    const isNotEmpty = e.target.value ? (e.target.value.trim() !== '' ? true : false) : false;
    if (isNotEmpty) {
      const updatedTasks = { ...tasks };
      updatedTasks['todo'] = [e.target.value, ...updatedTasks['todo']];
      setTasks(updatedTasks);
      closeModal();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <input
          type="text"
          onBlur={handleAdd}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleAdd(event);
            }
          }}
        />
      </Modal>
      <div className="board">
        <Column
          tasks={tasks.todo}
          columnId="todo"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <i class="ph ph-lightbulb"></i>A fazer
          <button onClick={openModal}>+</button>
        </Column>
        <Column
          tasks={tasks.doing}
          columnId="doing"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <i class="ph ph-arrows-counter-clockwise"></i>
          Fazendo
        </Column>
        <Column
          tasks={tasks.done}
          columnId="done"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <i class="ph ph-check"></i>
          Feito
        </Column>
      </div>
    </>
  );
};

export default Board;
