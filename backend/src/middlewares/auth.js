const jwt = require("jsonwebtoken");

const verifyToken = (req , res , next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "No token provided."})
    }

    try{
        const decoded = jwt.verify(token , process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports = verifyToken;