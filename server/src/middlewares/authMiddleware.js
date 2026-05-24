import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const protect = async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
           return res.status(401).json({message:"Not logged in"})
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if(!req.user){
            return res.status(401).json({message:"User not found"})
        }
        next();
    }
    catch(err){
        return res.status(400).json({message:"Token invalid or expired"})
    }
}

export const ownerOnly = async (req,res,next)=>{
    if(req.user.role !== "owner" && req.user.role !== 'admin'){
        return res.status(403).json({message:"Owner access required"});
    }
    next();
}
export const admminOnly = async (req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({message:"Owner access required"});
    }
    next();
}   