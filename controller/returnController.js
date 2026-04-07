const { Book } = require('../model/bookSchema');

const returnBook = async (req, res) => {
    try {
        const id = req.params.id;
        const bookToReturn = await Book.findById(id).exec();
        if(!bookToReturn) return res.status(404).json({ message: "Book not found" })
        if(bookToReturn.status=== "IN") return res.status(400).json("Book still in store")
        
        bookToReturn.status = "IN";
        bookToReturn.borrowedBy = null;
        bookToReturn.issuedBy = null;
        bookToReturn.returnDate = null;
        const result = await bookToReturn.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = returnBook;