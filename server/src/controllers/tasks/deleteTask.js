import Task from "../../models/Task.js";

export const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const userId = req.userId;

        const task = await Task.findOneAndDelete({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or you do not have permission to delete this task.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
