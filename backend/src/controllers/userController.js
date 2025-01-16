const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req , res) => {
    const {username , email , password} = req.body;

    try {
        const existingUser = await userModel.findOne({email : email});

        if(existingUser){
            return res.status(400).json({message : "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = await userModel.create({
            username : username ,
            email : email ,
            password : hashedPassword
        });

        const token = jwt.sign({email: newUser.email , id: newUser._id} , process.env.SECRET_KEY);
        res.status(201).json({user: newUser , token : token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req , res) => {
    const {email , password} = req.body;

    try {
        const existingUser = await userModel.findOne({email : email});

        if(!existingUser){
            return res.status(400).json({message : "User does not exist" });
        }

        const matchPassword = bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid password" });
        }

        const token = jwt.sign({email: existingUser.email , id: existingUser._id} , process.env.SECRET_KEY , {expiresIn: '1h'});
        res.status(200).json({user: existingUser , token : token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {signup , login};