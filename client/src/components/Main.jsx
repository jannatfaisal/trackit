import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { taskStatus, deleteTask, updateTask } from "../utils/apiCalls";
import Filters from "./Filters";

const Main = () => {
    const { tasks, setRefresh, filteredTasks } = useContext(UserContext);
    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState(null);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleEditClick = (task) => {
        setEditMode(task._id);
        setEditedTask({ ...task });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const saveEdit = async () => {
        try {
            const response = await updateTask(editedTask._id, editedTask);
            if (response.success) {
                setEditMode(null);
                setEditedTask(null);
                setRefresh(true);
            } else {
                alert("Error updating task");
            }
        } catch (error) {
            alert('Something went wrong')
            throw new error
        }
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedTask(null);
    };

    const changeStatus = async (taskId) => {
        try {
            const response = await taskStatus(taskId);
            if (response.success) {
                setRefresh(true);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert('Something went wrong')
            throw new error
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await deleteTask(taskId);
            if (response.success) {
                setRefresh(true);
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('Something went wrong')
            throw new error
        }
    };

    const displayedTasks = filteredTasks.length > 0 ? filteredTasks : tasks;

    return (
        <div className="max-w-4xl mx-auto">
            <Filters />

            <div className="flex-grow flex justify-center items-center text-center mt-10">
                <h1 className="text-4xl font-bold text-blue-600 italic">
                    Total Task {displayedTasks.length}
                </h1>
            </div>
            {displayedTasks.length > 0 ? (
                displayedTasks.map((task) => (
                    <div
                        key={task._id}
                        className="my-4 border bg-white shadow-lg w-full px-6 py-4 rounded-xl"
                    >

                        {editMode === task._id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="label">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={editedTask.title}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">Description</label>
                                    <textarea
                                        name="description"
                                        value={editedTask.description}
                                        onChange={handleChange}
                                        className="input"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="label">Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editedTask.dueDate}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label className="label">Priority</label>
                                    <select
                                        name="priority"
                                        value={editedTask.priority}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-4 mt-3">
                                    <button
                                        onClick={cancelEdit}
                                        className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveEdit}
                                        className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h1 className="font-bold text-2xl text-gray-800">
                                        {task.title}
                                    </h1>
                                    <span
                                        className={`px-3 py-1 text-sm font-semibold rounded ${task.priority === "High"
                                            ? "bg-red-100 text-red-600"
                                            : task.priority === "Medium"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{task.description}</p>
                                {task.description && <hr />}
                                <div className="flex justify-between items-center text-gray-500 text-sm mt-5">
                                    <p className="font-medium">
                                        Due:{" "}
                                        <span className="text-gray-800">
                                            {formatDate(task.dueDate)}
                                        </span>
                                    </p>
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => changeStatus(task._id)}
                                    >
                                        <p
                                            className={`ml-2 ${task.status === "Completed"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                                } font-semibold`}
                                        >
                                            {task.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 mt-3">
                                    <button
                                        onClick={() => handleEditClick(task)}
                                        className="bg-blue-400 text-white px-5 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task._id)}
                                        className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="flex-grow flex justify-center items-center text-center mt-10">
                    <h1 className="text-4xl font-bold text-blue-600 italic">
                        No tasks found
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Main;
