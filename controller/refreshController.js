const jwt = require('jsonwebtoken');
const { Student } = require('../model/studentSchema');
const { LibraryAttendant } = require('../model/attendantSchema');
const { genAccessToken } = require('../genJWT/genJWT')

const handleStudentRefreshToken = async(req, res) => {
    if(!req?.cookies?.jwt) return res.status(401).json({ message: "unauthorized" })
    const token = req.cookies.jwt

    const student = await Student.findOne({ refreshToken }).exec();
    if (!student) return res.sendStatus(403);

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || student.userId !== decoded.userId) return res.sendStatus(403);
            const accessToken = genAccessToken(student)
            res.json({ accessToken })
        }
    )
}

const handleAttendantRefreshToken = async(req, res) => {
    if(!req?.cookies?.jwt) return res.status(401).json({ message: "unauthorized" })
    const token = req.cookies.jwt

    const attendant = await LibraryAttendant.findOne({ refreshToken }).exec();
    if (!attendant) return res.sendStatus(403);

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if (err || attendant.userId !== decoded.userId) return res.sendStatus(403);
            const accessToken = genAccessToken(student)
            res.json({ accessToken })
        }
    )
}

module.exports = { handleStudentRefreshToken, handleAttendantRefreshToken }