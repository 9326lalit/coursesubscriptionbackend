import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

// Price details
const PLAN_PRICES = {
    Basic: 499,       // 1 month
    Premium: 1499,    // 3 months
    Combo: 2999       // 6 months (discounted)
};

// ✅ Create a new Subscription (with price & discount)
export const createSubscription = async (req, res) => {
    try {
        const { userId, plan, courses, paymentId } = req.body;
        const startDate = new Date();
        const expiryDate = new Date();
        let selectedCourses = [];

        // Set expiry date based on the plan
        if (plan === "Basic") {
            expiryDate.setMonth(startDate.getMonth() + 1);
        } else if (plan === "Premium") {
            expiryDate.setMonth(startDate.getMonth() + 3);
        } else if (plan === "Combo") {
            expiryDate.setMonth(startDate.getMonth() + 6);
            if (courses) {
                selectedCourses = await Course.find({ _id: { $in: courses } });
                if (selectedCourses.length === 0) {
                    return res.status(400).json({ success: false, message: "Invalid courses selected" });
                }
            }
        }

        // Validate user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Get price based on plan
        const price = PLAN_PRICES[plan] || 0;

        // Create subscription
        const subscription = new Subscription({
            user: userId,
            plan,
            price,
            courses: selectedCourses.map(course => course._id),
            startDate,
            expiryDate,
            status: "active",
            paymentId
        });

        await subscription.save();

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            subscription
        });

    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// ✅ Get all Subscriptions (Admin Access)
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find()
            .populate("user", "name email")
            .populate("courses", "title description");

        res.status(200).json({ success: true, subscriptions });

    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// ✅ Get User's Subscription
export const getUserSubscription = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await Subscription.findOne({ user: userId })
            .populate("courses", "title description");

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        res.status(200).json({ success: true, subscription });

    } catch (error) {
        console.error("Error fetching subscription:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};

// ✅ Renew Subscription (with updated price)
export const renewSubscription = async (req, res) => {
    try {
        const { userId } = req.body;
        const subscription = await Subscription.findOne({ user: userId });

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        // Extend expiry date based on plan
        const newExpiryDate = new Date(subscription.expiryDate);
        newExpiryDate.setMonth(newExpiryDate.getMonth() + 3); 

        subscription.expiryDate = newExpiryDate;
        subscription.status = "active";
        subscription.price += PLAN_PRICES[subscription.plan]; // Add renewal price
        await subscription.save();

        res.status(200).json({ success: true, message: "Subscription renewed successfully", subscription });

    } catch (error) {
        console.error("Error renewing subscription:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
