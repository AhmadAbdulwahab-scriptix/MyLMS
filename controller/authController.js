const { Student } = require('../model/studentSchema');
const { LibraryAttendant } = require('../model/attendantSchema');
const { genStudentAccessToken, genStudentRefreshToken, genAttendantAccessToken, genAttendantRefreshToken } = require('../genJWT/genJWT')

const handleStudentLogin = async(req, res) => {
    try{
        const { email, studentId } = req.body;                
        const matchEmail = await Student.findOne({ email }).exec();
        if(!matchEmail) return res.status(404).json({ message: "student does not exist" });        

        const student = await Student.findOne({ studentId }).exec();
        if(!student) return res.status(401).json({ message: "Student Id does not exist" });
        
        const accessToken = genStudentAccessToken(student)
        const refreshToken = genStudentRefreshToken(student)

        student.refreshToken = refreshToken;
        student.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

        res.status(200).json({ student, accessToken, refreshToken });
    } catch(err) {
        res.status(500).json({ err:err.stack, main: err.message, message: "server error" })
    }
}

const handleAttendantLogin = async(req, res) => {
    try{
        const { name, staffId } = req.body;
        const matchName = await LibraryAttendant.findOne({ name });   
        if(!matchName) return res.status(404).json({ message: "Attenant Name does not exist" });

        const attendant = await LibraryAttendant.findOne({ staffId }).exec();
        if(!attendant) return res.status(401).json({ message: "Attenant Id does not exist" });

        const accessToken = genAttendantAccessToken(attendant)
        const refreshToken = genAttendantRefreshToken(attendant)

        attendant.refreshToken = refreshToken;
        attendant.save();

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

        res.status(200).json({ attendant, accessToken, refreshToken });
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
}

module.exports = { handleStudentLogin, handleAttendantLogin }