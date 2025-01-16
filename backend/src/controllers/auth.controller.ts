import {User} from "../models/user.model";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({message: "Please fill in all fields"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({message: "User created successfully"});
        } else {
            res.status(400).json({message: "Failed to create user"});
        }
    } catch (e) {
        console.log("Error in signup controller: ", e.message)
    }
}

export const login = (req, res) => {
    res.send("Signup route");
}

export const logout = (req, res) => {
    res.send("Signup route");
}