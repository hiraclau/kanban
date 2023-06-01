import { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const useError = () => {
  const { task } = useContext(TaskContext);
  const [errors, setErrors] = useState({});

  const valid = () => {
    let isValid = true;
    Object.keys(task).forEach(property => {
      if (task[property] === '') {
        setErrors(prevState => ({ ...prevState, [property]: 'Preenchimento obrigatório' }));
        isValid = false;
      } else {
        setErrors(prevState => ({ ...prevState, [property]: '' }));
      }
    });
    return isValid;
  };

  const cleanErrors = () => setErrors({});
  return { errors, valid, cleanErrors };
};

export default useError;
