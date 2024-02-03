import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const Container = styled.div`
  padding: 0px 30px;
  border-right: 1px solid lightgray;
  border-radius: 2px;
  width: 80vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

const items = [
  {
    label: "Paper",
    key: "0",
  },
  {
    label: "Test",
    key: "1",
  },
  {
    label: "Interview",
    key: "2",
  },
];

function Column({ column, cards, state }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Container>
      <Title>{column.title}</Title>
      {/* Result를 Pass, Fail로 나누기 */}
      {column.id === "result" && (
        <div>
          <div>
            <Title>{state.columns.pass.title}</Title>
            <Droppable droppableId={state.columns.pass.id}>
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  {cards[0].map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </div>
          <div>
            {/* fail dropdown */}
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Space>
                <Title>{state.columns.fail.title}</Title>
                <DownOutlined />
              </Space>
            </Dropdown>
            <Droppable droppableId={state.columns.fail.id}>
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  {cards[1].map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </div>
        </div>
      )}
      {column.id !== "result" && (
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              $isDraggingOver={snapshot.isDraggingOver}
            >
              {cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      )}
    </Container>
  );
}
export default Column;
