import { GeneralError } from '../utils/errors.js';

export default (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            success: false,
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        status: 'error',
        message: "Internal server error.",
        detail: err.message
    });

}
