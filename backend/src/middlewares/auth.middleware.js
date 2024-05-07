import jwt from 'jsonwebtoken';
import ApiError from "../utils/apiError.js";
import { config } from 'dotenv';
config();

const SECRET_KEY = process.env.ACESS_TOKEN_SECRET; // Replace with your actual secret key

export const authenticate = async (req, res, next) => {
    try {
        let token;

        // Check if token is present in cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Check if token is present in request body
        if (!token && req.body && req.body.token) {
            token = req.body.token;
        }

        // Check if token is present in authorization header
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            // Token not found
            req.user = null;
            return next(new ApiError(401, 'Unauthorized', 'No token provided'));
        }

        // Verify JWT token
        const decoded = jwt.verify(token, SECRET_KEY);
        // Set authenticated user in request context
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error.message);
        req.user = null;
        return next(new ApiError(500, 'Internal Server Error', error.message));
    }
};
