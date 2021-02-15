//express
var express = require('express');
var app = express();

//body-pareser
const bodyParser = require('body-parser');

app.use(express.static('models'));
app.use(express.json());
app.listen(3000);

//mongoose
const mongoose = require('mongoose');

//imports modules
const User = require('./models/user');
const Todo = require('./models/todo');
//console.log(userModel);

//import db connection
require('./db-connection');


/*-----------------------------------*/
//2 - Create a middleware that logs the request url, method, and current time
app.get('/*', (req, res, next) => {
    console.log(`URL= ${req.url}, Method= ${req.method}, Time= ${req.startTime = Date.now()}`);
    next();
});

/*-----------------------------------*/
//register
app.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send("user was registered successfully")
    } catch (e) {
        res.status(400).send(e)
    }
})

//login
app.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username, password: req.body.password});
        if(!user){
            res.send("faild to login");
            return;
        }
        res.send("logged in successfully");
    } catch (e) {
        res.status(400).send(e)
    }
})

//get firstname for all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        //console.log(users)
        let result = users.map(a => a.firstName);
        res.send(result)
    } catch (e) {
        res.status(500).send(e)
    }
})

//update user by id
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'password', 'firstName', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send("user was edited successfully")
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user by id
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send("user was deleted successfully")
    } catch (e) {
        res.status(500).send()
    }
})

/*--------------------------------- */

//insert todo
app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body)
    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (e) {
        res.status(400).send(e)
    }
})

//get todo by userid
app.get('/todos/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const todo = await Todo.find({userId: _id})
        if (!todo) {
            return res.status(404).send()
        }
        res.send(todo)
    } catch (e) {
        res.status(500).send()
    }
})

//update todo
app.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body', 'tag', 'createdAt', 'updatedAt', 'userId']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!todo) {
            return res.status(404).send()
        }
        res.send(todo)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete todo by id
app.delete('/posts/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if (!todo) {
            res.status(404).send()
        }
        res.send("deleted successfullt")
    } catch (e) {
        res.status(500).send()
    }
})

/*---------------------------------*/
// 3- Create a global error handler
app.get('/*', (req, res, next) => {
    if (!res.headersSent) {
        console.log(res.statusCode);
        console.log(req.statusCo);
        res.send("404 Error!");
    }
});
