import Task from "../../models/Task.js";

export const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const userId = req.userId;

        const updates = req.body;
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No updates provided.",
            });
        }

        const task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you do not have permission to update this task.",
            });
        }

        Object.keys(updates).forEach((key) => {
            if (key in task) {
                task[key] = updates[key];
            }
        });

        const updatedTask = await task.save();
        return res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task: updatedTask,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
