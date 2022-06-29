import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import AllCharacters from './components/AllCharacters';
import SingleCharacter from './components/SingleCharacter';

describe('render header', () => {
  const { getByText } = render(<App />);
  expect(getByText('Rick and Morty')).toBeInTheDocument();
});
