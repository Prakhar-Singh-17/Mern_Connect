import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from 'node:http';
import {Server} from "socket.io"
import { userRoute } from "./routes/userRoute.js";
import { connectToServer } from "./controller/socketManager.js";


const app = express();
const server = createServer(app);
const io = connectToServer(server);

const port = process.env.port || 8080;
const mongoUrl = process.env.MONGO_URL;

app.use(cors(
    {origin: ["https://mern-connect-d8he.onrender.com","http://localhost:5173"],
  credentials: true,}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user",userRoute);

server.listen(port, '0.0.0.0',()=>{
    console.log("Listening");
});


mongoose.connect(mongoUrl)
.then(console.log("Connected"))
.catch((err)=>{
    console.log("Error occcured " + err);
})