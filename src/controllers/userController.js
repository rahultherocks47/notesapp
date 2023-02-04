const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// let hashedPassword = " ";

//defining async because database operations may take time
const signup = async (req,res) => {
//1. Existing User Check
//2. Hashed Password
//3. User Creation
//4. Token Generate
const {username,email,password} = req.body;
try{
    //1. Existing User Check
    //using await to stop execution untill results come.
    const existingUser = await userModel.findOne({email:email});
    if(existingUser){
        return res.status(400).json({message:"User already existing"});
    }
    //2. Hashed Password
    const hashedPassword = await bcrypt.hash(password,10);
    // const hashedPassword = await bcrypt.hash(password,10,(err,hash)=>{ 
    //     if (err) throw err;
    //     return hash;
    // });
    // hashedPassword = bcrypt.hash(password,10,(err,hash)=>{ 
    //         if (err) console.log(err);
    //         console.log(hash);
    //         return hash;
    //     });
    //3. User Creation
    // console.log(hashedPassword);
    // res.status(200).json({status:hashedPassword});
    const result = await userModel.create({
        email:email,
        password:hashedPassword,
        username:username
    });
    //4. Token Generate
    const token = jwt.sign({email:result.email,id:result._id},process.env.SECRET_KEY);
    res.status(201).json({user:result,token:token});
}
catch(error){

    console.log(error);
    res.status(500).json({message:"Something went wrong"});}
}

const signin =async  (req,res) => {  
    const {email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY);
        res.status(200).json({user:existingUser,token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports = {signup,signin};