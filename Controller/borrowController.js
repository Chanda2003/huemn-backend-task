
const Book= require("../Model/bookSchema")
const Borrow= require("../Model/borrowSchema")


exports.borrowBook =async (req, res, next) => {
  try{
const book = await Book.findById(req.params.id);


if (!book || book.copies <= 0) {
  return res.status(400).json({
    status: "Fail",
    message: "No copies available for borrowing.",
  });
}

req.body.book = req.params.id;
req.body.user = req.user.id;
const borrow = await Borrow.create(req.body);
book.copies -= 1;
await book.save();

res.status(201).json({
  status: "success",
  borrowBook:"success",
  data: {
    borrow,
  },
});
} catch (err) {
res.status(400).json({
  status: "Fail",
  message: err.message,
});
console.log(err);
}
  };
  






exports.returnBook = async (req, res, next) => {
    try {
      const borrow = await Borrow.findById(req.params.id);
  
      if (!borrow) {
        return res.status(404).json({
          status: "Fail",
          message: "Borrow record not found.",
        });
      }
  
      borrow.returnDate = req.body.returnDate || Date.now();
      await borrow.save();
      const book = await Book.findById(borrow.book);
      book.copies += 1;
      await book.save();
  
      res.status(200).json({
        status: "success",
        returnBook:"success",
        data: {
          borrow,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "Fail",
        message: err.message,
      });
      console.log(err);
    }
  };
  




  
  exports.borrowHistory = async (req, res, next) => {
   try{

    const id = req.user.id;
    console.log(req.user.id)
    const book = await Borrow.find({ user: id }).populate("book");
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
   }catch(err){
    res.status(400).json({
        status:"Fail",
        message: err.message
    })
  }
  };
  




  exports.mostBorrowedBooks = async (req, res, next) => {
  try{
    const books = await Borrow.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        {
          $unwind: "$bookDetails",
        },
        {
          $group: {
            _id: "$bookDetails.title",
            booksCount: { $sum: 1 },
          },
        },
        {
          $sort: { booksCount: -1 },
        },
        {
          $addFields: {
            book: "$_id",
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
    
      res.status(200).json({
        status: "success",
        data: {
          books,
        },
      });
  }catch(err){
    res.status(400).json({
        status:"Fail",
        message: err.message
    })
  }
  };
  
  exports.activeMembers = async (req, res, next) => {
   try{
    const members = await Borrow.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $group: {
            _id: "$userDetails.name",
            borrowCount: { $sum: 1 },
          },
        },
        {
          $sort: { borrowCount: -1 },
        },
        {
          $addFields: {
            member: "$_id",
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
    
      res.status(200).json({
        status: "success",
        data: {
          members,
        },
      });
   }catch(err){
    res.status(400).json({
        status:"Fail",
        message: err.message
    })
  }
  };
  
  exports.bookAvailability = async (req, res, next) => {
   try{
    const totalBooks = await Book.countDocuments();
  
    const borrowedBooks = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          borrowCount: { $sum: 1 },
        },
      },
    ]);
  
    const availableBooks = totalBooks - borrowedBooks.length;
  
    res.status(200).json({
      status: "success",
      data: {
        totalBooks,
        borrowedBooks: borrowedBooks.length,
        availableBooks,
      },
    });
   }catch(err){
    res.status(400).json({
        status:"Fail",
        message: err.message
    })
  }
  };



