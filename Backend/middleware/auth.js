import jwt from "jsonwebtoken";

const SECRET = "mysecretkey";

export const verifyToken = (req,res,next) => {

    try{

        const bearer = req.headers.authorization;
        console.log("BEARER:", bearer);
        if(!bearer){
            return res.status(400).json({
                message:"No token"
            });
        }
        const token = bearer.split(" ")[1];
        console.log("TOKEN:", token);
        const decode = jwt.verify(
            token,
            SECRET
        );
        console.log("DECODE:", decode);
        req.userId = decode.id;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message:"Invalid Token"
        });
    }

}