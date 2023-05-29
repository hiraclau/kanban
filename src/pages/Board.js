import React, { useState, useContext } from 'react';
import Column from '../components/Column';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';
import useColumn from '../hooks/useColumn';
import { TaskContext } from '../contexts/TaskContext';

const Board = () => {
  const { tasks, addTask } = useContext(TaskContext);
  const { isOpen, closeModal, openModal } = useModal();
  const { dragTask, dropTask, dragTaskOver } = useColumn();

  const handleOnBlur = event => {
    addTask(event.target.value);
    closeModal();
  };

  const handleOnKeyDown = event => {
    if (event.key === 'Enter') {
      addTask(event.target.value);
      closeModal();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <input type="text" onBlur={handleOnBlur} onKeyDown={handleOnKeyDown} />
      </Modal>
      <div className="board">
        <Column
          tasks={tasks.todo}
          sourceColumn="todo"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-lightbulb"></i>A fazer
          <button onClick={openModal}>+</button>
        </Column>
        <Column
          tasks={tasks.doing}
          sourceColumn="doing"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-arrows-counter-clockwise"></i>
          Fazendo
        </Column>
        <Column
          tasks={tasks.done}
          sourceColumn="done"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-check"></i>
          Feito
        </Column>
      </div>
    </>
  );
};

export default Board;
