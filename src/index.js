//importing express library
const express = require("express");
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
//creating server app
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//As by default Request Body is in the form of Stream
//To parse request body in JSON we use below statement.
app.use(express.json());
app.use(cors());
//any endpoints starts with /users will use the userRouter defined in userRouter
app.use('/users',userRouter);
//any endpoints starts with /notes will use the userRouter defined in noteRouter
app.use('/note',noteRouter);

app.get("/",(req,res)=>{
    res.send("NOTES APP BY CHEEZY CODE");
});

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
//port 5000 will recieve requeests
app.listen(PORT, ()=>{
    console.log("Server started on port no. " + PORT);
});
})
.catch((error)=>{
    console.log(error);
})


