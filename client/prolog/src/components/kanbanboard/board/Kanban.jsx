// import "./Kanban.scss";
// import KanbanData from "../KanbanData";
// import Card from "../card/Card";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { useState } from "react";

// function Kanban() {
//   const [data, setData] = useState(KanbanData);
//   function onDragEnd(result) {
//     console.log(result);
//   }

//   // 공부해야하는 부분
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="kanban">
//         {data.map((section) => (
//           <Droppable key={section.id} droppableId={section.id}>
//             {(provided) => (
//               <div {...provided.droppableProps} className="kanban_section" ref={provided.innerRef}>
//                 <div className="kanban_section_title">{section.title}</div>
//                 <div className="kanban_section_content">
//                   {section.tasks &&
//                     section.tasks.map((task, index) => (
//                       <Draggable key={task.id} draggableId={task.id} index={index}>
//                         {(provided, snapshot) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             style={{
//                               ...provided.draggableProps.style,
//                               opacity: snapshot.isDragging ? "0.5" : "1",
//                             }}
//                           >
//                             <Card>{task.title}</Card>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// }

// export default Kanban;

import React, { useState, useEffect } from "react";
import "./Kanban.scss";
import KanbanData from "../KanbanData";
import Card from "../card/Card";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// DropComponent 컴포넌트 정의
const DropComponent = ({ droppableId, children }) => {
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

  return <Droppable droppableId={droppableId}>{children}</Droppable>;
};

function Kanban() {
  const [data, setData] = useState(KanbanData);
  function onDragEnd(result) {
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <DropComponent key={section.id} droppableId={section.id}>
            {(provided) => (
              <div {...provided.droppableProps} className="kanban_section" ref={provided.innerRef}>
                <div className="kanban_section_title">{section.title}</div>
                <div className="kanban_section_content">
                  {section.tasks &&
                    section.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <Card>{task.title}</Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </DropComponent>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
``;
