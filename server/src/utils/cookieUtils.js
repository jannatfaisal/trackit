export const setAuthCookies = (
    res,
    accessToken,
    refreshToken,
    accessExpiresAt,
    refreshExpiresAt
) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction,
        path: '/',
        sameSite: 'None',
        expires: accessExpiresAt,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        path: '/',
        sameSite: 'None',
        expires: refreshExpiresAt,
    });
};
