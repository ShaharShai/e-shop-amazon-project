import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../utils.js";

const signup = async (req, res) => {
    const {name, email, password} = req.body;

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    })

    const user = await newUser.save();

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
    })
}

const signin = async (req, res) => {
    const { password: passwordFromWebsite, email } = req.body;
    
    const user = await User.findOne({ email: email });
    if(user){
        if(bcrypt.compareSync(passwordFromWebsite, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: "Invalid Password/User" });
}

export {
    signup, signin
}