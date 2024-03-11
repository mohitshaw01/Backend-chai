class ApiError extends Error{
    constructor(status, message = "Something went wrong") {
        super(message);
        this.status = status;
        this.message = message;
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static notFound(message) {
        return new ApiError(404, message);
    }
}

export {ApiError}