import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

class ExpressConfig{
    private express: express.Application

    constructor(){
        dotenv.config();
        this.express = express()
        this.middlewares()
    }

    public getExpress():express.Application{
        return this.express
    }
    
    private middlewares():void{
        if(process.env.WEBSITE_RECIFIS_PROD !== undefined){
            const corsOptions = {
                origin: [process.env.WEBSITE_RECIFIS_PROD],
                methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
                credentials: true,
                allowedHeaders: ['Content-Type, Authorization']
              };
            
              this.express.use(cors(corsOptions))
        }

        this.express.use(morgan('dev'))
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())
        
        
    }
}

export default new ExpressConfig()