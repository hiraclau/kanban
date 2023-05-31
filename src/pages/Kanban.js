import React, { useState, useContext } from 'react';
import Column from '../components/Column';
import Modal from '../components/Modal';
import useModal from '../hooks/useModal';
import useColumn from '../hooks/useColumn';
import { TaskContext } from '../contexts/TaskContext';

const Kanban = () => {
  const { tasks, addTask } = useContext(TaskContext);
  const { dragTask, dropTask, dragTaskOver } = useColumn();

  return (
    <>
      <div className="board">
        <Column
          tasks={tasks.filter(task => task.status === 'todo')}
          sourceColumn="todo"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-lightbulb"></i>A fazer
        </Column>
        <Column
          tasks={tasks.filter(task => task.status === 'doing')}
          sourceColumn="doing"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-arrows-counter-clockwise"></i>
          Fazendo
        </Column>
        <Column
          tasks={tasks.filter(task => task.status === 'done')}
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

export default Kanban;
