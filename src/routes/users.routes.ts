import { Router } from 'express'
import UserController from '../controllers/user.controller'
import jwt from '../middleware/jwt';

const userRouter = Router();

userRouter.post('/signin', UserController.signInUser);
userRouter.get('/getAll', UserController.getAllUsers);

userRouter.post('/signup', UserController.signUpUser);
userRouter.put('/update/:id', jwt.verifyJWT, UserController.updateUser);
userRouter.delete('/delete/:id', jwt.verifyJWT, UserController.deleteUser);

export default userRouter;