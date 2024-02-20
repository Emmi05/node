import {pool} from '../db.js';

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


export const getemployees= async(req,res)=>{
    //Manejo de errores
    try {
        // throw new Error('BD')
        const [rows] = await pool.query('SELECT *FROM usuarios')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
        //  message: error.message
         message: "Something went wrong"
        })
    }
}

export const getemployee= async(req,res) => {
   try {
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


export const createEmployees=async(req,res)=> {
    const {nombre, usuario, password} = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO usuarios(nombre, usuario, password) VALUES (?, ?,?)', 
        [nombre, usuario, password])
        // console.log(req.body);
        res.send ({
            id:rows.insertId,
            nombre,
            usuario,
            password,
         } );
    } catch (error) {
        return res.status(500).json({
            message:'something went wrong'
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

