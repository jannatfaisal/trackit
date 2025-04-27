import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { logout } from "../utils/apiCalls";

const Sidebar = () => {
    const { sideBar, setSideBar, isLoggedIn, setIsLoggedIn, addTaskModal, setAddTaskModal } = useContext(UserContext);

    const logoutApi = async () => {
        try {
            const res = await logout()
            if (res.success) {
                setIsLoggedIn(false)
                alert(res.message)
            }
        } catch (error) {
            alert('Something went wrong')
            throw new error
        }
    }

    return (
        <div className="h-full bg-gray-800 text-white w-64 fixed shadow-md">
            <nav className="flex flex-col">
                {
                    isLoggedIn ?
                        <div className="flex flex-col">
                            <Link
                                onClick={() => {
                                    setSideBar(!sideBar);
                                    setAddTaskModal(!addTaskModal)
                                }}
                                className="mobileBtn"
                            >
                                + Add Task
                            </Link>
                            <Link
                                to="/"
                                onClick={logoutApi}
                                className="mobileBtn"
                            >
                                Logout
                            </Link>
                        </div>
                        :
                        <div className="flex flex-col">
                            <Link
                                to="/register"
                                onClick={() => setSideBar(!sideBar)}
                                className="mobileBtn"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setSideBar(!sideBar)}
                                className="mobileBtn"
                            >
                                Login
                            </Link>
                        </div>
                }
            </nav>
        </div>
    );
};

export default Sidebar;
