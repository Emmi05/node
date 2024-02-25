import express from 'express';
import {pool} from './db.js';
import ejemploRutas from './routes/ejemplo.routes.js';
import indexRutas from './routes/index.routes.js';
import {dirname,join} from 'path'; //una ruta absoluta crear, JOIN PONE LA DIAGONAL INVERTIDA
import { fileURLToPath } from 'url';

const app=express();


//vistas
const __dirname = dirname(fileURLToPath (import.meta.url))
console.log(join(__dirname, 'views')) //mueSTRA TODA MIS CARPETAS desde c hasta src y AGREGUE VIEWS
app.set('views',join(__dirname,'views',)) //mi carpeta
app.use(express.static(join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.use(express.json()); //hace que mis peticiones se conviertan a json para poder leearlas
app.use(indexRutas)
app.use('/',ejemploRutas);

//midleware
app.use((req, res, next) => {
    res.status(404)
    res.render('404')
});

//invocamos a bcryptjs
const bcryptjs=import('bcryptjs');


//var sesiones
const session= import ('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true

}));

app.listen(3000);
console.log('listening on port 3000');