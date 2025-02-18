import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided.",
                success: false
            });
        }

        // ✅ Verify JWT Token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: Invalid token.",
            success: false
        });
    }
};


export default authMiddleware;