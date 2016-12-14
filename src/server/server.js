// Dependencies =======================
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

class Server {
    constructor(){
        this.app = express();
    }

    configureApp(){
        this.app.set('port',(process.env.PORT || 3000));
        this.app.use(morgan('dev'));
        this.app.use(compress());
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use('/', express.static(path.join(__dirname + '/../public')));
    }

    configureCORS(){
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes(){
        this.app.get('/', (req, res, next) => {
            res.sendfile(path.join(__dirname + 'index.html'))
        })
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Server satarted: http://localhost:${port}/`);
        });
    }

    run(){
        this.configureApp();
        this.configureCORS();
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Server;