const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const {conexion} = require('../database/config');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.index = '/';

        //Middlewares
        this.middlewares();

        //Conectar a BD
        this.conectarDB();

        //Rutas de  app
        this.routes();

    }

    async conectarDB(){
        await conexion();
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //seteamos el motor de plantillas
        this.app.set('view engine', 'ejs');
        
        

        //para procesar datos enviados dede forms
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())

        //seteamos carpeta public, para archvios estaticos
        this.app.use(express.static('public'))

        //seteamos las cookies
        this.app.use(cookieParser())
    }

    routes(){
        this.app.use(this.index, require('../routes/router'))
    }

    listen(){
        this.app.listen(this.port);
        console.log('Servidor online');
    }
}



module.exports = Server