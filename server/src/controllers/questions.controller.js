import { Question } from "../models/questions.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addQuestion = asyncHandler(async (req, res) => {
    const { question, options, correctAnswers, explanation,userAnswers, multipleCorrectAnswers } = req.body;
    if (!(question || options || correctAnswers || multipleCorrectAnswers|| userAnswers)) {
        throw new ApiError(400, "All fields are required");
    }
    console.log(req.body);
    

    const newQuestion = await Question.create({
        question,
        options,
        correctAnswers,
        explanation : explanation || "no explanation provided",
        userAnswers,
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
                options: 1,
                correctAnswers: 1,
                explanation: 1,
                userAnswers: 1,
                multipleCorrectAnswers: 1,
                userDetails: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    name: 1
                },
                createdAt: 1
            }
        },
        {
            $sort: { createdAt: -1 }
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