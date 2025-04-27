import bcrypt from 'bcrypt';
import {
    EMAIL_REGEX,
    JWT_ACCESS_TOKEN_EXPIRATION_MS,
    JWT_REFRESH_TOKEN_EXPIRATION_MS,
} from '../../config/constants.js';
import User from '../../models/User.js';
import { generateAuthTokens } from '../../utils/tokenUtils.js';
import { setAuthCookies } from '../../utils/cookieUtils.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required.',
            });
        }

        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPassword = password.trim();

        if (!EMAIL_REGEX.test(sanitizedEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format.',
            });
        }

        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        const isPasswordValid = await bcrypt.compare(sanitizedPassword, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        const { accessToken, refreshToken } = generateAuthTokens(existingUser._id, existingUser.email);

        const accessExpiresAt = new Date(Date.now() + Number(JWT_ACCESS_TOKEN_EXPIRATION_MS));
        const refreshExpiresAt = new Date(Date.now() + Number(JWT_REFRESH_TOKEN_EXPIRATION_MS));

        setAuthCookies(res, accessToken, refreshToken, accessExpiresAt, refreshExpiresAt);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};
