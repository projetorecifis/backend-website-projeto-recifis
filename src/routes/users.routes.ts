import { Router } from 'express'
import UserController from '../controllers/user.controller'
// import verifyJWT from '../middleware/user.auth'
import jwt from '../middleware/jwt';

const userRouter = Router();

userRouter.post('/signin', UserController.signInUser);
userRouter.post('/signup', UserController.signUpUser);
userRouter.get('/getAll', jwt.verifyJWT, UserController.getAllUsers);
userRouter.delete('/delete/:id', jwt.verifyJWT, UserController.deleteUser);
// userRouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default userRouter;