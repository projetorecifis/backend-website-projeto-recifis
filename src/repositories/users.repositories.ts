import UsersModel from "../models/users.model";


export interface IUserResponse{
    _id: string,
    isAdmin: boolean,
    email: string,
    password: string,
    name: string
}

class UsersRepositories{  
    async getAllUsers(): Promise<any>{
        const users = await UsersModel.find({});
        const usersResponse = users.map((user: any) => ({
            _id: user._id,
            isAdmin: user?.isAdmin,
            email: user.email,
            password: user.password,
            name: user?.name
        }));
        return usersResponse;
    }
    async getUserByEmail(email: string): Promise<any>{
        const user = await UsersModel.findOne({email: email});
        console.log(user)
        const userResponse = user ? {
            _id: user._id,
            isAdmin: user?.isAdmin,
            email: user.email,
            password: user.password,
            name: user?.name
        } : null;
        return userResponse;
    }

    async createUser(user: any){
        const newUser = new UsersModel(user);
        const response = await newUser.save();
        console.log("ue", response)
        return response;
    }

    async deleteUser(id: string){
        const response = await UsersModel.findByIdAndDelete(id);
        if(!response){
            throw new Error("User not found");
        }
        return response;
    }

    async updateUser(id: string, user: any){
        const response = await UsersModel.findOneAndUpdate({_id: id}, {
            name: user?.name,
            email: user?.email,
            isAdmin: user?.isAdmin,
            updatedAt: new Date().toISOString()
        });
        
        if(!response){
            throw new Error("User not found");
        }
        return response;
    }

}

export default new UsersRepositories();