import { Router } from 'express';
import { updateEmployess,deleteEmployees,getemployee,pagPrincipal,terrenosImg,dashboard,formulario, } from '../controller/ejemplo.controller.js';
import {methods as authentication} from '../controller/ejemplo.controller.js';
const router = Router();

///CUANDO ACCEDO AQUI, MI CONTROLADOR HARA TAL COSAAAA
//rutas ESTATICAS
router.get('/',pagPrincipal) 

router.get("/login",authentication.login);

router.post("/login",authentication.login);

router.get('/terrenos',terrenosImg) 

router.get('/dashboard',dashboard) 

router.get('/formulario',formulario) 




//RUTAS DINAMICAS
router.get('/employees',authentication.getemployees );

router.get('/employees/:id',getemployee);

router.post('/employees',authentication.createEmployees);

router.patch('/employees/:id', updateEmployess);

// router.put('/employees/:id', updateEmployess);

router.delete('/employees/:id',deleteEmployees );

export default router;
