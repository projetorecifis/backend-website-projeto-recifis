// import UserRepositories from '../repositories/user.repositories'
// import UserModel from '../models/user.model'
import bcrypt from 'bcrypt'
import JWT from '../middleware/jwt'
import UserRepositories from "../repositories/users.repositories";

class UserServices{  
    
    public async getAllUsers(){
        try{
            const response = await UserRepositories.getAllUsers();
            if(response instanceof Error){
                return { errorType: 'MONGODB-ERROR' }
            }
            return {
                status: 200,
                message: "Users found",
                data: response
            }
        }catch(error){
            console.log(error);
            return { errorType: 'GENERIC-ERROR' }
        }
    }

    public async signUpUser(body: any){
        try{

            const response = await UserRepositories.getUserByEmail(body.email);
            console.log("response", response);
 
            if(!!response){
                return { errorType: 'EMAIL-EXISTS' }
            }

            const newPassword = await bcrypt.hash(body.password, 12);

            const user = {
                email: body?.email,
                password: newPassword,
                name: body?.name,
                isAdmin: body?.isAdmin || false,
                createdAt: new Date().toISOString()
            }
            
            const responseCreateUser = await UserRepositories.createUser(user);
 
            if(responseCreateUser instanceof Error){
                return { errorType: 'MONGODB-ERROR' }
            }
 
            return {
                status: 200,
                message: "User created successfully",
                data: responseCreateUser
            }
         }catch(error){
            console.log(error)
             return { errorType: 'GENERIC-ERROR' }
         }
    }

    async signInUser(body: any){
        try{
           const user = {
            email: body?.email,
            password: body?.password,
           }

            const response = await UserRepositories.getUserByEmail(user.email);
    
            if(response === null){
                return { errorType: 'UNAUTHORIZED-ERROR' }
            }

            const passIsValid = await bcrypt.compare(user.password, response.password);

            if(!passIsValid || response === null){
                return { errorType: 'UNAUTHORIZED-ERROR' }
            }

            console.log("response", response);

            return{
                status: 200,
                message: "User signed in successfully",
                data: {
                    _id: response._id,
                    email: response.email,
                    name: response.name,
                    isAdmin: response.isAdmin,
                    token: JWT.generateToken(response),
                },
            }

        }catch(error){
            return { errorType: 'GENERIC-ERROR' }
        }
    }

    public async deleteUser(id: string){
        try{
            const response = await UserRepositories.deleteUser(id);
            if(response instanceof Error){
                return { errorType: 'MONGODB-ERROR' }
            }
            return {
                status: 200,
                message: "User deleted successfully",
                data: response
            }
        }catch(error){
            console.log(error);
            return { errorType: 'GENERIC-ERROR' }
        }
    }
        // public async getUserByEmail(email: string){
    //     try{
    //         if(email){
    //             const response = await UserRepositories.getUserByEmail(email);
    //             return {
    //                 status: 200,
    //                 message: "ok",
    //                 data: response
    //             }
    //         }
    //         return {
    //             status: 400,
    //             message: "Email not found"
    //         }
    //     }catch(error){
    //         console.log(error);
    //         return{
    //             status: 500,
    //             message: "Internal server error"
    //         }
    //     }
    // }
    
 
}

export default new UserServices();