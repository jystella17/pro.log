import React from "react";
import styled from "./Kanban.module.css";
import Card from "./Card";

function Column({ column, tasks }) {
  return (
    <div className={styled.container}>
      <h3 className={styled.task}>{column.title}</h3>
      <div className={styled.taskList}>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
export default Column;
