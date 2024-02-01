import { useState } from "react";
import initialData from "./initial-data";
import Column from "./Column";

function Kanban() {
  const [state, setState] = useState(initialData);
  return (
    <div>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}

export default Kanban;
