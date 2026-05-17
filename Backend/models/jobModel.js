import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
   title:String,
   company:String,
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied'
    },
    location:String,
   salary:Number,
   jobLink:String,
   notes:String,
},{
    timestamps:true
});

export default mongoose.model("Job", jobSchema);