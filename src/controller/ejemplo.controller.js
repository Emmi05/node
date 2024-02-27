import {pool} from '../db.js';
import bcryptjs from "bcryptjs";
// import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();





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

}


const createEmployees=async(req,res)=> {
    const {nombre, usuario, password} = req.body;
    let passwordHaash=await bcryptjs.hash(password,8);
        if(!usuario || !password){
            return res.status(400).send({status:"Error",message:"Los campos están incompletos"})
        }
        await pool.query('INSERT INTO usuarios(nombre, usuario, password) VALUES (?, ?,?)', 
                [nombre, usuario, passwordHaash]), async (error, result) => {
                    if(error){
                        console.log(error)
                    }else{
                        res.send('si, exitosa')
                    }     
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