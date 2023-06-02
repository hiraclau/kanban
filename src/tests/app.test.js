import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('exibe pagina inicial', () => {
  render(<App />);

  const column = screen.getByText('Descrição');

  expect(column).toBeInTheDocument();
});

test('exibe modal', () => {
  render(<App />);

  fireEvent.click(screen.getByText('Nova tarefa'));

  const send = screen.getByText('Criar');

  expect(send).toBeInTheDocument();
});

test('cria uma nova tarefa', () => {
  render(<App />);

  const newTask = screen.getByText('Nova tarefa');
  fireEvent.click(newTask);

  const title = screen.getByLabelText('title');
  fireEvent.change(title, { target: { value: 'L-sit' } });

  const description = screen.getByLabelText('description');

  fireEvent.change(description, { target: { value: 'Sustentar o corpo em uma posição em forma de "L"' } });

  const send = screen.getByText('Criar');
  fireEvent.click(send);

  const search = screen.getByPlaceholderText('Pesquisar por título');
  fireEvent.change(search, { target: { value: 'L-sit' } });

  const status = screen.getByText('A fazer');
  expect(status).toBeInTheDocument();
});

test('pesquisar tarefa existente', () => {
  render(<App />);

  const search = screen.getByPlaceholderText('Pesquisar por título');
  fireEvent.change(search, { target: { value: 'Fazer uma caminhada' } });

  const status = screen.getByText('Feito');
  expect(status).toBeInTheDocument();
});

test('ir para a próxima página', () => {
  render(<App />);

  const nextPage = screen.getByLabelText('next-page');
  fireEvent.click(nextPage);

  const currentPage = screen.getByLabelText('current-page').textContent;
  expect(currentPage).toBe('2');
});

test('ir para a página anterior', () => {
  render(<App />);

  const nextPage = screen.getByLabelText('next-page');
  fireEvent.click(nextPage);
  fireEvent.click(nextPage);

  const previousPage = screen.getByLabelText('previous-page');
  fireEvent.click(previousPage);

  const currentPage = screen.getByLabelText('current-page').textContent;
  expect(currentPage).toBe('2');
});

test('ir para a primeira página', () => {
  render(<App />);

  const nextPage = screen.getByLabelText('next-page');
  fireEvent.click(nextPage);
  fireEvent.click(nextPage);

  const firtPage = screen.getByLabelText('first-page');
  fireEvent.click(firtPage);

  const currentPage = screen.getByLabelText('current-page').textContent;
  expect(currentPage).toBe('1');
});

test('ir para a última página', () => {
  render(<App />);

  const lastPage = screen.getByLabelText('last-page');
  fireEvent.click(lastPage);

  const currentPage = screen.getByLabelText('current-page').textContent;
  expect(currentPage).toBe('5');
});

test('excluir tarefa', () => {
  render(<App />);

  const deleteButtons = screen.getAllByLabelText('delete');
  const deleteButton = deleteButtons[2];
  fireEvent.click(deleteButton);

  const search = screen.getByPlaceholderText('Pesquisar por título');
  fireEvent.change(search, { target: { value: 'Aprender a tocar um instrumento' } });

  const status = screen.queryByText('A fazer');
  expect(status).toBeNull();
});

test('editar tarefa', () => {
  render(<App />);

  const editButtons = screen.getAllByLabelText('edit');
  const editButton = editButtons[0];
  fireEvent.click(editButton);

  const newTitle = 'Comprar ingredientes de dadinho de tapioca';
  const title = screen.getByLabelText('title');
  fireEvent.change(title, { target: { value: newTitle } });

  const description = screen.getByLabelText('description');

  fireEvent.change(description, {
    target: { value: 'Comprar queijo coalho, tapioca granulada, leite, óleo.' },
  });

  const send = screen.getByText('Editar');
  fireEvent.click(send);

  const search = screen.getByPlaceholderText('Pesquisar por título');
  fireEvent.change(search, { target: { value: newTitle } });

  const status = screen.getByText('A fazer');
  expect(status).toBeInTheDocument();
});
