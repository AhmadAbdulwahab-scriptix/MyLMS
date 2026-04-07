const mongoose = require('mongoose');

const dbConnect = async(req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);   
        process.exit(1); // Exit the process with an error code
    }

}

module.exports = dbConnect;

