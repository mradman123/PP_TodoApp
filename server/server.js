const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const {Imperative} =require('./js/imperative');
const {Oop} = require ('./js/oop');
const {Functional} = require ('./js/functional.js')

var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
   if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  } else {
    return next();
  }
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: Imperative(req.body.text)
  });
  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => res.status(400).send())
});

app.delete('/todos/:id', (req,res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
       return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => res.status(400).send());

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  body.text = Imperative(body.text);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=> {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
