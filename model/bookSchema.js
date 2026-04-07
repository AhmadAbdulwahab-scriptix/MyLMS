const mongoose = require('mongoose');

//  title (String, required) 
// ● isbn (String, unique) 
// ● authors (Array of ObjectId → Author) 
// ● status (Enum: "IN" | "OUT", default: "IN") 
// ● borrowedBy (ObjectId → Student, nullable) 
// ● issuedBy (ObjectId → Library Attendant, nullable) 
// ● returnDate (Date, nullable) 
// ● createdAt 
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    status: {
        type: String,
        enum: ['IN', 'OUT'],
        default: 'IN'
    },
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
            },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LibraryAttendant',
    },
    returnDate: {
        type: Date,
    }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', BookSchema);
module.exports = { Book };