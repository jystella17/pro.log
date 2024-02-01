// 회사명
function CompanyName() {
  return <div className="companyName">삼성전자</div>;
}

// 직무
function Task() {
  return <div className="task">sw메모리사업부</div>;
}

// 디데이
// 마감일 이전이면 dday
// 마감일 이후이면 마감
function dDay() {
  return (
    <>
      <div className="dDay">dday</div>

      <div className="close">마감</div>
    </>
  );
}

// 태그
function Tag() {
  return <span className="kanbanTag">#너무 조항요</span>;
}

export default function KanbanCard() {
  return (
    <div className="kanbanCard">
      <div className="head">
        <CompanyName />
        <dDay />
      </div>
      <Task />
      <div className="kanbanTags">
        <Tag />
      </div>
    </div>
  );
}
