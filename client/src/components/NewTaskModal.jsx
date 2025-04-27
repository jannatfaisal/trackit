import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-modal'; // or your preferred modal library
import { createTask } from '../utils/apiCalls';

const NewTaskModal = ({ isOpen, closeModal, closeSide }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'Pending',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the task (You will call your addTask API or method here)

        try {
            const res = await createTask(taskData)

            if (res.data.success) {
                alert(res.data.message)
            }
            setTaskData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'Medium',
                status: 'Pending',
            })
        } catch (error) {
            alert('Something went wrong ', error)
        } finally {
            closeModal(); // Close the modal after adding the task
            closeSide()
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            overlayClassName="overlay"
        >
            <h2 className="text-xl font-semibold">New Task</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-2">
                    <label
                        htmlFor="title"
                        className="label"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="description"
                        className="label"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="dueDate"
                        className="label"
                    >
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="priority"
                        className="label"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={taskData.priority}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="mb-2">
                    <label
                        htmlFor="status"
                        className="label"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={taskData.status}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        Add Task
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// Corrected PropTypes for validation
NewTaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // isOpen should be a boolean
    closeModal: PropTypes.func.isRequired,  // closeModal should be a function
    isSideBar: PropTypes.bool.isRequired,
    closeSide: PropTypes.func.isRequired
};

export default NewTaskModal;
