export const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'None',
            path: '/',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'None',
            path: '/',
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully.',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred during logout. Please try again.',
        });
    }
};
