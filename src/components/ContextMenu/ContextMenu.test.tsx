import React from 'react'; // Явный импорт React
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextMenu from './ContextMenu';

describe('ContextMenu Component', () => {
  const mockHandleCloseMenu = jest.fn();
  const mockHandleDeleteTask = jest.fn();
  const mockHandleEditTask = jest.fn();
  const contextMenu = { id: '1', x: 100, y: 200 };

  beforeEach(() => {
    render(
      <ContextMenu
        contextMenu={contextMenu}
        handleCloseMenu={mockHandleCloseMenu}
        handleDeleteTask={mockHandleDeleteTask}
        handleEditTask={mockHandleEditTask}
      />
    );
  });

  test('renders context menu with correct position', () => {
    const contextMenuElement = screen.getByTestId('context-menu');
    expect(contextMenuElement).toBeInTheDocument();
    expect(contextMenuElement).toHaveStyle(`top: ${contextMenu.y}px`);
    expect(contextMenuElement).toHaveStyle(`left: ${contextMenu.x}px`);
  });

  test('calls handleEditTask when "Edit" button is clicked', () => {
    const editButton = screen.getByText('Редактировать');
    fireEvent.click(editButton);
    expect(mockHandleEditTask).toHaveBeenCalledTimes(1);
  });

  test('calls handleDeleteTask when "Delete" button is clicked', () => {
    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);
    expect(mockHandleDeleteTask).toHaveBeenCalledTimes(1);
  });

  test('calls handleCloseMenu when "Close" button is clicked', () => {
    const closeButton = screen.getByText('Закрыть');
    fireEvent.click(closeButton);
    expect(mockHandleCloseMenu).toHaveBeenCalledTimes(1);
  });
});