import jwt from "jsonwebtoken"; // jwt library and JWTpayload type
import prisma from "../db/prisma.js"; // Prisma client
// middleware to protect routes by verifying JWT token, next - is for next function after the JWT verified.
const protectRoute = async (req, res, next) => {
    try {
        // receive jwt cookie from request
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }
        // verify the jwt token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        // find the user in the database using userId from the decoded token
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, username: true, fullName: true, profilePic: true },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // add user to the request object for further use
        req.user = user;
        // call the next function if everything is verified 
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export default protectRoute;
