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
        this.express.use(morgan('dev'))
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())

        console.log(process.env.WEBSITE_RECIFIS_PROD);
        if(process.env.WEBSITE_RECIFIS_PROD !== undefined){
            const corsOptions = {
                origin: process.env.WEBSITE_RECIFIS_PROD,
                methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true
              };
            
              this.express.use(cors(corsOptions))

              this.express.options('*', cors(corsOptions));

              console.log("CORS enabled for production");
        }

        // this.express.use(cors()); 
        // this.express.options('*', cors());

        this.express.use((req, res, next) => {
            console.log('Incoming request method:', req.method);
            console.log('Origin:', req.headers.origin);
            console.log('Access-Control-Request-Headers:', req.headers['access-control-request-headers']);
            next();
        });
        
        
    }
}

export default new ExpressConfig()