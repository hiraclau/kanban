const Column = ({ tasks, sourceColumn, onDragStart, onDragOver, onDrop, children }) => {
  return (
    <div className="column" onDragOver={onDragOver} onDrop={e => onDrop(e, sourceColumn)}>
      <h3>{children}</h3>
      <div className="column-content">
        <ul>
          {tasks.map((task, index) => (
            <li key={index} draggable onDragStart={e => onDragStart(e, task)}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Column;
