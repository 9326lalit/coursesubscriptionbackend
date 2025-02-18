import express from "express";
import { createCourse, getAllCourses, getCourseById, enrollStudent, updateCourse, deleteCourse } from "../controllers/courseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createcourse", authMiddleware, createCourse);
router.get("/api/getallcourses", getAllCourses);
router.get("/:id", getCourseById);
router.post("/:id/enroll", enrollStudent);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
