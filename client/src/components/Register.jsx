import { useContext, useState } from "react";
import { FaEye, FaRegEye } from "react-icons/fa";
import AuthLink from "./AuthLink";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/apiCalls";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(UserContext);
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(user)

            if (res.success) {
                alert(res.message);
                setIsLoggedIn(true);
                navigate('/')
            } else {
                alert(res.response.data.message)
            }

        } catch (error) {
            alert('Something went wrong')
            throw new error
        }
    };

    return (
        <div className="w-full flex items-center justify-center mt-5 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm px-8 py-6 shadow-lg rounded-lg bg-white shadow-slate-600"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Register
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="label"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="label"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="label"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="passwordInput"
                            required
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
                        >
                            {showPassword ? <FaRegEye /> : <FaEye />}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="formSubmitBtn"
                >
                    Register
                </button>

                <AuthLink
                    text="Already have an Account?"
                    linkText="Login here"
                    to="/login"
                />
            </form>
        </div>
    );
};

export default Register;
