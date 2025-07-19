import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
    user_id : String,
    meetingCode : {type : String , required : true},
    date : {
        type : String , 
        default : Date.now ,
        required : true
    }
})

const Meeting  = mongoose.model("Meeting",meetingSchema);

export default Meeting;