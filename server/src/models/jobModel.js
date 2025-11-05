import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobId:{type:String,required:true,unique:true},
    title:String,
    company:String,
    location:String,
    description:String,
    url:String,
    source:String,
},
{timestamps:true}
)

const Job = mongoose.model("Job",jobSchema);

export default Job;