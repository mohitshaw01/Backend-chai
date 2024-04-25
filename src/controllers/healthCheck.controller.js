import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"

const healthcheck = asyncHandler(async (req, res) => {
   try {
     res.status(200).send("Server is up and running");
   } catch (error) {
        throw new ApiError(500, "Internal Server Error");
   }
})

export { healthcheck }