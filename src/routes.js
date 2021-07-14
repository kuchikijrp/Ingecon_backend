const { Router } = require('express');

const authMiddleware = require('./middlewares/auth');

const SysRulesController = require('./controllers/RulesController');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const RequestMountsController = require('./controllers/RequestMountsController');
const ApprovalMountsController = require('./controllers/ApprovalMountsController');

const FeatureController = require('./controllers/FeatureController');

const MenuArvore = require('./controllers/MenuCategoriasController');
const MontarMenuCategorias = require('./controllers/MontaMenuCategoriasController');

const CadastroClienteFilial = require('./controllers/CadastroClienteFilialController');

const FormaPagamento = require('./controllers/FormaPagamentoController');

const fotosMontagem = require('./controllers/fotosMontagem');

const routes = Router();

//Rotas de autenticação
routes.post('/auth', SessionController.store);

//Rotas para criação do menu
routes.post('/menuCategorias', authMiddleware, MenuArvore.store);
routes.delete('/menuCategorias/:id', authMiddleware, MenuArvore.delete);

//Rotas para features
routes.get('/features', authMiddleware, FeatureController.index)
routes.post('/features', authMiddleware, FeatureController.store);
routes.delete('/features/:id', authMiddleware, FeatureController.delete);

//Rotas para montar menu
routes.get('/montarMenu', authMiddleware, MontarMenuCategorias.index);

//Rotas de usuarios
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:userId', UserController.show);
routes.put('/users/resetSenha/:userId', UserController.update);
routes.delete('/users/:email', UserController.destroy);

//Routes request mounts
routes.get('/requestmounts', authMiddleware,  RequestMountsController.index);
routes.post('/requestmounts', authMiddleware, RequestMountsController.store);
routes.get('/requestmounts/:idMount', authMiddleware, RequestMountsController.show);
routes.put('/requestmounts/:idMount', authMiddleware, RequestMountsController.update);

    //Routes approval mounts
    routes.post('/approvalmounts/:idMount', authMiddleware, ApprovalMountsController.store);
    routes.get('/approvalmounts/:idMount', authMiddleware, ApprovalMountsController.show);

//Routes Cadastro Clientes Filial
routes.get('/clienteFilial', authMiddleware, CadastroClienteFilial.index);
routes.get('/clienteFilial/:id', authMiddleware, CadastroClienteFilial.show);

//Routes para Rules
routes.post('/sysRules', authMiddleware, SysRulesController.store);
routes.delete('/sysRules/:id', authMiddleware, SysRulesController.delete);

//Routes para Formas Pagamento
routes.get('/formasPagamento', FormaPagamento.index);

//Routes para pegar as fotos das montagens
routes.get('/fotos', fotosMontagem.index)

module.exports = routes;