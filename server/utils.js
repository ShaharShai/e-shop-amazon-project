import jwt from "jsonwebtoken";

const generateToken = ({_id, name, email}) => {
    return jwt.sign({ _id, name, email }, process.env.JWT_PW, { expiresIn: '7d' });
}

export {
    generateToken
}