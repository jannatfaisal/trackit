import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";
import { checkLogin, getTasks } from "../utils/apiCalls";

export const UserProvider = ({ children }) => {
    const [sideBar, setSideBar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState([]);

    const checkLoginStatus = async () => {
        try {
            const response = await checkLogin();

            if (response.isLoggedIn) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            setIsLoggedIn(false);
            throw new error
        }
    };

    const getTask = async () => {
        try {
            const response = await getTasks();

            if (response.success) {
                setTasks(response.tasks);
            }
        } catch (error) {
            throw new error
        } finally {
            setRefresh(false)
        }
    };

    useEffect(() => {
        checkLoginStatus();
        getTask()
    }, []);

    if (refresh) {
        getTask()
    }

    return (
        <UserContext.Provider value={{
            sideBar,
            setSideBar,
            isLoggedIn,
            setIsLoggedIn,
            addTaskModal,
            setAddTaskModal,
            tasks,
            setRefresh,
            filteredTasks,
            setFilteredTasks
        }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
