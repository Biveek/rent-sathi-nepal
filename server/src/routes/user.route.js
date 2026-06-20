import express, { Router } from "express";
import { createUser, deleteUser, getAllUsers, getById, updateUser } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getById);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);


export default userRoute;
