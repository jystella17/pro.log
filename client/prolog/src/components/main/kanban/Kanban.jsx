import { useState,useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import initialData from "./initial-data";
import Column from "./Column";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

function Kanban() {
  // const [state, setState] = useState(initialData);
  const [state, setState] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    const initialColumns = {
      fail: { id: 'fail', title: 'Fail', cardIds: [] },
      interview: { id: 'interview', title: 'Interview', cardIds: [] },
      paper: { id: 'paper', title: 'Paper', cardIds: [] },
      pass: { id: 'pass', title: 'Pass', cardIds: [] },
      result: { id: 'result', title: 'Result', cardIds: [] },
      test: { id: 'test', title: 'Test', cardIds: [] }
    };

    // 컴포넌트가 마운트될 때 API 호출
    axios.get("https://i10b112.p.ssafy.io/api/process")
      .then(response => {
        const receivedData = response.data;
        
        // 데이터를 변환하여 state에 저장
        const cards = {};
        const columns = { ...initialColumns };
        console.log(receivedData)
        

        receivedData.forEach((item, index) => {
          const cardKey = item.id;
          const columnKey = item.step;
          cards[cardKey] = {
            id: cardKey,
            company: item.company,
            step: item.step
          };

          columns[columnKey].cardIds.push(cardKey);
          
        });
      
        
        setState({
          cards: cards,
          columns: columns,
          columnOrder: ["paper","test","interview","result"]
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    
      
  }, []);

  //////////////////////////////////////////////
  useEffect(() => {
    if (state) {
      console.log(state, "State");
    }
  }, [state]);
  ////////////////////////////////
  function onDragEnd(result) {
    // console.log(result);
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
      const newCardIds = Array.from(start.cardIds);
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

    // cardIds의 복사본 생성
    const startCardIds = Array.from(start.cardIds);
    // 드래그된 카드의 id를 시작컬럼의 카드 id 목록에서 제거
    startCardIds.splice(source.index, 1);
    // 업데이트된 시작 컬럼의 새로운 상태
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finish.cardIds);

    // 목적지 컬럼의 카드id 목록에 삽입
    finishCardIds.splice(destination.index, 0, draggableId);
    // 수정된 목적지 컬럼
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    // 최종적인 상태(모든 컬럼 포함)
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    const updatedCard = {
      ...state.cards[draggableId],
      step: newFinish.id, // Assuming the id of the column represents the step
    };
  
    // Update the card in the state
    const updatedState = {
      ...newState,
      cards: {
        ...newState.cards,
        [draggableId]: updatedCard,
      },
    };


    // 새로운 상태로 업데이트 (리액트에게 컴포넌트를 리렌더링하라고 알림)
    setState(updatedState);

    axios.put(`https://i10b112.p.ssafy.io/api/schedule/kanban`, [{id:draggableId, step: newFinish.id }])
    .then(response => {
      console.log("Card step updated successfully:", response.data);
    })
    .catch(error => {
      console.error("Error updating card step:", error);
    });

  }

  const handleCardClick = (cardId) => {
    navigate(`/cards/${cardId}`)
  };
  const showInfo = (id) => {
    console.log(id)
  }


  return (
    <div>
      {state &&
        <DragDropContext onDragEnd={onDragEnd}>
          <Container>
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
            

              // result 컬럼의 카드를 인식하기 위해 분기(pass, fail)
              if (column.id !== undefined && column.id === "result") {
                const passcards = state.columns.pass.cardIds.map((cardId) => state.cards[cardId]);
                const failcards = state.columns.fail.cardIds.map((cardId) => state.cards[cardId]);
                return (
                  <Column
                    state={state}
                    key={column.id}
                    column={column}
                    cards={[passcards, failcards]}
                    
                  />
                );
              } else {
                // 단계 컬럼의 카드
                const cards = column.cardIds.map((cardId) => state.cards[cardId]);
                return <Column key={column.id} state={state} column={column} cards={cards} />;
              }
            })}
          </Container>
        </DragDropContext>
      }
  </div>
  );
}

export default Kanban;
