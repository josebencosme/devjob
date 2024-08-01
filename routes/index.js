const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const { Routes } = require('react-router-dom');
const { autenticarUsuario } = require('../controllers/authController');
module.exports = () => {
    router.get('/', homeController.mostrarTrabajos);
    //Crear Vacantes
    router.get('/vacantes/nueva',
        authController.verificarUsuario,
        vacantesController.formularioNuevaVacante);
    router.post('/vacantes/nueva',
        authController.verificarUsuario,
        vacantesController.agregarVacante);
    //Mostrar vacante (singular)
    router.get('/vacantes/:url', vacantesController.mostrarVacante);
    //editar Vacante
    router.get('/vacantes/editar/:url',
        authController.verificarUsuario,
        vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url',
        vacantesController.editarVacante);
    //crear cuentas

    router.get('/crear-cuenta',
        usuariosController.formCrearCuenta);
    router.post('/crear-cuenta',
        usuariosController.validarRegistro,
        usuariosController.crearUsuario);
    // Autenticar usuarios
    router.get('/iniciar-sesion',usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario);   
    // panel de administracion
    router.get('/administracion',
        authController.verificarUsuario,
        authController.mostrarPanel);
    return router;
}