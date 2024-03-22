import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

const healthcheck = asyncHandler(async (req, res) => {
   try {
     res.status(200).send("Server is up and running");
   } catch (error) {
        throw new ApiError(500, "Internal Server Error");
   }

})

export { healthcheck }