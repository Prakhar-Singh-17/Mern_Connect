import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
    },
    meetingCode : {type : String , required : true},
    date : {
        type : String , 
        default : Date.now ,
        required : true
    }
})

const Meeting  = mongoose.model("Meeting",meetingSchema);

export default Meeting;