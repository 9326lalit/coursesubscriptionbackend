import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["free", "premium"], default: "free" },
    subscription: {
        plan: { type: String, enum: ["Basic", "Premium"], default: "Basic" },
        startDate: { type: Date },
        expiryDate: { type: Date }
    }
});
export default mongoose.model("User", userSchema);
