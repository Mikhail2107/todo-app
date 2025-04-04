import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

const mockTodoList = [
  { id: '1', text: 'Task 1', done: false },
  { id: '2', text: 'Task 2', done: true },
];

const mockHandleToggle = jest.fn();
const mockHandleContextMenu = jest.fn();
const mockHandleEditTask = jest.fn();
const mockHandleDeleteTask = jest.fn();
const mockHandleCloseMenu = jest.fn();
const mockSaveEditedTask = jest.fn();

describe('TodoList Component', () => {
  const defaultProps = {
    todoList: mockTodoList,
    handleToggle: mockHandleToggle,
    contextMenu: { id: null, x: 0, y: 0 },
    handleContextMenu: mockHandleContextMenu,
    handleCloseMenu: mockHandleCloseMenu,
    handleDeleteTask: mockHandleDeleteTask,
    handleEditTask: mockHandleEditTask,
    saveEditedTask: mockSaveEditedTask,
    editingTaskId: null,
    buttonShow: true,
  };

  beforeEach(() => {
    render(<TodoList {...defaultProps} />);
  });

  test('renders todo list items correctly', () => {
    mockTodoList.forEach((todo) => {
      const todoItem = screen.getByText(todo.text);
      expect(todoItem).toBeInTheDocument();
    });
  });

  test('calls handleContextMenu when right-clicking on a task', () => {
    const taskLabel = screen.getByTestId('todo-item-1');
    fireEvent.contextMenu(taskLabel); 

    expect(mockHandleContextMenu).toHaveBeenCalledWith('1', expect.any(Number), expect.any(Number));
  });


  test('displays context menu when contextMenu.id is set', () => {
    const updatedProps = {
      ...defaultProps,
      contextMenu: { id: '1', x: 100, y: 200 }, 
    };

    render(<TodoList {...updatedProps} />);

    const contextMenu = screen.getByText('Редактировать');
    expect(contextMenu).toBeInTheDocument();
  });

  test('deletes a task when delete button is clicked in context menu', () => {
    const updatedProps = {
      ...defaultProps,
      contextMenu: { id: '1', x: 100, y: 200 }, 
    };

    render(<TodoList {...updatedProps} />);

    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteTask).toHaveBeenCalledWith('1');
  });
});