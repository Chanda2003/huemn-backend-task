const express= require("express")

const app= express()
app.use(express.json())

const userRouter= require("./Routes/userRouter")
const bookRouter= require("./Routes/bookRouter")
const borrowRouter= require("./Routes/borrowRouter")


app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)
app.use("/api/borrow", borrowRouter)


module.exports= app
