import Verification from "../models/verification.model.js";
import User from "../models/user.model.js";

export const applyForOwner = async (req, res) => {
  try {
    const { full_name, phone, address, citizenship_img, rejection_reason } = req.body;
    if(!full_name || !phone || !address || !citizenship_img || !rejection_reason){
        return res.status(400).json({message :"please fill all the fields"})
    }
    const existing = await Verification.findOne({user_id:req.body._id})//check duplicate application from same user
    if(existing){
        if(existing.status==='pending'){
            return res.status(400).json({message:"Your application is on pending. Please wait for admin review"})
        }
        if(pending.status==="approved"){
            return res.status(400).json({message:"You are already a verified owner"})
            
        }
        if(existing.status==='rejected'){
            existing.full_name = full_name;
            existing.phone = phone;
            existing.address = address;
            existing.citizenship_img = citizenship_img;
            existing.status = "pending";
            existing.rejection_reason = rejection_reason;
            await existing.save();

            return res.json({
                success:true,
                message:"Reapplication submitted. Waiting for admin review.",
                data:existing
            })
        }
    }
    const verification  = await Verification.create({
        user_id:req.body._id,
        full_name,
        phone,
        address,
        citizenship_img,
        rejection_reason
    });

    res.status(201).json({
        success:true,
        message:"Application submitted successfully. Admin will review it soon.",
        data:verification
    })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getMyVerification = async (req, res) => {
  try {
    const verification = await Verification.findOne({user_id: req.user._id})

    if(!verification){
        return res.json({
            success: true,
            message:"No application found",
            data:null
        })
    }

    res.json({
        success:true,
        data:verification
    })

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPendingVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find({status:"pending"})
    .populate("user_id","name email phone createdAt")
    .sort({createdAt:1});

    if(!verifications){
        return res.json({
            success:true,
            message:"No pending applications",
            data:null
        })
    }
    res.json({
        success:true,
        data:verifications
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getAllVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find()
    .populate("user_id","name email phone createdAt")
    .sort({createdAt:-1})
    if(!verifications){
        return res.json({
            success:true,
            message:"No applications avaiable",
            data:null
        })
    }
    res.json({
        success:true,
        data:verifications
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const decideVerification = async (req, res) => {
  try {
    const {action, reason} = req.body;

    if(!["approve", "reject"].includes(action)){
        return res.status(400).json({ message: "Action must be approve or reject" });
    }

    const verification = await Verification.findById(req.params.id);

    if(!verification){
        return res.status(404).json({message:"Verification not found"})
    }
    if(verification.status === "pending"){
        return res.status(400).json({message:`The application is already on ${verification.status}. Please wait while admin reviews it`})
    }

    if(action === 'approve'){
        verification.status = 'approved';
        await verification.save();

    await User.findByIdAndUpdate(verification.user_id,{
            role:"owner",
            is_verified_owner:true
        })

        res.json({
            success:true,
            message:"User approved as owner sucessfully",
            data:verification
        })
    }
    else{
        if(!reason){
            return res.status(400).json({message:"Please provide a reason of rejection"});
        }
        verification.status = 'rejected';
        verification.rejection_reason=reason;
        await verification.save();

        res.json({
            success:true,
            message:"Verification rejected",
            data:verification
        })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
