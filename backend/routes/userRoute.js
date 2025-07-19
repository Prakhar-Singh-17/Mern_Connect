import express from "express";
import {signup,login ,getProfile} from "../controller/userController.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/profile", getProfile); 


export { router as userRoute };
