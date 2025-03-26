import { Router } from 'express'
import TestController from '../controllers/test.controller'
// import verifyJWT from '../middleware/user.auth'

const testrouter = Router();

// testrouter.get('/teste', UserController.getTeste)
testrouter.get('/', TestController.getTeste);
// testrouter.get('/auth/verify', verifyJWT, usuarioController.verifyAuth)

export default testrouter;