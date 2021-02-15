const mongoose = require('mongoose')
const validator = require('validator')
const Todo = require('./todo')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 15,
        optional: true
    },
    age: {
        type: Number,
        optional: true,
        minLength: 13
    },
});

//relationship to Todo
userSchema.virtual('todo', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'userId'
})

const User = mongoose.model('User', userSchema)

module.exports = User