// import React from 'react';
import { ContextMenuProps } from '../App/App';
import './ContextMenu.css';

interface ContextProps {
  contextMenu: ContextMenuProps;
  handleCloseMenu: () => void;
  handleDeleteTask: () => void;
  handleEditTask: () => void;
}

const ContextMenu = ({ contextMenu, handleCloseMenu, handleDeleteTask, handleEditTask }: ContextProps) => {
  return (
    <div
      className="context-menu"
      data-testid="context-menu"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
    >
      <button className="context-menu__button button--edit" onClick={handleEditTask}>
        Редактировать
      </button>
      <button className="context-menu__button button--delete" onClick={handleDeleteTask}>
        Удалить
      </button>
      <button className="context-menu__button button--close" onClick={handleCloseMenu}>
        Закрыть
      </button>
    </div>
  );
};

export default ContextMenu;