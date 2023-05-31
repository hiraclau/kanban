import { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const usePagination = () => {
  const { tasks } = useContext(TaskContext);
  const [searchedText, setSearchedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const pages = Math.ceil(tasks.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const search = event => {
    setCurrentPage(1);
    setSearchedText(event.target.value);
  };

  const data = tasks
    .filter(task => task.title.toLowerCase().includes(searchedText.toLowerCase()))
    .sort((x, y) => {
      const titleX = x.title.toLowerCase();
      const titleY = y.title.toLowerCase();
      return titleX < titleY ? -1 : titleX > titleY ? 1 : 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const firstPage = () => {
    setCurrentPage(1);
  };

  const nextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const lastPage = () => {
    setCurrentPage(pages);
  };

  return { data, search, searchedText, currentPage, pages, firstPage, previousPage, nextPage, lastPage };
};

export default usePagination;
