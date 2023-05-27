import React, { useEffect } from 'react';

const Modal = ({ name, children, isOpen, openModal, closeModal }) => {
  useEffect(() => {
    const handleOutsideClick = event => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return <>{isOpen && <div className="modal">{children}</div>}</>;
};

export default Modal;
