import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 90px;
  width: 80%;
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 20px;
  margin-bottom: 8px;
  box-shadow: 3px 3px 5px -1px lightgrey;
  background-color: white;
  // background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
`;

const Company = styled.div`
  font-weight: bold;
`;

const Job = styled.div`
  margin-top: 12px;
  font-size: smaller;
`;
function Card({ card, index }) {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/process/${cardId}`)
  };


  return (
    <div>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            $isDragging={snapshot.isDragging}
          >
            <Company onClick={() => handleCardClick(card.id)}>{card.company}</Company>
            <Job>{card.job}</Job>
          </Container>
        )}
      </Draggable>
    </div>
  );
}
export default Card;
