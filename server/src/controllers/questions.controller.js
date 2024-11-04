import { Question } from "../models/questions.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addQuestion = asyncHandler(async (req, res) => {
    const { question, answers, correctAnswers, explanation, multipleCorrectAnswers } = req.body;
    if (!(question || answers || correctAnswers || explanation || multipleCorrectAnswers)) {
        throw new ApiError(400, "All fields are required");
    }

    const checkQuestion = await Question.findOne({ question });
    if (checkQuestion) {
        throw new ApiError(409, "Question already exists");
    }

    const newQuestion = await Question.create({
        question,
        answers,
        correctAnswers,
        explanation,
        multipleCorrectAnswers,
        attemptedBy: req.user._id
    });

    if (!newQuestion) {
        throw new ApiError(500, "Question not created");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, newQuestion, "Question created successfully"));

});


const getUserQuestions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const questionsAggregate = await Question.aggregate([
        {
            $match: { attemptedBy: userId }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'attemptedBy',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $unwind: '$userDetails'
        },
        {
            $project: {
                question: 1,
                answers: 1,
                correctAnswers: 1,
                explanation: 1,
                multipleCorrectAnswers: 1,
                userDetails: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    name: 1
                }
            }
        }
    ])

    if (!questionsAggregate) {
        throw new ApiError(404, "Questions not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, questionsAggregate, "Questions fetched successfully"));
})

export { addQuestion, getUserQuestions };