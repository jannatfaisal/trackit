import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken.js';
import { addTask } from '../controllers/tasks/addTask.js';
import { getTasks } from '../controllers/tasks/getTasks.js';
import { updateTaskStatus } from '../controllers/tasks/updateTaskStatus.js';
import { deleteTask } from '../controllers/tasks/deleteTask.js';
import { updateTask } from '../controllers/tasks/updateTask.js';

const taskRouter = Router();

taskRouter.post('/add-task', authenticateToken, addTask)
taskRouter.get('/get-tasks', authenticateToken, getTasks)
taskRouter.patch("/:id/status", authenticateToken, updateTaskStatus);
taskRouter.delete("/:id/delete", authenticateToken, deleteTask);
taskRouter.patch("/:id/update", authenticateToken, updateTask)

export default taskRouter;