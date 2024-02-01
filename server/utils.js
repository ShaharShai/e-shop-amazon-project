import jwt from "jsonwebtoken";

const generateToken = ({_id, name, email}) => {
    return jwt.sign({ _id, name, email }, process.env.JWT_PW, { expiresIn: '7d' });
}

const isAuth = (req, res, next) => {
const auth = req.headers.authorization;
if(auth) {
    const token = req.headers.authorization.split(" ")[1];
                                                                                                                 
    jwt.verify(token, process.env.JWT_PW, (err, decode) => {
        if(err) res.status(401).send({message: err.message});
        else {
          req.user = decode;
          next();
        }
    })
    
}
else{
    res.status(401).send({message: "No Token"});
}
}

export {
    generateToken, isAuth
}