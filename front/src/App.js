import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateToDo from "./components/createTo-do/createTo-do";
import Main from "./components/main/main";
import NotFound from "./components/notfound/notfound";
import OneTodo from "./components/oneTodo/oneTodo";
import TodoList from "./components/to-doList/to-doList";

function App() {
  const [reload, setReload] = useState(false);
  const reloadPage = () => {
    setReload(!reload);
  };
  return (
   <div className="body">
    <h1>🗒 My To-Do App 🗒</h1>
    <nav className="nav">
      
          <h3><Link to="/">Main</Link></h3>
        
          <h3><Link to="/todo">To-Do List</Link></h3>
        
          <h3><Link to="/create">Create</Link></h3>
       

    </nav>

    
    
    <div>
      <Routes>
      <Route path="/" element={<Main/>}/>  
      <Route path="/todo" element={<TodoList reloadPage={reloadPage} reload={reload}/>} />
      <Route path="/todo/:id" element={<OneTodo/>}/>
      <Route path="/create" element={<CreateToDo reloadPage={reloadPage} />}/>
      <Route path="*" element={<NotFound/>}/>
       <Route path="/todo/*" element={<NotFound/>}/> {/*no me funciona esta ruta  */}
      </Routes>
    </div>
   </div>
  );
}

export default App;
