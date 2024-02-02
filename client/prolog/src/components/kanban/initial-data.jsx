// columns : 서류, 테스트, 인터뷰, 결과 단계
// cards : 프로세스 카드

const initialData = {
  cards: {
    "card-1": { id: "card-1", content: "Take out the garbage" },
    "card-2": { id: "card-2", content: "Watch my favorite show" },
    "card-3": { id: "card-3", content: "Charge my phone" },
    "card-4": { id: "card-4", content: "Cook dinner" },
  },
  columns: {
    paper: {
      id: "paper",
      title: "Paper",
      cardIds: ["card-1", "card-2", "card-3", "card-4"],
    },
    test: {
      id: "test",
      title: "Test",
      cardIds: [],
    },
    interview: {
      id: "interview",
      title: "Interview",
      cardIds: [],
    },
    pass: {
      id: "pass",
      title: "Pass",
      cardIds: [],
    },
    fail: {
      id: "fail",
      title: "Fail",
      cardIds: [],
    },
  },
  // 베열 안에 있는 요소들이 rendering
  columnOrder: ["paper", "test", "interview", "pass", "fail"],
};

export default initialData;
