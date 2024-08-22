
const Book= require("../Model/bookSchema")




const addBook=async(req,res)=>{

   try{
    const book= await Book.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
          book,
        },
      });
   }catch(err){
    res.status(400).json({
        status:"fail",
        message: err.message
    })
   }

}


const getallbooks= async(req,res)=>{
    try{
        const books= await Book.find()
        res.status(200).json({
            status: "success",
            result: books.length,
            data: {
              books,
            },
          });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message
        })
       }
}


const updatebook= async(req,res)=>{
    try{
        const book= await Book.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        res.status(200).json({
            status: "success",
            data: {
              book,
            },
          });

    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message
        })
       }
}


const deleteBook= async(req,res)=>{
    try{
        await Book.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null,
          });
    }catch(err){
        res.status(400).json({
            status:"fail",
            message: err.message
        })
       }
}




module.exports={
    addBook,
    getallbooks,
    updatebook,
    deleteBook
}






























