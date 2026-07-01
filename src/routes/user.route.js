import express, { Router } from "express";
import { createUser, deleteUser, getAllUsers, getById, updateUser, updateProfileImage } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getAllUsers);
userRoute.put("profile-image", updateProfileImage);
userRoute.get("/:id", getById);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);


export default userRoute;
