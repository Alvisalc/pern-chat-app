import jwt from "jsonwebtoken"; // create JWT token
// generate JWT token and set it as HTTP-only cookie
const generateToken = (userId, res) => {
    // ensure JWT secret is set in env variables
    // jwt.sign to create a token with userId as the payload, signing it with the JWT secret
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d", // set token will expire in 15 days (optional)
    });
    // add token as a cookie in the response
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (15 days)
        httpOnly: true, // Make the cookie HTTP-only to prevent XSS attacks
        sameSite: "strict", // 'strict' moode to prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // secure flag in production for HTTPS
    });
    // return generated token
    return token;
};
export default generateToken;
