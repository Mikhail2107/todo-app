// import React from 'react';
import { useRef, useState } from 'react';
import Filters from '../Filters/Filters';
import TodoList from '../TodoList/TodoList';
import TodoTitle from '../TodoTitle/TodoTitle';
import TodoInput from '../TodoInput/TodoInput';
import './App.css';

export interface TodoItemProps {
  id: string;
  text: string;
  done: boolean;
}

export interface ContextMenuProps {
  id: string | null;
  x: number;
  y: number;
}
export type FilterItems = 'All' | 'Active' | 'Completed'

function App() {
  const [todoList, setTodoList] = useState<TodoItemProps[]>([
    { id: crypto.randomUUID(), text: 'Cooked', done: false },
    { id: crypto.randomUUID(), text: 'Painted', done: false },
    { id: crypto.randomUUID(), text: 'Washed', done: false },
  ]);
  const [contextMenu, setContextMenu] = useState<ContextMenuProps>({ id: null, x: 0, y: 0 });
  const [buttonShow, setButtonShow] = useState<boolean>(true);
  const [filter, setFilter] = useState<FilterItems>('All');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const checkedTask = useRef<number>(0);
  checkedTask.current = todoList.filter((item) => !item.done).length;

  const filteredTasks:TodoItemProps[] = todoList.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.done;
    if (filter === 'Completed') return task.done;
    return true;
  });

  const handleToggle = (id: string): void => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const createTask = (value: string): void => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    setTodoList((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmedValue, done: false },
    ]);
  };

  const handleClearCompleted = (): void => {
    setTodoList((prev) => prev.filter((task) => !task.done));
  };

  const handleContextMenu = (id: string, x: number, y: number): void => {
    setContextMenu({ id, x, y });
  };

  const handleEditTask = (id: string): void => {
    setEditingTaskId(id);
    handleCloseMenu()
  };

  const saveEditedTask = (id: string, newText: string): void => {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo))
    );
    setEditingTaskId(null); 
  };

  const handleDeleteTask = (id: string): void => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
    handleCloseMenu();
  };

  const handleCloseMenu = (): void => {
    setContextMenu({ id: null, x: 0, y: 0 });
  };

  const showTodoList = (): void => {
    setButtonShow((prev) => !prev);
  };

  return (
    <main>
      <div className="todo__container">
        <div className="todo__header">
          <TodoTitle />
        </div>
        <div className="todo__box">
          <div className="todo-body">
            <TodoInput
              showTodoList={showTodoList}
              createTask={createTask}
              buttonShow={buttonShow}
            />
            <TodoList
              todoList={filteredTasks}
              handleToggle={handleToggle}
              contextMenu={contextMenu}
              handleContextMenu={handleContextMenu}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleCloseMenu={handleCloseMenu}
              buttonShow={buttonShow}
              editingTaskId={editingTaskId}
              saveEditedTask={saveEditedTask}
            />
            <Filters
              checkedTask={checkedTask}
              onFilterChange={(filter:FilterItems) => setFilter(filter)}
              handleClearCompleted={handleClearCompleted}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;