import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('exibe os elementos corretamente', () => {
  render(<App />);

  const conteudoElement = screen.getByText('Descrição');

  expect(conteudoElement).toBeInTheDocument();
});
