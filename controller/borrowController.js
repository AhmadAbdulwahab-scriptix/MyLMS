const { Book } = require('../model/bookSchema');
const { Student } = require('../model/studentSchema');
const { LibraryAttendant } = require('../model/attendantSchema');

const borrowBook = async(req, res) => {
    try{
        const id = req.params.id
        const { attendantId, studentId, returnDate } = req.body;
        
        const bookToBorrow = await Book.findById(id);
        if(!bookToBorrow) return res.status(400).json({ message: "Book not found" })
        if(bookToBorrow.status === "OUT") return res.status(401).json({ message: "Book already borrowed" });
        
        const existingAttendant = await LibraryAttendant.findOne({ _id: attendantId }).exec();
        if (!existingAttendant) return res.status(404).json({ message: "No Library Attendant of such found" });

        const existingStudent = await Student.findOne({ _id:studentId }).exec();
        if (!existingStudent) return res.status(404).json({ message: "No Library Attendant of such found" });

        bookToBorrow.status = "OUT";
        bookToBorrow.borrowedBy = studentId;
        bookToBorrow.issuedBy = attendantId;
        bookToBorrow.returnDate = returnDate;

        const result = await bookToBorrow.save();        
        res.status(200).json({ message: "Book borrowed succesfully", result })
    } catch (err) {
        return res.status(500).json("server error");
    }
}

module.exports = borrowBook