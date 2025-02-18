import express from 'express';
import { 
  createInstructor, 
  getAllInstructors, 
  getInstructorById, 
  updateInstructor, 
  deleteInstructor 
} from '../controllers/instructorsController.js';

const router = express.Router();

// Routes for Instructor
router.post('/createinstructors', createInstructor); // Create Instructor
router.get('/getallinstructors', getAllInstructors); // Get all Instructors
router.get('/instructors/:id', getInstructorById); // Get Instructor by ID
router.put('/updateinstructors/:id', updateInstructor); // Update Instructor
router.delete('/deleteinstructors/:id', deleteInstructor); // Delete Instructor

export default router;
