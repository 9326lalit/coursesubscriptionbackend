import Instructor from '../models/Instructor.js';

// Create a new Instructor
export const createInstructor = async (req, res) => {
  try {
    const { name, email, bio, profilePicture } = req.body;
    const newInstructor = new Instructor({
      name,
      email,
      bio,
      profilePicture
    });
    
    await newInstructor.save();
    res.status(201).json({ message: 'Instructor created successfully!', instructor: newInstructor });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating instructor.', error });
  }
};

// Get all Instructors
export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching instructors.', error });
  }
};

// Get Instructor by ID
export const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching instructor.', error });
  }
};

// Update Instructor's details
export const updateInstructor = async (req, res) => {
  try {
    const { name, email, bio, profilePicture } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { name, email, bio, profilePicture },
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json({ message: 'Instructor updated successfully!', instructor: updatedInstructor });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating instructor.', error });
  }
};

// Delete an Instructor
export const deleteInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json({ message: 'Instructor deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting instructor.', error });
  }
};
