import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import NotFound from "../notfound/notfound";


const OneTodo = () => {

  let params = useParams();
  const [todo, setTodo] = useState("")
  useEffect(() => {
    fetch("http://localhost:3000/todo/" + params.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodo(res);
      });
  }, [params.id]);

  // const printDone =()=>{
  //   if (todo.done === false){
  //     document.write("Sin hacer")
  //   }else{
  //     document.write("Hecho")
  //   }
  // }
  if (todo.name === "CastError") return (<div><NotFound /></div>)
  {/*<Link to="*"/> si no funciona el otro path algo asi?¿ para que pinte mi componente notFound?*/ }
  return (
    <div>
      <h2>Tarea</h2>
      <p>{todo.text}</p>
      <h2>Fecha de Creación</h2>
      <p>{todo.fecha}</p>
      <h2>Fecha To-Do</h2>
      <p>{todo.todo}</p>
      <h2>Estado</h2>
      <input type="checkbox" checked={todo.done} />
      {/* <p>{printDone()}</p>   */}
    </div>
  )
};

export default OneTodo;