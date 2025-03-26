import Connection from '../src/models/connection';
import ExpressConfig from '../src/config/express';
import userRouter from '../src/routes/users.routes';
import newsRouter from '../src/routes/news.routes';
import cloudinary from '../src/config/cloudinary';
import lecturesRouter from '../src/routes/lectures.routes';
import podcastsRouter from '../src/routes/podcasts.routes';
class App{
    private app = ExpressConfig.getExpress();
    private port = process.env.PORT;

    public getListen():void{
        this.listen();
        this.routes();
    }

    private async listen(): Promise<void>{
        this.app.listen(this.port, () => {
            console.log('Server was started at port:', this.port);
        })

        await this.connection();
        cloudinary.config();
    }

    private async connection(): Promise<void>{
        const connection = new Connection();
        await connection.run().catch(console.dir);
    }
    private routes(): void{
        this.app.use('/users', userRouter)
        this.app.use('/news', newsRouter)
        this.app.use('/lectures', lecturesRouter)
        this.app.use('/podcasts', podcastsRouter)
    }
}

const app = new App()
app.getListen()
