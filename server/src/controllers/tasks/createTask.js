import { verifyToken } from "../../utils/verifyToken.js";
import Task from '../../models/Task.js';

export const createTask = async (req, res) => {

    try {
        const authToken = req.cookies.accessToken;

        if (!authToken) {
            return res.status(200).json({
                message: 'no token is found',
                isLoggedIn: false,
            });
        }

        const userData = verifyToken(authToken);

        if (!userData) {
            return res.status(200).json({
                message: 'token is Invalid',
                isLoggedIn: false
            });
        }

        const { title, description, dueDate, priority, status } = req.body;

        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            userId: userData.userId
        });
        await newTask.save();

        res.status(201).json({
            success: true,
            message: 'Task Created Successful',
            newTask
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}