const { LibraryAttendant } = require('../model/attendantSchema');

const createAttendant = async(req, res) => {
    try {
        const { name, staffId } = req.body;
        const existingAttendant = await LibraryAttendant.findOne({ staffId });
        if (existingAttendant) return res.status(400).json({ message: "Staff ID must be unique" });
        const attendant = new LibraryAttendant({ name, staffId });
        await attendant.save();
        res.status(201).json(attendant);    
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAllAttendants = async(req, res) => {
    try {
        const attendants = await LibraryAttendant.find();
        if (attendants.length === 0) return res.status(404).json({ message: "No authors found" });
        res.status(200).json(attendants);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createAttendant,
    getAllAttendants
}