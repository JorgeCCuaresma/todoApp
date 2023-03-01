import React, { useState, useRef } from "react";
import styles from "./createTo-do.module.css";
import { useNavigate } from "react-router-dom";

const CreateToDo = (props) => {
    const [newTodo, setNewTodo] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const navigate = useNavigate()
  const getNewTodo = (event) => {
    setNewTodo(event.target.value);
  };
  const getDateTodo = (event) => {
    setNewDate(new Date(event.target.value).toLocaleDateString());

  };
  const fetchPost = (e) => {
    e.preventDefault()
    const url = "http://localhost:3000/todo";
    const body = {
      text: newTodo,
      todo: newDate
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    fetch(url, options)
      .then((res) => {
        res.json();
      })
      .then(() => {        
        navigate('/todo')
      });
  };

  return (
    <form className={styles.card}>
      <label for="newTodo">
        <input
          className={styles.input}
          id="newTodo"
          required
          type="text"
          placeholder="Create To-Do"
          value={newTodo}
          onChange={getNewTodo}
        />
      </label>
      <label for="date">
        <input
          className={styles.input}
          id="date"
          required
          type="date"
          onChange={getDateTodo}
          
        />
      </label>
      <label for="button">
        <button
          className={styles.button}
          id="button"
          type="submit"
          onClick={fetchPost}
        >
          Create
        </button>
      </label>
    </form>
  );
};

export default CreateToDo;
