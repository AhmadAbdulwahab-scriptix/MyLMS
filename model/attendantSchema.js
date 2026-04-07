const mongoose = require('mongoose');

// ● name (String, required) 
// ● staffId (String, unique) 
// ● createdAt 
const LibraryAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true,
        unique: true
    },        
    refreshToken: {
            type: String,
    }
}, {
    timestamps: true
});

const LibraryAttendant = mongoose.model('LibraryAttendant', LibraryAttendantSchema);
module.exports = { LibraryAttendant };