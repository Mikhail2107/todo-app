import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Filters from './Filters';

describe('Filters Component', () => {
  const mockOnFilterChange = jest.fn();
  const mockHandleClearCompleted = jest.fn();
  const checkedTask = { current: 5 }; 

  beforeEach(() => {
    render(
      <Filters
        checkedTask={checkedTask as React.RefObject<number>}
        onFilterChange={mockOnFilterChange}
        handleClearCompleted={mockHandleClearCompleted}
      />
    );
  });

  test('renders filter buttons and count correctly', () => {
    const countElement = screen.getByText('5 items left');
    expect(countElement).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: 'All' });
    const activeButton = screen.getByRole('button', { name: 'Active' });
    const completedButton = screen.getByRole('button', { name: 'Completed' });

    expect(allButton).toBeInTheDocument();
    expect(activeButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
  });

  test('applies "active" class to the clicked filter button', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    const activeButton = screen.getByRole('button', { name: 'Active' });

    expect(allButton).toHaveClass('active');
    expect(activeButton).not.toHaveClass('active');

    fireEvent.click(activeButton);

    expect(allButton).not.toHaveClass('active');
    expect(activeButton).toHaveClass('active');
  });

  test('calls onFilterChange with correct filter value when a filter button is clicked', () => {
    const activeButton = screen.getByRole('button', { name: 'Active' });
    const completedButton = screen.getByRole('button', { name: 'Completed' });

    fireEvent.click(activeButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith('Active');

    fireEvent.click(completedButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith('Completed');
  });

  test('calls handleClearCompleted when "Clear completed" button is clicked', () => {
    const clearButton = screen.getByRole('button', { name: 'Clear completed' });

    fireEvent.click(clearButton);
    expect(mockHandleClearCompleted).toHaveBeenCalled();
  });
});