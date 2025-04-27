import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { addTask } from "../utils/apiCalls";

const AddTask = () => {
    const { addTaskModal, setAddTaskModal, setRefresh } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addTask(formData)

            if (res.success) {
                alert(res.message);
            } else {
                alert(res.message)
            }
        } catch (error) {
            alert('Something went wrong')
            throw new error
        } finally {
            setAddTaskModal(false);
            setRefresh(true)
        }
    };

    return (
        <div>
            {addTaskModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h2 className="text-lg font-bold">Add New Task</h2>
                            <button
                                onClick={() => setAddTaskModal(false)}
                                className="text-gray-500 hover:text-black"
                            >
                                &times;
                            </button>
                        </div>

                        <form className="mt-4 space-y-4" onSubmit={handleSubmit} >
                            <div>
                                <label className="label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter task title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    Description
                                </label>
                                <textarea
                                    className="input"
                                    placeholder="Enter task description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div>
                                <label className="label">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    className="input"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    Priority
                                </label>
                                <select
                                    className="input"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    Status
                                </label>
                                <select
                                    className="input"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                                    onClick={() => setAddTaskModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Save Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTask;
