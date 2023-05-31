import { Link } from 'react-router-dom';

const Header = ({ page, openModal }) => {
  return (
    <header id="menu">
      {page === 'kanban' ? (
        <Link to="/">Home</Link>
      ) : (
        <>
          <a onClick={openModal}>Nova tarefa</a>
          <Link to="/kanban">Kanban</Link>
        </>
      )}
    </header>
  );
};

export default Header;
