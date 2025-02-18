import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || "lwrknsoidzcxxcnfi"; // Use .env for security

export const checkingController = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Running checkingController...",
            success: true
        })
    }
    catch (error) {
        return res.status(400).json({
            message: "Error in checkingController...",
            success: false
        })
    }
}

// 🟢 REGISTER CONTROLLER
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all details...",
                success: false
            });
        }

        // ✅ Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists...",
                success: false
            });
        }

        // ✅ Create a new user
        const newUser = await User.create({
            name,
            email,
            password,
        });

        // ✅ Generate JWT Token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, SECRET_KEY, { expiresIn: "7d" });

        return res.status(201).json({
            message: "User registered successfully!",
            success: true,
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                subscription: newUser.subscription
            },
            token, // Send JWT Token
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            message: "Error in register controller...",
            success: false
        });
    }
};

// 🟢 LOGIN CONTROLLER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all details...",
                success: false
            });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not found...",
                success: false
            });
        }

        // ✅ Check if password matches
        if (user.password !== password) {
            return res.status(400).json({
                message: "Incorrect password...",
                success: false
            });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

        return res.status(200).json({
            message: "User login successful...",
            success: true,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                subscription: user.subscription
            },
            token, // Send JWT Token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Error in login controller...",
            success: false
        });
    }
};
