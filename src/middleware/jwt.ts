import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';
class JWT{
    public generateToken(data: any){
        const JWT_KEY = process.env.JWT_KEY;
        console.log("data", data)
        const token = jwt.sign({
            name: data.name,
            email: data.email,
            id: data._id,
            isAdmin: data.isAdmin,
            },"JWT_KEY-SECRET-KEY-07022002",{
            expiresIn: "1800000" // 30 minutos
        })

        return token
    }

    public async verifyJWT(req: Request, res: Response, next: NextFunction){

        const JWT_KEY = process.env.JWT_KEY;
    
        if(req.headers.authorization && JWT_KEY){

            const token = req.headers.authorization.split(' ')[1].toString();

            jwt.verify(token, JWT_KEY,(err, decoded)=>{
                if(err){
                    console.log('token invalido');
                    return res.status(401).json({message: 'token invalid'});
                }
                console.log("decoded", decoded);
                const decodedParse: {
                    name: string,
                    email: string,
                    id: string,
                    isAdmin: boolean
                } = JSON.parse(JSON.stringify(decoded));

                if(decodedParse?.isAdmin?.toString() !== 'true'){
                    return res.status(403).json({message: 'Token has not admin permission'});
                }
                next();
            })
        }
        else{
            res.status(401).json({auth:false, message: 'No token provided'});
        }
            
}
}

export default new JWT()