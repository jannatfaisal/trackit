import Task from "../../models/Task.js";

export const updateTaskStatus = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const userId = req.userId;

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required.",
            });
        }

        const task = await Task.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you do not have access to this task.",
            });
        }

        task.status = task.status === "Pending" ? "Completed" : "Pending";

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully.",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
