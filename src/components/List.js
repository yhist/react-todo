import React, { useState } from "react";

const List = React.memo(({ id, title, completed, todoData, setTodoData }) => {
  // console.log("list목록이 갱신되었다.");

  // 편집중인 상태 체크
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const listStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: completed ? "line-through" : "none",
    };
  };
  // react 에서 css를 {객체}로 생성하는법
  const btnStyle = {
    color: "#000",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  //  할일 삭제 메서드
  const deleteTodo = (id) => {
    // 선택된 아이디와 다른 목록만 추출하기가 알고리즘상 좋다.
    let newTodo = todoData.filter((data) => data.id !== id);
    // 새로운 todo데이터를 state.todoData로 교체한다.
    setTodoData(newTodo);
    localStorage.setItem("todoData", JSON.stringify(newTodo));
  };

  // 할일 상태 변경
  const completeChange = (id) => {
    let changeTodo = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(changeTodo);
    localStorage.setItem("todoData", JSON.stringify(changeTodo));
  };

  // 편집중인 상태
  const editChange = (e) => {
    setEditedTitle(e.target.value);
  };
  // 편집 완료 상태
  const changeSubmit = () => {
    let changeTodo = todoData.map((data) => {
      // props로 이미 id는 정송을 받았음
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(changeTodo);
    localStorage.setItem("todoData", JSON.stringify(changeTodo));

    // 편집상태를 종료한다.
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex justify-between items-center w-full px-4 py-1 my-1 text-gray-600  bg-gray-100 border rounded row">
        <form onSubmit={changeSubmit}>
          <input
            type="text"
            className="w-full px-3 mr-4 text-gray-500 appearance-none"
            value={editedTitle}
            onChange={editChange}
            autoFocus
          />
        </form>
        <div className="items-center">
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            type="button"
            className="px-4 py-2 float-right"
          >
            X
          </button>
          <button
            onClick={changeSubmit}
            type="submit"
            className="px-4 py-2 float-right"
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반적인 목록 출력상태
    return (
      <div
        style={listStyle(completed)}
        key={id}
        className="flex justify-between items-center w-full px-4 py-1 my-1 text-gray-600  bg-gray-100 border rounded"
      >
        <div className="items-center">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => completeChange(id)}
          />{" "}
          {title}
        </div>
        <div className="items-center">
          <button style={btnStyle} onClick={() => deleteTodo(id)}>
            X
          </button>
          <button style={btnStyle} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      </div>
    );
  }
});
export default List;
