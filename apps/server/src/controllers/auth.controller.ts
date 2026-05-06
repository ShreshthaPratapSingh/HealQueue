import express from "express";
import type {Request, Response} from "express";
import type { LoginBody, SignupBody } from "../types/auth.types.js";
import { hashPassword } from "../utils/hash.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"

export const signup = async (
    req: Request<{}, {}, SignupBody>,
    res: Response
) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await hashPassword(password)

        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "PATIENT"
        })
        
        res.json({ message: "SignUp successfull!!" })
    }
    catch(err) {
        res.status(500).json({ message: "Server error "})
    }
}

export const login = async (
    req: Request<{}, {}, LoginBody>,
    res: Response
) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        const match = await bcrypt.compare(password, user.password as string);

        if (!match){
            return res.status(400).json({ message: "Invalid credentials!" })
        }

        const token = generateToken({ id: user._id, role: user.role}, { expiresIn: "7d"})

        res.cookie("token", token, { httpOnly: true })

        res.json({ role: user.role })
    }
    catch(err){
        res.status(500).json({ message: err })
    }
}