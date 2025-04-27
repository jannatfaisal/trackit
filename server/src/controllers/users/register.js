import bcrypt from 'bcrypt';
import User from "../../models/User.js";
import {
    BCRYPT_SALT_ROUNDS,
    EMAIL_REGEX,
    JWT_ACCESS_TOKEN_EXPIRATION_MS,
    JWT_REFRESH_TOKEN_EXPIRATION_MS,
    PASSWORD_REGEX
} from '../../config/constants.js';
import { generateAuthTokens } from '../../utils/tokenUtils.js';
import { setAuthCookies } from '../../utils/cookieUtils.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const sanitizedName = name.trim();
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPassword = password.trim();

        if (!sanitizedName || !sanitizedEmail || !sanitizedPassword) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required.',
            });
        }

        if (!EMAIL_REGEX.test(sanitizedEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format.',
            });
        }

        if (!PASSWORD_REGEX.test(sanitizedPassword)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
            });
        }

        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'This email is already registered.',
            });
        }

        const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

        const user = await User.create({
            name: sanitizedName,
            email: sanitizedEmail,
            password: hashedPassword,
        });

        const { accessToken, refreshToken } = generateAuthTokens(user._id, user.email);

        const accessExpiresAt = new Date(Date.now() + Number(JWT_ACCESS_TOKEN_EXPIRATION_MS));
        const refreshExpiresAt = new Date(Date.now() + Number(JWT_REFRESH_TOKEN_EXPIRATION_MS));

        setAuthCookies(res, accessToken, refreshToken, accessExpiresAt, refreshExpiresAt);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred during registration. Please try again later.',
        });
    }
};
