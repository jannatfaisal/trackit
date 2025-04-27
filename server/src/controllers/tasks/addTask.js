import Task from "../../models/Task.js";

export const addTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const userId = req.userId;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Task title is required.',
            });
        }

        const taskDueDate = dueDate ? new Date(dueDate) : new Date();
        await Task.create({
            title,
            description,
            dueDate: taskDueDate,
            priority,
            status,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: 'Task created successfully.',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};
