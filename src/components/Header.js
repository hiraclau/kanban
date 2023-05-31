import { Link } from 'react-router-dom';

const Header = ({ page }) => {
  return <header>{page === 'kanban' ? <Link to="/">Home</Link> : <Link to="/kanban">Kanban</Link>}</header>;
};

export default Header;
