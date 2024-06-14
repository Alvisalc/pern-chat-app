import express from "express"; // Express framework
import cookieParser from "cookie-parser"; // middleware to handle cookies

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js" 

import dotenv from "dotenv";
dotenv.config();

const app = express(); // create instance fo an express application

app.use(cookieParser()); // middleware to parse cookies in incoming requests
app.use(express.json()); // middleware to parse JSON bodies in incoming requests

app.use("/api/auth",authRoutes) // authericate routes
app.use("/api/messages",messageRoutes) // message routes

// server starting on port 5000
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
});


// Todo: Add socket.io to the server
// Todo: configure this server for the deployment