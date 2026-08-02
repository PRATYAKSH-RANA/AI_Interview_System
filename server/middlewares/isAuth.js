// Update isAuth.js to handle different token payload naming conventions
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(400).json({ message: "User does not have token" });
        }
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!verifyToken) {
            return res.status(401).json({ message: "User token is not valid" });
        }

        // Fallback checks for common token payload structures (userId, id, or _id)
        req.userId = verifyToken.userId || verifyToken.id || verifyToken._id;

        if (!req.userId) {
            return res.status(401).json({ message: "Invalid token payload: User ID missing" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: `Not authorized: ${error.message}` });
    }
};

export default isAuth;