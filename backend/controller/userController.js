import User from "../models/userModel.js";
import Meeting from "../models/meetingModel.js"
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function signup(req, res) {
  try {
    console.log(req.body);
    let { fullname, username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: fullname,
      username: username,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ success: true, message: "User saved" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error Signing Up" });
  }
}

export async function login(req, res) {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username: username });
    if (!user) {
      res.json({ success: false, message: "Username does not exist" });
    }
    const matchPass = bcrypt.compare(password, user.password);
    if (!matchPass) {
      res.json({ success: false, message: "Wrong Password" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();
     res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        username: user.username,
        name: user.name,
      },
    });
  } catch (err) {
    res.json({ success: false, message: "Error in login ! Please try later" });
  }
}

export async function getProfile(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false });

  const user = await User.findOne({ token });
  if (!user) return res.status(403).json({ success: false });

  res.json({
    success: true,
    user: { name: user.name, username: user.username },
  });
}

export async function addToHistory(req, res){
 try{
 const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false });

  const user = await User.findOne({ token });
  if (!user) return res.status(403).json({ success: false });

  const {meetingCode} = req.body;

  const newMeeting = new Meeting({
    user_id : user._id,
    meetingCode : meetingCode
  })

  await newMeeting.save()
  res.json({success : true});
 }
 catch(e){
   res.json({ success: false, message: "Error saving meeting data" });
   console.log(e);
 }
}

export async function fetchUserHistory(req,res){
 try{
   const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ success: false });

  const user = await User.findOne({ token });
  if (!user) return res.status(403).json({ success: false });

  const history = await Meeting.find({user_id : user._id}).populate({ path: "user_id", select: "username" });
  if (!history) return res.status(404).json({ success: true , message : "No History"});

  res.json({success : true , history});
 }
 catch(e){
  res.json({success : false , message : "Error in fetching history"});
  console.log(e);
 }
}
