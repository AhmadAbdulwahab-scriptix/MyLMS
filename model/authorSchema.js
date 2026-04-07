const moongoose = require('mongoose');

const AuthorSchema = new moongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
    }
    },{
    timestamps: true
    }
);

const Author = moongoose.model('Author', AuthorSchema);
module.exports = { Author };