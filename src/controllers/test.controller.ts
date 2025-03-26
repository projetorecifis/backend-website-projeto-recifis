import { Request, Response } from 'express';

class TestController{
        public async getTeste(req:Request, res:Response) :Promise<any>{
            return res.send('Teste');
        }
}

export default new TestController()