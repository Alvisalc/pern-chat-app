import express from "express"; // Express framework
import cookieParser from "cookie-parser"; // middleware to handle cookies
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cookieParser()); // middleware to parse cookies in incoming requests
app.use(express.json()); // middleware to parse JSON bodies in incoming requests
app.use("/api/auth", authRoutes); // authericate routes
app.use("/api/messages", messageRoutes); // message routes
// server starting on port 5000
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
