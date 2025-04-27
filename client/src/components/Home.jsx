import { useContext } from "react";
import Main from "./Main";
import { UserContext } from "../contexts/UserContext";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Sidebar from "./Sidebar";
import AddTask from "./AddTask";

const Home = () => {
    const { sideBar, addTaskModal } = useContext(UserContext);

    return (
        <div>
            {sideBar ? (
                <Sidebar />
            ) : (
                <>
                    {addTaskModal && <AddTask />}
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </>
            )}
        </div>
    );
};

export default Home;
