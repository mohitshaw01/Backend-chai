import mongoose from "mongoose";
//
const subscriptionSchema = new mongoose.Schema(
    {
        subscriber : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        channel : {
            // it is also a user
            tyep : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    }, {timestamps : true}
)

export default Subscription = mongoose.model("Subscription",subscriptionSchema)