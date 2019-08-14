const {Schema, model} = require('mongoose')

const TodoSchema = new Schema( {
    position: Number,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: String,
    priority: {
        label: String,
        level: Number
    }
}, 
{
    timestamps: true
});

module.exports = model('Todo', TodoSchema);