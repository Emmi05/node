import { Router } from 'express';
import { getemployees, createEmployees,updateEmployess,deleteEmployees,getemployee,pagPrincipal,terrenosImg,dashboard,formulario,consulta } from '../controller/ejemplo.controller.js';

const router = Router();

///CUANDO ACCEDO AQUI, MI CONTROLADOR HARA TAL COSAAAA
//rutas ESTATICAS
router.get('/',pagPrincipal) 

router.get('/terrenos',terrenosImg) 

router.get('/dashboard',dashboard) 

router.get('/formulario',formulario) 

// router.get('/consultar',consulta) 


//RUTAS DINAMICAS
router.get('/employees',getemployees );

router.get('/employees/:id',getemployee);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployess);

// router.put('/employees/:id', updateEmployess);

router.delete('/employees/:id',deleteEmployees );

export default router;
