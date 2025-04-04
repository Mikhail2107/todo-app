import React, { useState } from 'react';
import { FilterItems } from '../App/App';
import './Filters.css';

interface FilterProps {
  checkedTask: React.RefObject<number>;
  onFilterChange: (filter: FilterItems) => void;
  handleClearCompleted: () => void;
}
interface FilterItemsProps{
  id: number;
  value: FilterItems;
}

const filters: FilterItemsProps[] = [
  { id: 0, value: 'All' },
  { id: 1, value: 'Active' },
  { id: 2, value: 'Completed' },
];

const Filters = ({ checkedTask, onFilterChange, handleClearCompleted }: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleFilterClick = (filter: FilterItems) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filters-container">
      <div className="filters-box">
        <span className="filter-count">{checkedTask.current} items left</span>
        <ul className="filters-list">
          {filters.map((filter) => (
            <li key={filter.id} className="filters-item">
              <input
                type="button"
                data-testid={'filter-item-button'}
                className={`filter-button ${activeFilter === filter.value ? 'active' : ''}`}
                value={filter.value}
                onClick={() => handleFilterClick(filter.value)}
              />
            </li>
          ))}
        </ul>
        <input
          className="filter-button button--clear"
          type="button"
          value="Clear completed"
          onClick={handleClearCompleted}
        />
      </div>
    </div>
  );
};

export default Filters;