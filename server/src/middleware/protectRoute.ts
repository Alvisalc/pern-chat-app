import jwt, { JwtPayload } from "jsonwebtoken"; // jwt library and JWTpayload type
import { Request, Response, NextFunction } from "express"; // types from express
import prisma from "../db/prisma.js"; // Prisma client

// type for userId
interface DecodedToken extends JwtPayload {
	userId: string;
}

// extend Express request interface to include user field by setting it globally available 
declare global {
	namespace Express {
        // add user field in request
		export interface Request {
			user: {
				id: string;
			};
		}
	}
}

// middleware to protect routes by verifying JWT token, next - is for next function after the JWT verified.
const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
	try {
        // receive jwt cookie from request
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No token provided" });
		}

        // verify the jwt token using secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
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
	} catch (error: any) {
		console.log("Error in protectRoute middleware", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default protectRoute;