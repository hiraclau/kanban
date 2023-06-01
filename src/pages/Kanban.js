import React, { useState, useContext } from 'react';
import Column from '../components/Column';
import useColumn from '../hooks/useColumn';
import { TaskContext } from '../contexts/TaskContext';
import Header from '../components/Header';

const Kanban = () => {
  const { tasksByStatus } = useContext(TaskContext);
  const { dragTask, dropTask, dragTaskOver } = useColumn();

  return (
    <>
      <Header page="kanban" />
      <div className="board">
        <Column
          tasks={tasksByStatus('todo')}
          sourceColumn="todo"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-lightbulb"></i> A fazer
        </Column>
        <Column
          tasks={tasksByStatus('doing')}
          sourceColumn="doing"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-arrows-counter-clockwise"></i> Fazendo
        </Column>
        <Column
          tasks={tasksByStatus('done')}
          sourceColumn="done"
          onDragStart={dragTask}
          onDragOver={dragTaskOver}
          onDrop={dropTask}>
          <i className="ph ph-check"></i> Feito
        </Column>
      </div>
    </>
  );
};

export default Kanban;
