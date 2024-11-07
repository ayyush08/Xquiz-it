import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        res.status(500).json(new ApiResponse(500, {}, "Something went wrong while generating access and refresh tokens"));
        throw new ApiError(
            500,
            "Something went wrong while generating access and refresh tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if (
        [name, email, password].some((field) => !field?.trim() === "")
    ) {
        res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        res.status(409).json(new ApiResponse(409, {}, "User already exists"));
        throw new ApiError(409, "User already exists");
    }


    const user = await User.create({
        name,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        res.status(500).json(new ApiResponse(500, {}, "User not created"));
        throw new ApiError(500, "User not created");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json(new ApiResponse(401, {}, "User not found"));
        throw new ApiError(401, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {

        res.status(401).json(new ApiResponse(401, {}, "Invalid password"));
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    res.setHeader("Set-Cookie", [
        `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
        `refreshToken=${refreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
    ]);


    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
    res.setHeader("Set-Cookie", [
        `accessToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`,
        `refreshToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None`,
    ]);


    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;
    
    if (!incomingRefreshToken) {
        res.status(401).json(new ApiResponse(401, {}, "Unauthorized request"));
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            res.status(401).json(new ApiResponse(401, {}, "Invalid refresh token"));
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            res.status(401).json(new ApiResponse(401, {}, "Invalid refresh token"));
            throw new ApiError(401, "Refresh Token is expired or used up");
        }
        const { accessToken, refreshToken:newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);
        res.setHeader("Set-Cookie", [
            `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
            `refreshToken=${newRefreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
        ]);



        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed :)"
                )
            );
    } catch (error) {
        res.status(401).json(new ApiResponse(401, {}, error?.message || 'Invalid Access Token'))
        throw new ApiError(401, error?.message || 'Invalid Access Token');
    }
});





export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
}