import { Router } from 'express';
import { getemployees, createEmployees,updateEmployess,deleteEmployees,getemployee,pagPrincipal,terrenosImg } from '../controller/ejemplo.controller.js';

const router = Router();



//en index era app.get pero aqui es router
///CUANDO ACCEDO AQUI, MI CONTROLADOR HARA TAL COSAAAA
// router.get('/',pagPrincipal);

router.get('/',pagPrincipal) 
router.get('/terrenos',terrenosImg) 

router.get('/employees',getemployees );

router.get('/employees/:id',getemployee);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployess);

// router.put('/employees/:id', updateEmployess);

router.delete('/employees/:id',deleteEmployees );

export default router;