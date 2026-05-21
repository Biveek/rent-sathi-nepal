import express from "express"
import { getMe, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();


//public routes no token required
authRouter.post("/register",register);
authRouter.post("/login",login);


//private/protected route token required
authRouter.get("/me",protect,getMe);

export default authRouter;