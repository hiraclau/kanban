const Column = ({ tasks, columnId, onDragStart, onDragOver, onDrop, children }) => {
  return (
    <div className="column" onDragOver={onDragOver} onDrop={e => onDrop(e, columnId)}>
      <h3>{children}</h3>
      <div className="column-content">
        <ul>
          {tasks.map((task, index) => (
            <li key={index} draggable onDragStart={e => onDragStart(e, task)}>
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Column;
