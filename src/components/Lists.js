import React from "react";
import List from "./List.js";

const Lists = React.memo(({ todoData, setTodoData }) => {
  // console.log("목록관리 컴포넌트도 갱신되었다.");
  return (
    <div>
      {
        /* 할일 목록 데이터를 출력한다. */
        todoData.map((data) => (
          <List
            key={data.id}
            id={data.id}
            title={data.title}
            completed={data.completed}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        ))
      }
    </div>
  );
});
export default Lists;
