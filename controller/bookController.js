const { Book } = require('../model/bookSchema');
const { Author } = require('../model/authorSchema');

const createBook = async (req, res) => {
    try {
        const { title, isbn, authors } = req.body;
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) return res.status(400).json({ message: "Book with this ISBN already exists" });

        // Resolve all authors
        const resolvedAuthors = [];
        
        for (let author of authors) {
            if (author._id) {
                const existingAuthor = await Author.findById(author._id);
                if(!existingAuthor) return res.status(404).json({ message: `Author with ID ${author._id} does not exist, create the Author before creating book` });
                resolvedAuthors.push(existingAuthor)
            } else {
                res.status(400).message({ message: "Author ID is required" })
            }
        }

        // for (let author of authors) {
        //     if (author._id) {                
        //         // Check if author exists
        //         const existingAuthor = await Author.findById(author._id);

        //         if (existingAuthor) {
        //             resolvedAuthors.push(existingAuthor._id);
        //         } else {
        //             // _id provided but not found → require full info
        //             if (author.name && author.authorId && author.bio) {
        //                 // check author.authorId
        //                 const existingAuthor = await Author.findOne({ authorId: author.authorId });
        //                 if(existingAuthor) return res.status(400).json({ message: "Author with authorId exists"})

        //                 // create auhtor
        //                 const newAuthor = await Author.create({
        //                     name: author.name,
        //                     authorId: author.authorId,
        //                     bio: author.bio
        //                 });
        //                 resolvedAuthors.push(newAuthor._id);
        //             } else {
        //                 return res.status(400).json({
        //                     message: `Author with ID ${author._id} not found and insufficient data to create new author`
        //                 });
        //             }
        //         }
        //     } else {                
        //         // No _id → must have name, authorId, bio
        //         if (author.name && author.authorId && author.bio) {
        //             // check author.authorId
        //             const existingAuthor = await Author.findOne({ authorId: author.authorId });
        //             if(existingAuthor) return res.status(400).json({ message: "Author with authorId exists"})

        //             // create auhtor
        //             const newAuthor = await Author.create({
        //                 name: author.name,
        //                 authorId: author.authorId,
        //                 bio: author.bio
        //             });
        //             resolvedAuthors.push(newAuthor._id);
        //         } else {
        //             return res.status(400).json({
        //                 message: "Missing author information for new author (name, authorId, bio required)"
        //             });
        //         }
        //     }
        // }

        // All authors resolved → create book
        const book = new Book({
            title,
            isbn,
            authors: resolvedAuthors
        });
        await book.save();
        res.status(201).json(book);

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('authors');
        if (books.length === 0) return res.status(404).json({ message: "No books found" });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }  
}

const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id }).populate('authors');
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error, message: "Server error" });
    }
}

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, isbn, authors } = req.body;

        // Check if ISBN is already used by another book
        if(isbn) {
            const existingBookWithISBN = await Book.findOne({ isbn, _id: { $ne: id } });
            if (existingBookWithISBN) return res.status(400).json({ message: "Another book with this ISBN already exists" });
        }

        // Resolve all authors
        const resolvedAuthors = [];
        
        for (let author of authors) {
            if (author._id) {
                const existingAuthor = await Author.findById(author._id);
                if(!existingAuthor) return res.status(404).json({ message: `Author with ID ${author._id} does not exist, create the Author before creating boo` });
                resolvedAuthors.push(existingAuthor)
            } else {
                res.status(400).message({ message: "Author ID is required" })
            }
        }
        // if(authors){
        //     for (let author of authors) {
        //         if (author._id) {
        //             const existingAuthor = await Author.findById(author._id);
        //             if (existingAuthor) {
        //                 resolvedAuthors.push(existingAuthor._id);
        //             } else {
        //                 if (author.name && author.authorId && author.bio) {

        //                     // check author.authorId
        //                     const existingAuthor = await Author.findOne({ authorId: author.authorId });
        //                     if(existingAuthor) return res.status(400).json({ message: "Author with authorId exists"})

        //                     const newAuthor = await Author.create({
        //                         name: author.name,
        //                         authorId: author.authorId,
        //                         bio: author.bio
        //                     });
        //                     resolvedAuthors.push(newAuthor._id);
        //                 } else {
        //                     return res.status(400).json({
        //                         message: `Author with ID ${author._id} not found and missing required info to create new author`
        //                     });
        //                 }
        //             }
        //         } else {
        //             if (author.name && author.authorId && author.bio) {
        //                 // check author.authorId
        //                 const existingAuthor = await Author.findOne({ authorId: author.authorId });
        //                 if(existingAuthor) return res.status(400).json({ message: "Author with authorId exists"})

        //                 const newAuthor = await Author.create({
        //                     name: author.name,
        //                     authorId: author.authorId,
        //                     bio: author.bio
        //                 });
        //                 resolvedAuthors.push(newAuthor._id);
        //             } else {
        //                 return res.status(400).json({
        //                     message: "Missing author information for new author (name, authorId, bio required)"
        //                 });
        //             }
        //         }
            // } 
        // }

        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, isbn, authors: authors ? resolvedAuthors: authors },
            { new: true }
        ).populate('authors', 'name authorId bio');

        if (!updatedBook) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(updatedBook);

    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ book, message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
}