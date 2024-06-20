import prisma from "../db/prisma.js"; // prisma  for db operation
import bcryptjs from "bcryptjs"; // for password hashing
import generateToken from "../utils/generateToken.js"; // token
export const signup = async (req, res) => {
    try {
        // extract form elements from request body
        const { fullName, username, password, confirmPassword, gender } = req.body;
        // check if all required fields are filled
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }
        // check password match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        // check if username exist
        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // https://avatar-placeholder.iran.liara.run/
        // generate user profile picture
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // create a new user in the database
        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            },
        });
        // if user creation is successful, generate a token and respond
        if (newUser) {
            generateToken(newUser.id, res);
            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        // extract login elements from request body
        const { username, password } = req.body;
        // find the user by username
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid user" });
        }
        // compare the password with the hashed password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }
        // generate a token and respond with user data
        generateToken(user.id, res);
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    }
    catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    try {
        // clear JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMe = async (req, res) => {
    try {
        // find the user by ID from the request body
        const user = await prisma.user.findUnique({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // respond with user data if user found
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
