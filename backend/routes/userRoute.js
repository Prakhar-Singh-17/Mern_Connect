import express from "express";
import {signup,login ,getProfile, addToHistory , fetchUserHistory} from "../controller/userController.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/profile", getProfile); 
router.post("/addToHistory",addToHistory);
router.get("/fetchUserHistory",fetchUserHistory);


export { router as userRoute };
