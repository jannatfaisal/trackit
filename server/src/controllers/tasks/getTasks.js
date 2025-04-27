import Task from "../../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const userId = req.userId;

        const tasks = await Task.find({ userId });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found for the user.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Tasks retrieved successfully.',
            tasks,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};
