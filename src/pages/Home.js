import React, { useState } from 'react';
import useModal from '../hooks/useModal';
import Modal from '../components/Modal';

const Home = () => {
  const taskDefault = { status: 'todo', title: '', description: '' };
  const [errors, setErrors] = useState({});
  const { isOpen, closeModal, openModal } = useModal();
  const [task, setTask] = useState(taskDefault);

  const [tasks, setTasks] = useState([
    { status: 'todo', title: 'Estudar IA', description: 'Treinar', id: '1' },
    { status: 'todo', title: 'Ler crime e castigo', description: 'Ler', id: '2' },
    { status: 'todo', title: 'Aprender fazer dadinho de tapioca', description: 'Ler', id: '3' },
    { status: 'todo', title: 'Limpar a casa', description: 'Ler', id: '4' },
    { status: 'todo', title: 'Lavar roupas', description: 'Ler', id: '5' },
    { status: 'todo', title: 'Consertar filtro', description: 'Ler', id: '6' },
    { status: 'todo', title: 'Fartlek', description: 'Ler', id: '7' },
    { status: 'todo', title: 'Aprender Japonês', description: 'Ler', id: '8' },
    { status: 'todo', title: 'Tomar água', description: 'Ler', id: '9' },
  ]);

  const [searchedText, setSearchedText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pages = Math.ceil(tasks.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [edit, setEdit] = useState(false);

  const newId = () => Math.floor(100000000 + Math.random() * 900000000).toString();
  const handleSearchedText = event => {
    setCurrentPage(1);
    setSearchedText(event.target.value);
  };

  const filteredTaks = tasks
    .filter(task => task.title.toLowerCase().includes(searchedText.toLowerCase()))
    .sort((x, y) => {
      const titleX = x.title.toLowerCase();
      const titleY = y.title.toLowerCase();
      return titleX < titleY ? -1 : titleX > titleY ? 1 : 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleInput = event => {
    const { name, value } = event.target;
    setTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(pages);
  };

  const handleEditTask = id => {
    const editTask = tasks.find(task => task.id === id);
    setEdit(true);
    setTask(editTask);
    openModal();
  };

  const handleDeleteTask = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleSubmit = event => {
    event.preventDefault();

    let isValid = true;

    Object.keys(task).forEach(property => {
      if (task[property].trim() === '') {
        setErrors(prevState => ({ ...prevState, [property]: 'Preenchimento obrigatório' }));
        isValid = false;
      } else {
        setErrors(prevState => ({ ...prevState, [property]: '' }));
      }
    });

    if (isValid) {
      if (edit) {
        const filteredTasks = tasks.filter(t => t.id !== task.id);
        console.log(filteredTaks);
        setTasks(filteredTasks.concat(task));
        console.log(tasks);
      } else {
        setTasks(prevState => prevState.concat({ ...task, id: newId() }));
      }

      setTask(taskDefault);
      setErrors({});
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={task.title} placeholder="Título" onChange={handleInput} />
          <span>{errors?.title}</span>
          <textarea name="description" value={task.description} placeholder="Descrição" onChange={handleInput} />
          <span>{errors?.description}</span>
          <footer>
            <button type="submit">
              <i className="ph-fill ph-push-pin"></i>
            </button>
          </footer>
        </form>
      </Modal>
      <header>
        <input type="text" value={searchedText} onChange={handleSearchedText} placeholder="Pesquisar por título" />
        <button onClick={openModal}>Adicionar</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTaks.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td id="action">
                <button onClick={() => handleEditTask(task.id)}>
                  <i className="ph-fill ph-pencil"></i>
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  <i className="ph-fill ph-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <button onClick={handleFirstPage}>1</button>
        <button onClick={handlePreviousPage}>
          <i className="ph-fill ph-skip-back"></i>
        </button>
        {currentPage === 0 ? 1 : currentPage}
        <button onClick={handleNextPage}>
          <i className="ph-fill ph-skip-forward"></i>
        </button>
        <button onClick={handleLastPage}>{pages === 0 ? 1 : pages}</button>
      </footer>
    </div>
  );
};

export default Home;
