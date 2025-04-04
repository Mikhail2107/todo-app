
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TodoInput from './TodoInput';

test('renders button with correct class when buttonShow is true', () => {
  render(
    <TodoInput
      showTodoList={() => {}}
      createTask={() => {}}
      buttonShow={true}
    />
  );

  const button = screen.getByTestId('todo-input-button'); 
  expect(button).toHaveClass('todo-input__button');
  expect(button).not.toHaveClass('button--rotate');
});