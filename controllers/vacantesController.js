const Vacante = require('../models/Vacantes')
exports.formularioNuevaVacante = (req,res) => {
res.render('nueva-vacante',{           
    nombrePagina: 'Nueva Vacante',
    tabline:'Llena el formulario y publica tu vacante'
})
}
//agregar las vacantes a la base de datos
exports.agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);
  //usuario autor de la vacante
    vacante.autor = req.user._id; 
  // usuario autor de la vacante
  vacante.autor = req.user._id;

  // crear arreglo de habilidades (skills)
  vacante.skills = req.body.skills.split(',');

  // almacenarlo en la base de datos
  const nuevaVacante = await vacante.save()

  // redireccionar
  res.redirect(`/vacantes/${nuevaVacante.url}`);
  
}
// muestra una vacante
exports.mostrarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).populate('autor');
  // si no hay resultados
  if(!vacante) return next();

  res.render('vacante', {
      vacante,
      nombrePagina : vacante.titulo,
      barra: true
  })
}

exports.formEditarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url});

  if(!vacante) return next();

  res.render('editar-vacante', {
      vacante,
      nombrePagina : `Editar - ${vacante.titulo}`/*,
      cerrarSesion: true,
      nombre : req.user.nombre,
      imagen : req.user.imagen*/
  })
}
exports.editarVacante= async(req, res) =>{
  const vacanteActualizada = req.body;
  vacanteActualizada.skills = req.body.skills.split(',');
  const vacante = await Vacante.findOneAndUpdate({url:req.params.url},
    vacanteActualizada,{
       new:true,
       runValidators:true
    });
   res.redirect('/vacantes/${vacante.url}')
  }