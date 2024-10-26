import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: [
                "Easy",
                "Medium",
                "Hard",
            ],
            default: "Easy"
        },
        xpRewarded: {
            type: String,
            default: 0,
        },
        taskType: {
            type: String,
            enum: [
                'Fitness',
                'Career',
                'Health',
                'Creativity',
                'Chores',
                'Cognitive',
            ],
            required: true,
        },
        statType: {
            type: String,
            enum: [
                'Strength',
                'Intellect',
                'Agility',
                'Arcane',
                'Focus',
            ],
        },
        status: {
            type: String,
            enum: [
                'Pending',
                'Completed',
                'Failed'
            ],
            default: 'Pending',
        },
        duration: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);


export const Task = mongoose.model('Task', taskSchema);

export default Task;