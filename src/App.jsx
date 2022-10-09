import React from 'react';
import './App.css';

function App() {
  const [board, setBoard] = React.useState([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Пойти в магазин' },
        { id: 2, title: 'Сделать пет проект' },
        { id: 3, title: 'Найти работу' },
      ],
    },
    {
      id: 2,
      title: 'Проверить',
      items: [
        { id: 4, title: 'Купить подарок' },
        { id: 5, title: 'Поцеловать жену' },
        { id: 6, title: 'Переехать' },
      ],
    },
    {
      id: 3,
      title: 'Сделано',
      items: [
        { id: 7, title: 'Пройти курс английского' },
        { id: 8, title: 'Нарисовать картину' },
        { id: 9, title: 'Подстричься' },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState(null);

  const dragHandler = (e, boardItem, item) => {
    e.target.style.boxShadow = 'none';
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = boardItem.items.indexOf(item);
    boardItem.items.splice(dropIndex + 1, 0, currentItem);

    setBoard(
      board.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray';
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandeler = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const dropCartHandler = (e, boards) => {
    e.target.style.boxShadow = 'none';
    boards.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoard(
      board.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
  };

  return (
    <div className="app">
      {board.map((board) => (
        <div
          key={board.id}
          onDrop={(e) => dropCartHandler(e, board)}
          onDragOver={(e) => dragOverHandler(e)}
          className="board">
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              draggable={true}
              onDrop={(e) => dragHandler(e, board, item)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandeler(e)}
              className="item">
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
