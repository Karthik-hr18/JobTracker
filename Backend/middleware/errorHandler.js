import { errorResponse } from "../utils/helperFunction.js";

export const errorHandler=(err,req,res,next)=>{
    if(err.name==="CastError"){
        return errorResponse(res,"Invalid ID format",null,400);
    }
    if(err.code===11000){
        return errorResponse(res,"Duplicate key error",null,409);
    }
    if(err.name==="ValidationError"){
        return errorResponse(res,err.message,null,400);
    }
    if(err.name==="JsonWebTokenError"){
        return errorResponse(res,"Invalid token",null,401);
    }
    if(err.name==="TokenExpiredError"){
        return errorResponse(res,"Token expired",null,401);
    }
    return errorResponse(res,"Internal server error",null,500);
}