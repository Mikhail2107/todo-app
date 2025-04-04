// import React from 'react';
import ContextMenu from '../ContextMenu/ContextMenu';
import TodoItem from '../TodoItem/TodoItem';
import { ContextMenuProps, TodoItemProps } from '../App/App';

import './TodoList.css';
import { useEffect, useState } from 'react';

interface TodoListProps {
  todoList: TodoItemProps[];
  handleToggle: (id: string) => void;
  contextMenu: ContextMenuProps;
  handleContextMenu: (id: string, x: number, y: number) => void;
  handleEditTask: (id:string) => void;
  handleDeleteTask: (id: string) => void;
  handleCloseMenu: () => void;
  saveEditedTask:(id: string, newText: string) => void;
  editingTaskId: string | null;
  buttonShow: boolean;
}

const TodoList = ({todoList, 
                    handleToggle, 
                    contextMenu, 
                    handleContextMenu, 
                    handleCloseMenu, 
                    buttonShow, 
                    handleDeleteTask,
                    handleEditTask,
                    editingTaskId,
                    saveEditedTask}: TodoListProps) => {

  const [editValue, setEditValue] = useState<string>(''); 
  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = todoList.find((task) => task.id === editingTaskId);
      if (taskToEdit) {
        setEditValue(taskToEdit.text);
      }
    }
  }, [editingTaskId, todoList]);

  return (
    <div className="todo-list__container">      
      <div className="todo-list__box">
        <ul className="todo-list__menu">     
       { buttonShow && todoList.map((todo) => (
        <li key={todo.id} className="todo-item">
          {editingTaskId === todo.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEditedTask(todo.id, editValue);
                    }}
                  >
                    <input
                      type="text"
                      className="todo-list__input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                  </form>
                ): 
          (<TodoItem
          key={todo.id}
          data={todo}
          onToggle={handleToggle}
          onContextMenu={(x, y) => handleContextMenu(todo.id, x, y)}
        />)}
        </li>))}        
      </ul>
      </div>
      {contextMenu.id && (
        <ContextMenu handleCloseMenu={handleCloseMenu}
                      handleDeleteTask={() => handleDeleteTask(contextMenu.id!)}
                      contextMenu={contextMenu}
                      handleEditTask={() => handleEditTask(contextMenu.id!)}/>
      )}
    </div>
  );
};

export default TodoList;