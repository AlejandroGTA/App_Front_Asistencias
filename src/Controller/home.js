const fetch = require('node-fetch');
const config = require('../appConfig');
const url = config.API_URL;

exports.home = function(req, res, next){
    res.render('Home');
};

exports.signUpUser = function(req, res, next){
    res.render('SignUp');
};

exports.signUpSaveUser = async function(req, res, next){
    const {Name, LastName, Email, Password} = req.body;
    
    var data = {"Name": Name, "LastName":LastName, "Email":Email, "Password": Password};

    let response = await fetch(url+'/signup', {
        method: 'POST', 
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    let mensaje = await response.json();

    res.status(response.status).json(mensaje);
};

exports.signInUser = function(req, res, next){
    res.render('SignIn');
};

exports.signInAuthUser = async function(req, res, next){
    const {Email, Password} = req.body;

    var data = {"Email":Email, "Password": Password};

    let response = await fetch(url+'/signin', {
        method: 'POST', 
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    let mensaje = await response.json();

    if(response.status == 200){
        req.session.user = mensaje;
        res.status(response.status).json({mensaje:'/home'});
    }
    else{
        res.status(response.status).json(mensaje);
    }
};

exports.homeUsuario = async function(req, res, next){
    let response;
    let mensaje;
    switch(req.session.user.TypeUser){
        case 'Alumno':
            res.render('HomeAlumnos',{
                Usuario:req.session.user
            });
        break;
        case 'Maestro':
            response = await fetch(url+'/Maestro/obtenerEventos/'+ req.session.user.id, {
                method: 'GET', 
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Usuario-Token': req.session.user.Token
                }
            });
        
            mensaje = await response.json();

            res.render('HomeMaestros',{
                Eventos: mensaje,
                MaestroId: req.session.user.id
            });
        break;
        case 'Admin':
            response = await fetch(url+'/Admin/', {
                method: 'GET', 
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Usuario-Token': req.session.user.Token
                }
            });
        
            mensaje = await response.json();

            res.render('HomeAdmin',{
                Usuarios: mensaje
            });
        break;
    }
    
};

exports.postEvent = async function(req, res, next){
    let {MaestroId, NameEvent, TiempoInicio, TiempoExpiracion, Localizacion} = req.body;

    let data = {MaestroId, NameEvent, "TiempoInicio":TiempoInicio, "TiempoExpiracion":TiempoExpiracion, Localizacion};
    console.log(data);
    let response = await fetch(url + '/Maestro/generarEventos', {
        method: 'POST', 
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje = await response.json();

    res.status(response.status).json(mensaje);
};

exports.putEvento = async function(req, res, next){
    let id = req.params.id;
    let {NameEvento, TiempoInicio, TiempoExpiracion, Localizacion} = req.body;

    let data = {"NameEvent":NameEvento, TiempoInicio, TiempoExpiracion, Localizacion};

    let response = await fetch(url+'/Maestro/actualizarEvento/'+id, {
        method: 'PUT', 
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje = await response.json();

    res.status(response.status).json(mensaje);
};

exports.deleteEvent = async function(req, res, next){
    let id = req.params.id;
    let response = await fetch(url +'/Maestro/eliminarEvento/'+id, {
        method: 'delete', 
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje = await response.json();

    res.status(response.status).json(mensaje);
};

exports.verAsistenciaEvento = async function(req, res, next){
    let id = req.params.id;
    let response = await fetch(url+'/Maestro/verAsistenciaEvento/'+id, {
        method: 'GET', 
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje = await response.json();

    if(response.status == 200){
        req.session.Evento = mensaje[0];
        res.status(response.status).json({Mensaje:"Success", Render:"/ver"});
    }
    else{
        res.status(response.status).json(mensaje.Mensaje);
    }
};

exports.ver = async function(req, res, next){
    let response = await fetch(url+'/Maestro/verAsistenciaEvento/'+req.session.Evento._id, {
        method: 'GET', 
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensjae = await response.json();

    res.render('VerAsistencia',{ 
        Evento: mensjae[0]
    });
};

exports.asistenciaEvento = async function(req, res, next){
    const {NameAlumno, LastNameAlumno, NameEvent, Localizacion, Url} = req.body;

    let data = {NameAlumno, LastNameAlumno, NameEvent, Localizacion};
    let response = await fetch(Url + 'Asistencia/' + req.params.id, {
        method: 'POST', 
        credentials: 'include',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje =  await response.json();
    if(mensaje.Mensaje == "Datos guardados"){
        res.status(response.status).json({Mensaje:"Success"});
    }
    else{
        res.status(400).json(mensaje);
    }
};

exports.putUsuario = async function(req, res, next){
    let usuarioId = req.params.id;

    let response = await fetch(url + '/Admin/' + usuarioId, {
        method: 'PUT', 
        credentials: 'include',
        body: JSON.stringify(req.body),
        headers:{
            'Content-Type': 'application/json',
            'Usuario-Token': req.session.user.Token
        }
    });

    let mensaje = await response.json();
    if(response.status == 200){
        res.status(response.status).json(mensaje);
    }
    else{
        res.status(response.status).json(mensaje);
    }
};

exports.signOut = function(req, res, next){
    delete req.session.user;
    res.redirect('/signin');
};

exports.authUser = async function(req, res, next){
    if(typeof req.session.user !== 'undefined'){
        let response = await fetch(url+'/authTokenUser', {
            method: 'GET', 
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                'Usuario-Token': req.session.user.Token
            } 
        });

        mensaje = await response.json();

        if(response.status == 200){
            next();
        }
        else{
            delete req.session.user;
            res.redirect('/signin');
        }
    }
    else{
        res.redirect('/signin');
    }
};

exports.authUserForms = function(req, res, next){
    if(typeof req.session.user === 'undefined'){
        next();
    }
    else{
        res.redirect('/home');
    }
};

class UserDomain{
    constructor( Name, LastName, Token){
        this.Name = Name;
        this.LastName = LastName;
        this.Token = Token;
    }
} 