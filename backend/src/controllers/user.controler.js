import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js  ";
import { isEmail, isValidPassword } from "../utils/regexCheck.js";


// const registerUser = asyncHandler(async (req, res, next) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         // Validation checks for required fields, email format, and password strength
//         if ([firstName, lastName, email, password].some((value) => value === '')) {
//             return next(new ApiError(403, 'All fields are required'));
//         } else {
//             if (!isEmail(email)) {
//                 return next(new ApiError(403, 'Email is invalid'));
//             } else {
//                 if (!isValidPassword(password)) {
//                     return next(new ApiError(403, 'Password is invalid'));
//                 }
//             }
//         }

//         // Check if the user already exists in the database
//         const existUser = await User.findOne({ email });
//         if (existUser) {
//             return next(new ApiError(403, 'User already registered this account'));
//         }

//         // Create a new user document
//         const user = new User({
//             firstName,
//             lastName,
//             email,
//             password, // Assuming this is already hashed in the pre-save middleware
//         });

//         // Save the user document to the database
//         await user.save();

//         // Respond with success message and user information
//         return res.status(200).json({
//             success: true,
//             message: 'User created successfully',
//             user
//         });

//     } catch (error) {
//         // Handle any errors that occur during the registration process
//         console.error(error);
//         return next(new ApiError(500, 'Internal Server Error', error.message));
//     }
// });

const resolvers = {
    Mutation: {
        createUser: async (_, { input }) => {
            try {
                const { firstName, lastName, email, password } = input;

                if ([firstName, lastName, email, password].some((value) => value.trim() === '')) {
                    const error = new Error('All fields are required');
                    error.statusCode = 400; // Bad Request
                    throw error;
                } else {
                    if (!isEmail(email)) {
                        throw new Error('Email is invalid');
                    } else {
                        if (!isValidPassword(password)) {
                            throw new Error('Password is invalid');
                        }
                    }
                }

                //  Check if the user already exists in the database
                const existUser = await User.findOne({ email });
                if (existUser) {
                    throw new Error('User already registered this account');
                }

                // Create a new user document
                const user = new User({
                    firstName,
                    lastName,
                    email,
                    password, // Assuming this is already hashed in the pre-save middleware

                });

                await user.save();

                return newUser;
            } catch (error) {
                // Handle any errors that occur during the registration process
                console.error(error);
                throw new Error(error.message);
                // return next(new ApiError(500, 'Internal Server Error', error.message));
            }
        },
        loginUser: async (_, { input }, { res }) => {
            const { email, password } = input;

            if ([email, password].some((value) => value.trim() === '')) {
                const error = new Error('All fields are required');
                error.statusCode = 400; // Bad Request
                throw error;
            } else {
                if (!isEmail(email)) {
                    throw new Error('Email is invalid');
                } else {
                    if (!isValidPassword(password)) {
                        throw new Error('Password is invalid');
                    }
                }
            }

            //  Check if the user already exists in the database
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User is not register please register this account...');
            }

            if (!(await user.comparePassword(password))) {
                throw new Error('Password Wrong...');
            }

            const token = await user.generateToken();
            user.access_token = token;

            res.cookie('token', token, {
                httpOnly: true,
            });

            await user.save();

            return user;

        }
    },
    Query: {
        getUserById: async (_, { input }) => {

            if (!input) {
                const error = new Error('Id not found');
                error.statusCode = 400; // Bad Request
                throw error;
            }

            const user = await User.findById({ _id: input });

            if (!user) {
                throw new Error('User is not register please register this account...');
            }

            return user;
        }
    },
};

export default resolvers