/**
 * Routes that are public
 * @type {string}
 */
export const publicRoutes = [ "/" ];

/**
 * These routes are used for authentication
 * @type {string}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/verification",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/google",
];

/**
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth" ;

/**
 * The default redirect path after log in
 * @type {string}
 */
// eslint-disable-next-line no-unused-vars
export const DEFAULT_LOGIN_REDIRECT = "/account";
