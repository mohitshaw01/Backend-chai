import mongoose,{Schema} from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        name : {
            type : mongoose.Types.ObjectId,
            ref : "User"
        },
        description : {
            type : String,
            required : true
        },
        videos :  [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        owner :  {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    }, {timestamps : true}
)

export default Playlist = mongoose.model("Playlist",playlistSchema)