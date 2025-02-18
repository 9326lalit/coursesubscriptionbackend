import express from "express";
import {
    createSubscription,
    getAllSubscriptions,
    getUserSubscription,
    renewSubscription
} from "../controllers/subscriptionController.js";

const router = express.Router();

// ✅ Create a new subscription (includes price & courses)
router.post("/create", createSubscription);

// ✅ Get all subscriptions (Admin only)
router.get("/all", getAllSubscriptions);

// ✅ Get a user's subscription
router.get("/:userId", getUserSubscription);

// ✅ Renew subscription
router.post("/renew", renewSubscription);

export default router;
