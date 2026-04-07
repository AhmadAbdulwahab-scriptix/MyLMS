const mongoose = require('mongoose');

const Studentschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }, 
        studentId: {
            type: String,
            required: true,
            unique: true
        },
        refreshToken: {
            type: String,
        }
    },
    { 
        timestamps: true
    }
);

const Student = mongoose.model('Student', Studentschema);
module.exports = { Student };