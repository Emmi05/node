import {pool} from '../db.js';
import bcryptjs from "bcryptjs";
// import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let usuarios=[];


export const pagPrincipal=(req,res)=>{
    try {
        res.render('index')
    } catch (error) {
        return res.status(500).json({
            //  message: error.message
             message: "something went wrong"
            })
    }
}

export const login=(req,res)=>{
    try {
        res.render('login')
        console.log(req.body) //aqui me muestra datos que envio 
        const user= req.body.user
        const password= req.body.password
        if(!user || !password || !email){
            return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
          }
          const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);
          if(!usuarioAResvisar){
            return res.status(400).send({status:"Error",message:"Error durante login"})
          }
        //   const loginCorrecto = await bcryptjs.compare(password,usuarioAResvisar.password);
        //   if(!loginCorrecto){
        //     return res.status(400).send({status:"Error",message:"Error durante login"})
        //   }
         
          
        //comparar datos
    } catch (error) {
        return res.status(500).json({
            //  message: error.message
             message: "something went wrong"
            })
    }
}

export const dashboard=(req,res)=>{
    try {
        res.render('dashboard')
    } catch (error) {
        return res.status(500).json({
            //  message: error.message
             message: "something went wrong"
            })
    }
}

export const terrenosImg=(req,res)=>{
    try {
        res.render('terrenos')
    } catch (error) {
        return res.status(500).json({
            //  message: error.message
             message: "something went wrong"
            })
    }
}
export const formulario=(req,res)=>{
    try {
        res.render('formulario')
    } catch (error) {
        return res.status(500).json({
            //  message: error.message
             message: "something went wrong"
            })
    }
}


 const getemployees= async(req,res)=>{
    //Manejo de errores
    try {
        // throw new Error('BD')
        const [rows] = await pool.query('SELECT *FROM usuarios');
         return usuarios=rows;
        //  res.render('empleados', { empleados: rows })
        // return [{rows}]
        // res.json(rows)
    } catch (error) {
        return res.status(500).json({
        //  message: error.message
         message: "Something went wrong"
        })
    }
}

export const getemployee= async(req,res) => {
   try {
    console.log(usuarios)  
    // throw new Error('error inesperado')
     // console.log(req.params.id)
     const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id])
     // console.log(rows)
     // res.send(rows) //aqui pondria res.render la tabla????
     // res.send("obteniendo empleado")
     if (rows.length <=0) return res.status(404).json({ 
         message: 'usuario no encontrado'
     })
     res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
        message:'something went wrong'
   })
}
}


 const createEmployees=async(req,res)=> {
    const {nombre, usuario, password} = req.body;
    try {
        if(!usuario || !password){
            return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
        }
        //user es variable que yo creo para almacenar .usuario es mi campo y == a lo que envio si es así ps no se puede reina
        const usuarioAResvisar = usuarios.find(usuario => usuario.usuario === usuario);
        
        if(usuarioAResvisar){
          return res.status(400).send({status:"Error",message:"Este usuario ya existe"})
        }
        else{
            const salt = await bcryptjs.genSalt(5);
            const hashPassword = await bcryptjs.hash(password,salt);
            const nuevoUsuario ={
            usuario, password: hashPassword
              }
                const [rows] = await pool.query('INSERT INTO usuarios(nombre, usuario, password) VALUES (?, ?,?)', 
                [nombre, usuario, password])
                return res.status(201).send({status:"ok",message:'Usuario agregado'})
                
        }
        // console.log(req.body);
        // res.send()
    } catch (error) {
        return res.status(500).json({
            message:'Algo va mal'
        })
    }
};

export const deleteEmployees=async(req,res)=>{
    try {
        const [result]=await pool.query('DELETE FROM usuarios WHERE id=?',[req.params.id])
        //    console.log(result);
            if (result.affectedRows <= 0) return res.status(404).json ({
                message:"No se encontro usuario a eliminar"
            })
        //    res.send("usuario eliminado");
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
        message:'somenthing went wrong'
    })
    }
}



export const updateEmployess=async(req,res)=>{
   const {id}=req.params
   const {nombre,usuario,password}=req.body
   try {
    //    console.log(id, nombre, usuario, password)
    const [result] = await pool.query('UPDATE usuarios SET nombre = IFNULL (?, nombre), usuario = IFNULL (?, usuario), password = IFNULL (?, password) WHERE id = ?', [nombre, usuario, password,id])
    console.log(result)   
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Usuario a actualizar no encontrado'
    })
    const [rows] = await pool.query('SELECT *FROM usuarios WHERE id = ?', [id])
    res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
    message: 'something went wrong'
    })
   }
}

export const methods = {
    login,
    getemployees,
    createEmployees,

  }