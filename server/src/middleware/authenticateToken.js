import { verifyAccessToken } from '../utils/tokenUtils.js';

export const authenticateToken = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Access token missing.'
            });
        }

        const decoded = verifyAccessToken(accessToken);

        if (!decoded || !decoded.userId) {
            throw new Error('Invalid token payload.');
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};
