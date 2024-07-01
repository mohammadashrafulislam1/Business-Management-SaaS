import jwt from "jsonwebtoken";

export const jwtMiddleware = async(req, res, next)=>{
    try{
     const authHeader = req.headers.authorization;
     const token = authHeader.split(" ")[1]
     if(!token){
        return res.status(404).json({message: "Authorization token is missing."})
     }
     jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken)=>{
        if(err){
            return res.status(401).json({message: "Invalid Token"})
        }
        req.decode = decodedToken;
        next()
     })
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}