const passport = require('passport');
const mongoose = require('mongoose');
const Vacante = require('../models/Vacantes');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
//const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect : '/administracion',
    failureFlash: true,
    failureRedirect : '/iniciar-sesion',
    badRequestMessage : 'Ambos campos son obligatorios'
});
//revisar si el usuario esta autentica o no
   exports.verificarUsuario=(req,res,next) => {
    //revisar el usuario
    if(req.isAuthenticated()){
        return next(); //
    }
    res.redirect('iniciar-sesion');
   }


exports.mostrarPanel =async (req,res) => {
    //consultar el usuario autenticado
    const vacantes = await Vacante.find({autor:req.user._id})
    res.render('administracion',{
        nombrePagina:'Panel de Administracion',
        tabline: 'Crea y Administra tus vacantes desde Aqui',
        vacantes
    })
}