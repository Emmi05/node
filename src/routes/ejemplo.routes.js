import { Router } from 'express';
import { getemployees, createEmployees,updateEmployess,deleteEmployees,getemployee,pagPrincipal,terrenosImg,dashboard } from '../controller/ejemplo.controller.js';

const router = Router();

///CUANDO ACCEDO AQUI, MI CONTROLADOR HARA TAL COSAAAA
//rutas ESTATICAS
router.get('/',pagPrincipal) 

router.get('/terrenos',terrenosImg) 

router.get('/dashboard',dashboard) 

//RUTAS DINAMICAS
router.get('/employees',getemployees );

router.get('/employees/:id',getemployee);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployess);

// router.put('/employees/:id', updateEmployess);

router.delete('/employees/:id',deleteEmployees );

export default router;
