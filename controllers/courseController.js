import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, instructor, category } = req.body;

        // if (!title || !description || !price || !instructor) {
        //     return res.status(400).json({ message: "Please provide all required fields.", success: false });
        // }

        const newCourse = await Course.create({
            title,
            description,
            price,
            instructor,
            // content,
            category
        });

        res.status(201).json({ message: "Course created successfully!", success: true, newCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating course.", success: false });
    }
};



export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email").populate("studentsEnrolled", "name email");

        res.status(200).json({ message: "All courses retrieved successfully.", success: true, courses });
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses.", success: false });
    }
};



export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("instructor", "name email").populate("studentsEnrolled", "name email");

        if (!course) {
            return res.status(404).json({ message: "Course not found.", success: false });
        }

        res.status(200).json({ message: "Course found.", success: true, course });
    } catch (error) {
        res.status(500).json({ message: "Error fetching course.", success: false });
    }
};



export const enrollStudent = async (req, res) => {
    try {
        const { id } = req.params; // Course ID
        const { userId } = req.body; // Student ID

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found.", success: false });
        }

        if (course.studentsEnrolled.includes(userId)) {
            return res.status(400).json({ message: "User already enrolled.", success: false });
        }

        course.studentsEnrolled.push(userId);
        await course.save();

        res.status(200).json({ message: "User enrolled successfully!", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling user.", success: false });
    }
};



export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found.", success: false });
        }

        res.status(200).json({ message: "Course updated successfully!", success: true, updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating course.", success: false });
    }
};



export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found.", success: false });
        }

        res.status(200).json({ message: "Course deleted successfully!", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course.", success: false });
    }
};
