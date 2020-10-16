const { Router } = require('express');

const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const RequestMountsController = require('./controllers/RequestMountsController');

const MenuArvore = require('./controllers/MenuCategoriasController');
const MontarMenuCategorias = require('./controllers/MontaMenuCategoriasController');

const routes = Router();

//Rotas de autenticação
routes.post('/auth', SessionController.store);

//Rotas para criação do menu
routes.post('/menuCategorias', authMiddleware, MenuArvore.store);

//Roras para montar menu
routes.get('/montarMenu', authMiddleware, MontarMenuCategorias.index);

//Rotas de usuarios
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:email', UserController.destroy);

//Routes request mounts
routes.get('/requestmounts',  RequestMountsController.index);
routes.post('/requestmounts', authMiddleware, RequestMountsController.store);


module.exports = routes;
