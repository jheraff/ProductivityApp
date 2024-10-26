import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        xp: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 1
        },
        stats: {
            strength: {
                type: Number,
                default: 1,
            },
            intellect: {
                type: Number,
                default: 1,
            },
            agility: {
                type: Number,
                default: 1,
            },
            arcane: {
                type: Number,
                default: 1,
            },
            focus: {
                type: Number,
                default: 1,
            },
        },
        inventory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            }
        ],
        completedTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        currentTasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        ],
        currency: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

userSchema.methods.completeTask = async function (task) {
    this.completedTasks.push(task._id);
    this.currentTask = this.currentTasks.filter(t => t.toString() !== task._id.toString());
    this.xp += task.xpReward;

    switch (task.statType) {
        case 'Stregth':
            this.stats.strength += 1;
            break;

    }

    if (this.xp >= this.level * 100) {
        this.level += 1;
    }

    await this.save();
};


export const User = mongoose.model('User', userSchema);

export default User;