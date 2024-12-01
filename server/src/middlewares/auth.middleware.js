import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '')
        console.log(token);
        if (!token) {
            if(req.cookies?.refreshToken){
                throw new ApiError(401, 'jwt expired')
            }
            throw new ApiError(401, 'Unauthorized request, token not found')
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')

        if (!user) {
            res
            throw new ApiError(401, 'Invalid Access Token')
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(401, error?.message || 'Invalid Access Token');

    }
});





