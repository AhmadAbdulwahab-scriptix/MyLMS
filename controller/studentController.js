const { Student } = require('../model/studentSchema');

const createStudent = async (req, res) => {
    try {
        const { name, email, studentId } = req.body;
        const existingStudentId = await Student.findOne({ studentId });
        if (existingStudentId) return res.status(400).json({ error: 'Student ID must be unique' });
        const existingStudentEmail = await Student.findOne({ email });
        if (existingStudentEmail) return res.status(400).json({ error: 'Email must be unique' });
        const student = new Student({ name, email, studentId });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        if (students.length === 0) return res.status(404).json({ message: "No students found" });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}

const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        // if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: 'Invalid ID format' });
        const student = await Student.findById({ _id: id });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
}

module .exports = { 
    createStudent, 
    getAllStudents, 
    getStudentById 
};