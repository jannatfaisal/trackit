import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthLink = ({ text, to }) => {
    return (
        <p className="font-semiBold text-center mb-6 text-gray-800 my-5">
            {text},{" "}
            <Link to={to}>
                <span className="text-blue-500 hover:text-blue-700 transition">
                    click here
                </span>
            </Link>
        </p>
    );
};

AuthLink.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default AuthLink;
