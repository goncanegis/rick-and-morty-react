import React, { useState, useEffect } from 'react';
import { HeaderProps } from '../interfaces';
import styles from './Header.module.css';
import filterIcon from '../assets/filter.svg';
import Modal from './Modal';

const Header: React.FC<HeaderProps> = ({
  title,
  handleFilter,
  selectedCharacter,
  filterUsed,
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <header>
      <h1>{title}</h1>
      <button
        className={styles.primaryBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Filter results"
      >
        <img src={filterIcon} alt="filter results" style={{ width: '30px' }} />
      </button>
      {isOpen && (
        <Modal heading="Filter" setIsOpen={setIsOpen} data-testid="modal">
          <form>
            <div className={styles.formControl}>
              <label htmlFor="rick">Rick</label>
              <input
                type="radio"
                value="Rick"
                id="rick"
                name="rick"
                onChange={(e) => handleFilter(e.target.value)}
                checked={selectedCharacter === 'Rick' && filterUsed}
              />
            </div>

            <div className={styles.formControl}>
              <label htmlFor="morty">Morty</label>
              <input
                type="radio"
                value="Morty"
                id="morty"
                name="morty"
                onChange={(e) => handleFilter(e.target.value)}
                checked={selectedCharacter === 'Morty' && filterUsed}
              />
            </div>
          </form>
        </Modal>
      )}
    </header>
  );
};

export default Header;
