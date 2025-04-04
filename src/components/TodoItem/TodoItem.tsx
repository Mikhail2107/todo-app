import React from 'react';
import './TodoItem.css';

interface TodoItemProps {
  id: string;
  text: string;
  done: boolean;
}

const TodoItem = ({
  data,
  onToggle,
  onContextMenu,
}: {
  data: TodoItemProps;
  onToggle: (id: string) => void;
  onContextMenu: (x: number, y: number) => void;
}) => {
 
  const handleContextMenu = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault(); 
    onContextMenu(event.clientX, event.clientY);
  };

  return (
    
      <label
        htmlFor={data.id}
        className="todo-item__label"
        onContextMenu={handleContextMenu} 
        data-testid={`todo-item-${data.id}`}
      >
        <input
          type="checkbox"
          className="todo-item__input"
          name="todo-item"
          id={data.id}
          checked={data.done}
          onChange={() => onToggle(data.id)}
        />
        <span className="todo-item__checkbox"></span>
        <span
          className={data.done ? "todo-item__title title--checked" : "todo-item__title"}
        >
          {data.text}
        </span>
      </label>    
  );
};

export default TodoItem;