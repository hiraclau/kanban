import React, { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import useModal from '../hooks/useModal';
import usePagination from '../hooks/usePagination';
import useError from '../hooks/useError';
import Modal from '../components/Modal';

const Home = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const { errors, valid, cleanErrors } = useError();
  const { data, searchedText, currentPage, pages, firstPage, previousPage, nextPage, lastPage, search } =
    usePagination();
  const { task, loadTask, fillTask, cleanTask, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [edit, setEdit] = useState(false);

  const handleEditTask = id => {
    setEdit(true);
    loadTask(id);
    openModal();
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (valid()) {
      if (edit) {
        updateTask(task);
      } else {
        addTask(task);
      }
      cleanTask();
      cleanErrors();
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={task.title} placeholder="Título" onChange={fillTask} />
          <span>{errors?.title}</span>
          <textarea name="description" value={task.description} placeholder="Descrição" onChange={fillTask} />
          <span>{errors?.description}</span>
          <footer>
            <button type="submit">
              <i className="ph-fill ph-push-pin"></i>
            </button>
          </footer>
        </form>
      </Modal>
      <header>
        <input type="text" value={searchedText} onChange={search} placeholder="Pesquisar por título" />
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
          {data.map((task, index) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td id="action">
                <button onClick={() => handleEditTask(task.id)}>
                  <i className="ph-fill ph-pencil"></i>
                </button>
                <button onClick={() => deleteTask(task.id)}>
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
  );
};

export default Home;
