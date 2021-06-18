const express = require('express');
const route = express.Router();
const ControllrerHome = require('../Controller/home');

route.get('/', ControllrerHome.home);

route.get('/signup', ControllrerHome.authUserForms, ControllrerHome.signUpUser);

route.post('/signup', ControllrerHome.signUpSaveUser);

route.get('/signin', ControllrerHome.authUserForms, ControllrerHome.signInUser);

route.post('/signin', ControllrerHome.signInAuthUser);

route.get('/home', ControllrerHome.authUser, ControllrerHome.homeUsuario);

route.post('/agregarEvento', ControllrerHome.authUser, ControllrerHome.postEvent);

route.put('/actualizarEvento/:id', ControllrerHome.authUser, ControllrerHome.putEvento);

route.delete('/eliminarEvento/:id', ControllrerHome.authUser, ControllrerHome.deleteEvent);

route.get('/verAsistenciaEvento/:id', ControllrerHome.authUser, ControllrerHome.verAsistenciaEvento);

route.get('/ver', ControllrerHome.authUser, ControllrerHome.ver);

route.post('/tomarAsistencia/:id', ControllrerHome.asistenciaEvento);

route.put('/Admin/:id', ControllrerHome.authUser, ControllrerHome.putUsuario);

route.delete('/Admin/:id', ControllrerHome.authUser, ControllrerHome.deleteUsuario);

route.get('/signOut', ControllrerHome.signOut);

module.exports = route;