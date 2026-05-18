import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/helperFunction.js";

export const userRegister=async(req,res,next)=>{
try{
    const{username,email,password,confirm_password}=req.body;
    if(!username|| !email|| !password || !confirm_password){
        return errorResponse(res,"requires all the field",null,400);
    }
    if(password!=confirm_password){
       return errorResponse(res,"both password must be same",null,400);
    }
    const emailExist=await User.findOne({email:email.toLowerCase()});
    if(emailExist){
       return errorResponse(res,"email already exists",null,400);
    }
    const usernameExist=await User.findOne({username:username});
    if(usernameExist){
        return errorResponse(res,"username already exists",null,400);
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email:email.toLowerCase(),
        password:hashedPassword,
    })

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return successResponse(res,"Registration successful",{
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    },201);

}catch(error){
     next(error);
}
}

export const userLogin=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const input = email.trim();
        
        // Find user by either email or username (case-insensitive)
        const userExist=await User.findOne({
            $or: [
                { email: input.toLowerCase() },
                { username: { $regex: new RegExp("^" + input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$", "i") } }
            ]
        });

        if(!userExist){
            return errorResponse(res,"invalid email or username",null,400);
        }

        const isMatch=await bcrypt.compare(password,userExist.password);

        if(userExist && isMatch){
            const token = jwt.sign(
              { id: userExist._id, username: userExist.username },
              process.env.JWT_SECRET,
              { expiresIn: "7d" }
            );

            return successResponse(res,"Login successful",{
              token,
              user: {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email,
              },
            });
        } else {
            return errorResponse(res,"invalid credentials",null,400);
        }

    }catch(error){
        next(error);
    }
}
export const getProfile=async(req,res,next)=>{
    try{
    const getUser=await User.findById(req.user.id).select("-password");
    return successResponse(res,"Profile fetched successfully",getUser,200);
    }catch(error){
        next(error);
    }
}
export const updateProfile = async (req, res, next) => {


  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-password");



    if (!updatedUser) {
      return errorResponse(res, "User not found", null, 404);
    }

    return successResponse(
      res,
      "Profile updated successfully",
      updatedUser,
      200
    );
  } catch (error) {
    next(error);
  }
};

export const createJob=async(req,res,next)=>{
    try{
        const newJob =new Job({
            ...req.body,
            userId:req.user.id,
        });
        const savedData=await newJob.save();
        return successResponse(res,"Job created successfully",savedData,201);
    }catch(error){
      next(error);
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const { search, status, location ,page,limit,sort} = req.query;

        // Always filter by logged-in user
        const filter = { userId: req.user.id };

        // Sorting options
        let sortOptions = { createdAt: -1 }; // default: latest first
        if(sort==="latest"){
                sortOptions = { createdAt: -1 };
        }
        if(sort==="oldest"){
                sortOptions = { createdAt: 1 };
        }
        if(sort==="salary"){
                sortOptions = { salary: 1 };
        }
        if(sort==="salary-desc"){
                sortOptions = { salary: -1 };
        }

        // Search — partial match across multiple fields
        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [
                { title: regex },
                { company: regex },
                { role: regex },
                { location: regex },
                { jobLink: regex },
                { notes: regex },
            ];
        }

        // Filter — exact/partial match on specific fields
        if (status) {
            filter.status = status;
        }
        if (location) {
            filter.location = new RegExp(location, "i");
        }

        const pageNum=parseInt(page) || 1;
        const limitNum=parseInt(limit) || 10;
        const skipNum=(pageNum-1)*limitNum;

        const allJobs = await Job.find(filter).sort(sortOptions).skip(skipNum).limit(limitNum);
        const totaljobs=await Job.countDocuments(filter);
        const totalPages=Math.ceil(totaljobs/limitNum);
        return successResponse(res,"Jobs fetched successfully",{
            jobs:allJobs,
            currentPage:pageNum,
            totalPages:totalPages,
            totaljobs:totaljobs,
        },200);
    } catch (error) {
        next(error);
    }
}

export const getJob = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await Job.findOne({ _id: id, userId: req.user.id });
        if (!job) {
            return errorResponse(res, "Job not found", null, 404);
        }
        return successResponse(res, "Job fetched successfully", job, 200);
    } catch (error) {
        next(error);
    }
}

export const updateJob=async(req,res,next)=>{
    try{
        const {id}=req.params;  //fetch id of job from URL
        const updatedJob=await Job.findOneAndUpdate(
            {_id:id,userId:req.user.id},
            req.body,
            {returnDocument: 'after' ,runValidators:true}
        );
        if(!updatedJob){
            return errorResponse(res,"Job not found",null,404);
        }
        return successResponse(res,"Job updated successfully",updatedJob,200);
    }catch(error){
        next(error);
    }
}

export const deleteJob=async(req,res,next)=>{
    try{
        const {id}=req.params;
        const deletedJob=await Job.findOneAndDelete(
            {_id:id,userId:req.user.id}
        );
        if(!deletedJob){
            return errorResponse(res,"Job not found",null,404);
        }
        return successResponse(res,"Job deleted successfully",null,200);
    }catch(error){
        next(error);
    }
}

export const totalJobs=async(req,res,next)=>{
    try{
        const totalJobs=await Job.countDocuments({userId:req.user.id});
        return successResponse(res,"Total jobs fetched successfully",{totalJobs},200);
    }catch(error){
        next(error);
    }
}

export const jobStats = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Default structure (VERY IMPORTANT)
    const defaultStats = {
      Applied: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0,
    };

    // Convert aggregation result
    stats.forEach((item) => {
      defaultStats[item._id] = item.count;
    });

    return successResponse(res,"Job stats fetched successfully",{stats:defaultStats},200);
  } catch (error) {
    next(error);
  }
};
