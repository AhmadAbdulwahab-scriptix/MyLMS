const jwt = require('jsonwebtoken');

const genStudentAccessToken = (user) => {
    return jwt.sign({
        userInfo: {
            _id: user._id,
            userId: user.studentId
        }},
        process.env.ACCESS_TOKEN       
    )
}

const genStudentRefreshToken = (user) => {
    return jwt.sign({
        userId: user.studentId
        },
        process.env.REFRESH_TOKEN
    )
}

const genAttendantAccessToken = (user) => {
    return jwt.sign({
        userInfo: {
            _id: user._id,
            userId: user.staffId
        }},
        process.env.ACCESS_TOKEN        
    )
}

const genAttendantRefreshToken = (user) => {
    return jwt.sign({
        userId: user.staffId
        },
        process.env.REFRESH_TOKEN
    )
}

module.exports = { genStudentAccessToken, genStudentRefreshToken, genAttendantAccessToken, genAttendantRefreshToken }