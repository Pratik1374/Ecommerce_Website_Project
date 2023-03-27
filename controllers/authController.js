import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try{
        const {name,email,password,address,phone} = req.body;
        if(!name)
        {
            return res.send("Name required!!!")
        }
        if(!email)
        {
            return res.send("Email required!!!")
        }
        if(!password)
        {
            return res.send("Password required!!!")
        }
        if(!address)
        {
            return res.send("Address required!!!")
        }
        if(!phone)
        {
            return res.send("Phone required!!!")
        }

        //check if user already exits
        const existingUser = await userModel.findOne({email});
        if(existingUser)
        {
            res.status(200).send({
                success : true,
                message : "You have alredy Registered, please login"
            })
        }

        //register new user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name,email,password:hashedPassword,phone,address}).save();

        res.status(201).send({
            success : true,
            message : "User registered successfully",
            user
        })
    }catch(error){
        console.log(error.bgRed.black);
        res.status(500).send({
            success : false,
            message : "Error in Registration",
            error
        })
    }
}

export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(404).send({
                success : false,
                message : "Invalid Email or Password"
            })
        }

        //check user in DB
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(404).send({
                success : false,
                message : "Email is not registered"
            })
        }

        //compare password
        const match = await comparePassword(password,user.password);
        if(!match)
        {
            return res.status(200).send({
                success : false,
                message : "Invalid Password"
            })
        }

        //token
        const token = await JWT.sign({_id: user.id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success : true,
            message : "Login Successful",
            user:{
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address
            },
            token
        })

    }catch(error){
        console.log(error.bgRed.black);
        res.status(500).send({
            success : false,
            message : "Error in Login",
            error
        })
    }
}

export const testController = (req,res)=>{
    try {
        res.status(201).send({
            success : true,
            message : "Protected routes accessed"
        })   
    } catch (error) {
        console.log(error);
    }
}