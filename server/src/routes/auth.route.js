import express from "express"
import { getMe, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../utils/validators.js";

const authRouter = express.Router();


//public routes no token required
authRouter.post("/register",validate(registerSchema),register);
authRouter.post("/login",validate(loginSchema),login);


//private/protected route token required
authRouter.get("/me",protect,getMe);

export default authRouter;