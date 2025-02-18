// import mongoose from "mongoose";

// const subscriptionSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
//     plan: { type: String, enum: ["Basic", "Premium"], required: true },
//     startDate: { type: Date, required: true },
//     expiryDate: { type: Date, required: true },
//     status: { type: String, enum: ["active", "expired"], default: "active" },
//     paymentId: { type: String }, // Stripe or Razorpay payment ID
// }, { timestamps: true });

// export default mongoose.model("Subscription", subscriptionSchema);


import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Basic", "Premium", "Combo"], required: true },
    price: { type: Number, required: true }, // Price of the subscription
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Included courses
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
    paymentId: { type: String, required: true }, // Payment ID (Stripe/Razorpay)
}, { timestamps: true });

// Auto-update expired subscriptions
subscriptionSchema.pre("save", function (next) {
    if (new Date() > this.expiryDate) {
        this.status = "expired";
    }
    next();
});

export default mongoose.model("Subscription", subscriptionSchema);
