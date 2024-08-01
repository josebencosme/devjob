const Vacante = require('../models/Vacantes')

exports.mostrarTrabajos = async( req, res, next) => {

  const vacantes = await Vacante.find().lean();
  if (!vacantes) return next();
    res.render('home', {
      nombrePagina:'debJobs',
      tagline:'Encuentra y publica Trabajos en Talentos RD',
      barra:true,
      boton:true,
      vacantes
    })
}