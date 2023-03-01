const express = require('express');

const validarTextEmpty = (req,res,next) =>{
 const todo = req.body;
 if (todo.text === "" || todo.text === undefined){
    res.status(400).send("El campo text esta vacio, por favor rellenelo.")
 }else
   next();
};



module.exports = {
    validarTextEmpty,   
}