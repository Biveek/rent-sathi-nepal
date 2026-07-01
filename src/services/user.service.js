import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadFile from "../utils/fileUploader.js";

export const createUserService = async (data) => {
   const { name, email, password, phone, role } = data;

   if(!name || !email || !password){
    throw new Error("Name, email and password are required");
   }

   const existingUser = await User.findOne({email});
   if(existingUser){
    throw new Error("User with this email already exists");
   }

   const hashedPassword = await bcrypt.hash(password, 10);
   const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
   });
   const{password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const getAll = async () => {
  return await User.find().select("-password");
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if(!user) throw new Error("User not found");
  return user;
};

export const updateUserService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {new: true}).select("-password");
  if(!user) throw new Error("User not found");
  return user;
};

export const deleteUserService = async (id) => {
  const user = await User.findById(id);
  if(!user) throw new Error("User not found");
  await User.findByIdAndDelete(id);
  return {message:"User deleted successfully"};
};


export const updateProfileImageService = async (id, file) => {
  const uploadedFiles = await uploadFile([file]);

  return await User.findByIdAndUpdate(
    id,
    {
      profileImageUrl: uploadedFiles[0].url,
    },
    { returnDocument: "after" },
  );
};
