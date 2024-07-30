import express from 'express';
import http from 'http';
import cors from 'cors';
import { dbconnect } from "../../databases/config.js";

import usuarioRoutes from '../routes/usuarios.js';
import bitacorasRoutes from '../routes/Bitacora.js';
import aprendicesRoutes from '../routes/aprendices.js';
import fichasRoutes from '../routes/fichas.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT 
        this.server = http.createServer(this.app);
    
        
        // Middlewares
        this.middlewares();


        // Rutas de mi aplicación
        this.routes();


        this.conectarbd()
    }

    async conectarbd(){
        await dbconnect();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/Usuarios', usuarioRoutes);
        this.app.use('/api/Aprendices', aprendicesRoutes);
        this.app.use('/api/Bitacoras', bitacorasRoutes);
        this.app.use('/api/Fichas', fichasRoutes);
        
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en  ${this.port}`);
        });
    }
}

export { Server };