import React from "react";
import { Link } from "react-router-dom";
import styles from "./to-do.module.css";

const Todo = (props) => {
  const id = props.info._id
  const doneTodo = props.info.done

  const editDone = () =>{
  const url = "http://localhost:3000/todo/" + id;
  const body = {
    done: !doneTodo
  };
  const options = {
    method: "PATCH",
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
      props.reloadPage();
    });   
 }

 const deleteTodo =()=>{
  const url = "http://localhost:3000/todo/" + id;
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  };
  fetch(url, options)
    .then((res) => {
      res.json();
    })
    .then(() => {
      props.reloadPage();
    });  

 }
  return (
    <div className={styles.card}>
      <ul>
        <li>
          <table className={styles.table}>
            <tr>
              
              <td className={styles.two}>{props.info.text}</td>
              <td className={styles.three}>Create:</td>
              <td className={styles.four}>{props.info.fecha}</td>
              <td className={styles.three}>To-Do:</td>
              <td className={styles.four}>{props.info.todo}</td>
              <td className={styles.five}>
                <input type="checkbox" checked={props.info.done} />
                Realizado
              </td>
              <td className={styles.six}>
                <button
                  className={styles.button}
                  onClick={editDone} type="submit"
                >
                  Marcar
                </button>
              </td>
              <td className={styles.six}>
                <Link to={`${id}`}>
                <button 
                  className={styles.button}
                  type="submit">View
                </button>
                </Link>  
              </td>
              <td className={styles.six}>
              <button
                  className={styles.button}
                  onClick={deleteTodo} type="submit"
                >Delete</button>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  );
};

export default Todo;
