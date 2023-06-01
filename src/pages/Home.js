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
    cleanErrors();
    setEdit(true);
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
            <input type="text" name="title" value={task.title} onChange={fillTask} />
            <span>{errors?.title}</span>
          </div>
          <div className="input-wrapper">
            <label htmlFor="description">Descrição</label>
            <textarea name="description" value={task.description} onChange={fillTask} />
            <span>{errors?.description}</span>
          </div>
          <button type="submit">Criar</button>
        </form>
      </Modal>
      <Header page="home" openModal={handleOpenModal} />
      <div className="dashboard">
        <header id="menu-home">
          <input type="text" value={searchedText} onChange={search} placeholder="Pesquisar por título" />
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
                  <button id="edit" onClick={() => handleEditTask(task.id)}>
                    <i className="ph-fill ph-pencil"></i>
                  </button>
                  <button id="delete" onClick={() => deleteTask(task.id)}>
                    <i className="ph-fill ph-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <button onClick={firstPage}>1</button>
          <button onClick={previousPage}>
            <i className="ph-fill ph-skip-back"></i>
          </button>
          {currentPage === 0 ? 1 : currentPage}
          <button onClick={nextPage}>
            <i className="ph-fill ph-skip-forward"></i>
          </button>
          <button onClick={lastPage}>{pages === 0 ? 1 : pages}</button>
        </footer>
      </div>
    </>
  );
};

export default Home;
