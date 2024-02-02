import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  // isDragging이 안먹어
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
`;

function Card({ card, index }) {
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
            {card.content}
          </Container>
        )}
      </Draggable>
    </div>
  );
}
export default Card;
