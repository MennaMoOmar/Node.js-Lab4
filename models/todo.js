const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 20
    },
    body: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500
    },
    tag: {
        type: [{
            type: String,
            maxLength: 10
        }],
        optional: true,
    },
    createdAt: {
        type: Date,
        optional: true
    },
    updatedAt: {
        type: Date,
        optional: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        }
});

module.exports = Todo;
