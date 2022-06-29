import React from 'react';
import styles from './Modal.module.css';
import closeIcon from '../assets/close.svg';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  heading: string;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ setIsOpen, heading, children }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{heading}</h5>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <img src={closeIcon} alt="close modal" />
            </button>
          </div>

          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
