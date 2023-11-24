const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const sql = require('mssql');

const {promisify} = require('util');
const { log } = require('console');

//registrar
exports.register = async (req, res)=>{    
    try {
        const pool = new sql.Request()
        const {user, pass} = req.body;

        //console.log(req.body);

        let passHash = await bcryptjs.hash(pass, 8)    
        //console.log(passHash)
        pool.input('nom_Usuario', sql.VarChar, user)
            .input('pass', sql.VarChar, passHash)   
            .query('INSERT INTO USUARIOS VALUES (@nom_Usuario, @pass)', 
                (error, results)=>{
                    if(error)
                    {
                        console.log(error)
                    }
                        res.redirect('/')
                    })
                
    } catch (error) {
        console.log(error)
    }       
}


exports.login = async(req, res)=>{
    try {
        const pool = new sql.Request()
        const {user, pass} = req.body;

        if(!user || !pass){
            res.render('login',{
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            pool.input('nom_Usuario', sql.VarChar, user)
                .query('SELECT * FROM USUARIOS WHERE nom_Usuario = @nom_Usuario', 
                async (err, result)=>{
                    if(result.rowsAffected[0] == 0|| !(await bcryptjs.compare(pass, result.recordset[0].pass))){
                        res.render('login',{
                            alert: true,
                            alertTitle: "Advertencia",
                            alertMessage: "Usuario y/o password incorrectas",
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'login'
                        })
                    }else{
                        //Inicio de sesion validado
                        const id = result.recordset[0].id_Usuario
                        const token = jwt.sign({id}, process.env.JWT_SECRETO,{
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        const cookiesOptions = {
                            expiresIn: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                       }
                       res.cookie('jwt', token, cookiesOptions)
                        res.render('login',{
                            alert: true,
                            alertTitle: "Conexion Exitosa",
                            alertMessage: "LOGIN CORRECTO",
                            alertIcon: 'success',
                            showConfirmButton: true,
                            timer: 800,
                            ruta: '/'
                        })
                    }
                })
        }


    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const pool = new sql.Request()
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)

            pool.input('decodificada', decodificada.id)
                .query('SELECT * FROM USUARIOS WHERE id_Usuario = @decodificada', (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/login')
}