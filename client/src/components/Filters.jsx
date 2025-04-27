import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Filters = () => {
    const { tasks, setFilteredTasks } = useContext(UserContext);
    const [filters, setFilters] = useState({
        priority: "",
        status: "",
        sortByDate: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filtered = tasks;

        if (filters.priority) {
            filtered = filtered.filter(
                (task) => task.priority === filters.priority
            );
        }

        if (filters.status) {
            filtered = filtered.filter((task) => task.status === filters.status);
        }

        if (filters.sortByDate) {
            filtered = [...filtered].sort((a, b) => {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return filters.sortByDate === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            });
        }

        setFilteredTasks(filtered);
    };

    const clearFilters = () => {
        setFilters({ priority: "", status: "", sortByDate: "" });
        setFilteredTasks(tasks);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col space-y-6 mt-5">
            <div className="flex flex-wrap justify-between gap-4 md:justify-center">
                <div className="">
                    <label className="label">Priority</label>
                    <select
                        name="priority"
                        value={filters.priority}
                        onChange={handleFilterChange}
                        className="filterInput"
                    >
                        <option value="">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="">
                    <label className="label">Status</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="filterInput"
                    >
                        <option value="">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <div className="">
                    <label className="label">Sort by Due Date</label>
                    <select
                        name="sortByDate"
                        value={filters.sortByDate}
                        onChange={handleFilterChange}
                        className="filterInput"
                    >
                        <option value="">None</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end space-x-3 md:justify-center">
                <button
                    onClick={applyFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                >
                    Apply Filters
                </button>
                <button
                    onClick={clearFilters}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default Filters;
