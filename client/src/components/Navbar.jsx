import { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { logout } from "../utils/apiCalls";

const Navbar = () => {
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
        <nav className="bg-gray-100 shadow-md">
            <div className="flex justify-between items-center px-5 py-4">
                <Link to="/">
                    <div className="logo">
                        Trackit
                    </div>
                </Link>

                <div
                    onClick={() => setSideBar(!sideBar)}
                    className="md:hidden cursor-pointer text-blue-600"
                >
                    {sideBar ? (
                        <IoMdClose size={24} />
                    ) : (
                        <FaBars size={24} />
                    )}
                </div>

                <div className="hidden md:flex space-x-5">
                    {
                        isLoggedIn ?
                            <div className="hidden md:flex space-x-3">
                                <div className="desktopBtn" onClick={() => setAddTaskModal(!addTaskModal)}>
                                    + Add Task
                                </div>
                                <Link to="/" onClick={logoutApi}>
                                    <div className="desktopBtn">
                                        Logout
                                    </div>
                                </Link>
                            </div>
                            :
                            <div className="hidden md:flex space-x-3">
                                <Link to="/register">
                                    <div className="desktopBtn">
                                        Register
                                    </div>
                                </Link>
                                <Link to="/login">
                                    <div className="desktopBtn">
                                        Login
                                    </div>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
