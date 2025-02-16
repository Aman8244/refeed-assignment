import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate:{
        type:Date,
        required:true
    }
});

const Task = mongoose.models.Refeedtask || mongoose.model('Refeedtask', taskSchema);

export default Task;