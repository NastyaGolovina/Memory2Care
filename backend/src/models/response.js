function successResponse(data) {
    return {
        success: true,
        data: data,
        error: null
    };
}

function errorResponse(message, code = null) {
    return {
        success: false,
        data: null,
        error: {
            message: message,
            code: code
        }
    };
}

module.exports = { successResponse, errorResponse };