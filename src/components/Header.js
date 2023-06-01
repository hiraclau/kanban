import { Link } from 'react-router-dom';

const Header = ({ page, openModal }) => {
  return (
    <header id="menu">
      {page === 'kanban' ? (
        <Link to="/">
          <i className="ph ph-house"></i> Home
        </Link>
      ) : (
        <>
          <a onClick={openModal}>
            <i className="ph ph-file-plus"></i> Nova tarefa
          </a>
          <Link to="/kanban">
            <i className="ph ph-kanban"></i> Kanban
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
