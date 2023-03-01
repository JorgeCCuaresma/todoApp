import React, { useEffect, useState } from "react";
import Todo from "../to-do/to-do";
import styles from "./to-doList.module.css";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodos(res);
      });
  }, [props.reload]);

  return (
    <div className={styles.card}>
      <h1>My To-Do List</h1>
      {todos && todos.map((element) => <Todo reloadPage={props.reloadPage} info={element} />)}
    </div>
  );
};

export default TodoList;
