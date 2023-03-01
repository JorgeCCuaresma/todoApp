const express = require('express');

//importamos el fichero con los datos que necesita nuestro Router
const {todos} = require('../data/index');
const { validarTextEmpty } = require('../middleware/middleware');
const Todos = require('../mongo/schemas/todoSchema');


/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

todoRouter.get('/todo', async (req, res) => {
  //devolver todos los "todos" que hay en el array con formato JSON.
  try{
  const allTodos = await Todos.find();
  res.status(200).json(allTodos);
  }catch(error){
    res.status(500).json(error)
  }
});

todoRouter.post('/todo',validarTextEmpty, async(req, res,) => {
  
  //crear un nuevo objeto con estructura {id, text, fecha, done} con los datos que vienen en el BODY de la Request y meterlos dentro de el array.
  //el nuevo objeto debe tener como id un numero mas que el numero actual de elementos guardados en el array.
  try{
  const body = req.body;
  const data = {
    text : body.text,
    fecha: new Date().toLocaleDateString(),
    todo: body.todo,
    done: false
  }  
  const newTodo = new Todos(data);
  await newTodo.save();
  res.status(201).json(newTodo)
}catch(error){
  res.status(500).json(error)
}
});


/*
En este endpoint, el path contiene una variable llamada id. La syntaxis que utiliza express para estos casos es el simbolo :

Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
con el mismo nombre que hemos utilizado en el path.

Ejemplo:

Si con Insomnia o Postman hicisemos una peticion GET a la ruta /todo/12, está será dirigida directamente hasta este endpoint.


*/
todoRouter.get('/todo/:id', async  (req, res) => {

  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, devolverlo como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
//   const id = parseInt(req.params.id)
//   const viewOneTodo =todos.find(element => element.id === id)
//   if(viewOneTodo){
//     res.status(200).json(viewOneTodo)
//   } else{
//     res.status(404).send("No hay ninguna tarea asignada")
// }
const id = req.params.id
try{
const oneTodo = await Todos.findById(id)
if(oneTodo){
res.status(200).json(oneTodo)
}else{
  res.status(404).send("No hay ninguna tarea asignada")
}}catch(error){
  res.status(500).json(error)
}

});

  

  



// MISSING '/todo/:id' PATCH

todoRouter.patch('/todo/:id', async  (req, res) => {
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo ACTUALIZAMOS con los datos del BODY de la Request y lo devolvemos como formato JSON y codigo de status 200.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  // const id = parseInt(req.params.id);
  // const patchId = todos.find(element => element.id === id);
  // if(patchId){
  //   const bodyPatchId= req.body
  //   const idModified = Object.assign(patchId, bodyPatchId)
  //   res.status(200).json(idModified)
  // }else{
  //   res.status(404).send("Tarea no encontrada, no se puede editar")
  // }
  try{
  const patchId = await Todos.findByIdAndUpdate(req.params.id, req.body);
    if(patchId){
    res.status(200).json(patchId)
  }else{
    res.status(404).send('Tarea no encontrada')
  }}catch(error){
    res.status(500).json(error)
  }

});

// MISSING '/todo/:id' DELETE


todoRouter.delete('/todo/:id', async (req, res) => {
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
  
  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo BORRAMOS y devolvemos un codigo de status 204.
  
  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
  // const id = parseInt(req.params.id);
  // const todoDelete = todos.find(element => element.id === id);
  // if(todoDelete){
  //   const indexTodo = todos.findIndex(element=> element.id === id)
  //   todos.splice(indexTodo,1)
  //   res.status(204).send("Tarea eliminada")
  // }else{
  //   res.status(404).send("Tarea no encontrada, no se puede eliminar")
  // }
  const id = req.params.id
  try{
  const todoDelete = await Todos.findByIdAndDelete(id);
  res.status(204).send('Tarea eliminada');
}catch(error){
  res.status(500).json(error)
} 
});


//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = todoRouter;
