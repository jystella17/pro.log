// columns : 서류, 테스트, 인터뷰, 결과 단계
// cards : 프로세스 카드 -> db에서 더미데이터로 수정, 카드 형식으로 컴포넌트 교체

// 앞으로 할 일
// dummy data 받아서 어떻게 연결할지 코드 다시 짜기
// 년도, 상하반기 분기
// Fail 드롭다운 어떻게 구현할 지 생각(어느 단계에서 떨어졌는지 알아야함)

const initialData = {
  cards: {
    "card-1": {
      id: "card-1",
      company: "삼성전자",
      job: "메모리사업부-SW개발",
      content: "Take out the garbage",
    },
    "card-2": {
      id: "card-2",
      company: "현대오토에버",
      job: "네비게이션",
      content: "Watch my favorite show",
    },
    "card-3": {
      id: "card-3",
      company: "넥슨코리아",
      job: "",
      content: "Charge my phone",
    },
    "card-4": {
      id: "card-4",
      company: "토스",
      job: "백엔드",
      content: "Cook dinner",
    },
    "card-5": {
      id: "card-5",
      company: "토스요",
      job: "백엔드",
      content: "Cook dinner",
    },
    "card-6": {
      id: "card-6",
      company: "토스",
      job: "백엔드",
      content: "Cook dinner",
    },
    "card-7": {
      id: "card-7",
      company: "토스",
      job: "백엔드",
      content: "Cook dinner",
    },
    "card-8": {
      id: "card-8",
      company: "토스",
      job: "백엔드",
      content: "Cook dinner",
    },
  },
  columns: {
    paper: {
      id: "paper",
      title: "Paper",
      cardIds: ["card-1", "card-2", "card-3", "card-4", "card-5", "card-6", "card-7"],
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
    result: {
      id: "result",
      title: "Result",
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
  columnOrder: ["paper", "test", "interview", "result"],
};

export default initialData;
