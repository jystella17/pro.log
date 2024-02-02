import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import initialData from "./initial-data";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

function Kanban() {
  const [state, setState] = useState(initialData);

  function onDragStart() {
    //   document.body.style.color = "orange";
    //   document.body.style.transition = "backgound-color 0.2s ease";
  }

  function onDragUpdate(update) {
    //   const { destination } = update;
    //   // const opacity = destination ? destination.index / Object.keys(state.cards).length : 0;
    //   // 인덱스에 따라서 색의 진하기가 달라짐
    //   // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  function onDragEnd(result) {
    console.log(result);
    // 시작위치 source, 끝 위치 destination, 드래그카드의 고유 식별자draggableId
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // 컬럼에서 카드의 순서를 변경
    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      // newCardIds 배열에서, source.index 위치에 있는 카드 제거
      // destination.index 위치에 draggableId를 삽입하여 카드의 순서를 변경
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      // 변경된 카드 순서 반영해서 새로운 객체 newColumn 생성
      const newColumn = {
        ...start,
        cardIds: newCardIds,
      };

      // 애플리케이션의 전체 상태를 업데이트한 새 상태 newState
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  }
  return (
    <div>
      <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
        <Container>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const cards = column.cardIds.map((cardId) => state.cards[cardId]);

            return <Column key={column.id} column={column} cards={cards} />;
          })}
        </Container>
      </DragDropContext>
    </div>
  );
}

export default Kanban;
