import React, { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import useModal from '../hooks/useModal';
import usePagination from '../hooks/usePagination';
import useError from '../hooks/useError';
import Modal from '../components/Modal';
import Header from '../components/Header';

const Home = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const { errors, valid, cleanErrors } = useError();
  const { data, searchedText, currentPage, pages, firstPage, previousPage, nextPage, lastPage, search } =
    usePagination();
  const { task, loadTask, fillTask, cleanTask, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [edit, setEdit] = useState(false);

  const status = {
    todo: 'A fazer',
    doing: 'Fazendo',
    done: 'Feito',
  };

  const action = {
    true: updateTask,
    false: addTask,
  };

  const handleEditTask = id => {
    setEdit(true);
    cleanErrors();
    loadTask(id);
    openModal();
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (valid()) {
      action[edit](task);
      cleanTask();
      cleanErrors();
      closeModal();
    }
  };

  const handleOpenModal = () => {
    setEdit(false);
    cleanTask();
    cleanErrors();
    openModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="title">Título</label>
            <input type="text" name="title" aria-label="title" value={task.title} onChange={fillTask} />
            <span>{errors?.title}</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Descrição</label>
            <textarea name="description" aria-label="description" value={task.description} onChange={fillTask} />
            <span>{errors?.description}</span>
          </div>
          <button type="submit">{edit ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
      </Modal>
      <Header page="home" openModal={handleOpenModal} />
      <div className="dashboard">
        <header id="menu-home">
          <input
            type="text"
            value={searchedText}
            onChange={search}
            placeholder="Pesquisar por título"
            aria-label="Username"
          />
        </header>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((task, index) => (
              <tr key={index}>
                <td data-label="Título:">{task.title}</td>
                <td data-label="Descrição:">{task.description}</td>
                <td data-label="Status:">{status[task.status]}</td>
                <td id="action">
                  <button aria-label="edit" id="edit" onClick={() => handleEditTask(task.id)}>
                    <i className="ph-fill ph-pencil"></i>
                  </button>
                  <button aria-label="delete" id="delete" onClick={() => deleteTask(task.id)}>
                    <i className="ph-fill ph-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <button aria-label="first-page" onClick={firstPage}>
            1
          </button>
          <button aria-label="previous-page" onClick={previousPage}>
            <i className="ph-fill ph-skip-back"></i>
          </button>
          <span aria-label="current-page">{currentPage === 0 ? 1 : currentPage}</span>
          <button aria-label="next-page" onClick={nextPage}>
            <i className="ph-fill ph-skip-forward"></i>
          </button>
          <button aria-label="last-page" onClick={lastPage}>
            {pages === 0 ? 1 : pages}
          </button>
        </footer>
      </div>
    </>
  );
};

export default Home;
