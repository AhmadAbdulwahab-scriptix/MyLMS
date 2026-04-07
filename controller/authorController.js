const { Author } = require('../model/authorSchema');

const createAuthor = async (req, res) => {
    try {
        const { authorId, name, bio } = req.body;
        const existingAuthor = await Author.findOne({ authorId });
        if (existingAuthor) return res.status(400).json({ message: "Author already exists" });
        const author = new Author({ authorId, name, bio });
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        if (authors.length === 0) return res.status(404).json({ message: "No authors found" });
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await Author.findById(id);        
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateAuthor = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, bio } = req.body;
        if (!name & !bio) return res.status(400).json({ message: "Name and bio are required" });
        const existingAuthor = await Author.findById(id);
        
        if (!existingAuthor) return res.status(404).json({ message: "Author not found" });

        if(name) existingAuthor.name = name

        if(bio) existingAuthor.bio = bio

        const updatedAuthor = await existingAuthor.save()
        console.log(updatedAuthor);
        
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await Author.findByIdAndDelete(id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json({ author, message: "Author deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}