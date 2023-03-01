const { Schema, model }  = require('mongoose');

const todoSchema = new Schema({
    text:  {type: String, required: true}, 
    fecha: {type: String, required: true},
    todo: {type: String, required: true},
    done:   Boolean // String is shorthand for {type: String}
});

const Todos = model('todos', todoSchema);

module.exports = Todos;