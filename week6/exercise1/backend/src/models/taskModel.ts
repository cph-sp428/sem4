import  mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    dueDate: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const taskModel = mongoose.model('Task', taskSchema);
export default taskModel;