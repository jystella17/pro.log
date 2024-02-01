const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    paper: {
      id: "paper",
      title: "Paper",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    test: {
      id: "test",
      title: "Test",
      taskIds: [],
    },
    interview: {
      id: "interview",
      title: "Interview",
      taskIds: [],
    },
    pass: {
      id: "pass",
      title: "Pass",
      taskIds: [],
    },
    fail: {
      id: "fail",
      title: "Fail",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["paper", "test", "interview", "pass", "fail"],
};

export default initialData;
