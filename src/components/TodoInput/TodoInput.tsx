import React, { useState } from 'react';
import './TodoInput.css';

interface TodoInputProps {
  showTodoList: () => void;
  createTask: (value: string) => void;
  buttonShow: boolean;
}

const TodoInput = ({ showTodoList, createTask, buttonShow }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void=> {
    e.preventDefault();
    createTask(inputValue);
    setInputValue('');
  };

  return (
    <div className="todo-input__container">
      <div className="todo-input__box">
        <button
          className={buttonShow ? 'todo-input__button' : 'todo-input__button button--rotate'}
          onClick={showTodoList}
          data-testid="todo-input-button"
        ></button>
        
        <form className="todo-input__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="todo-input__input"
            placeholder="What need to be done"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
        
        
      </div>
    </div>
  );
};

export default TodoInput;