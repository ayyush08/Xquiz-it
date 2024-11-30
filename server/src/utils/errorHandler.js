import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        // Handle your custom ApiError
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Something went wrong',
            errors: err.errors || [],
        });
    }

    // Handle all other errors
    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export { errorHandler };
