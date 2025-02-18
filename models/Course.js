import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor", required: true }, // Instructor ID
    // content: [{ type: String }], // Video URLs or content links
    category: { type: String },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Student IDs
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
