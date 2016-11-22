var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  //Llama el modelo
  Elecciones = mongoose.model('EstadosMod'),
  arrHillary = [],
  arrTrump = [];

module.exports = function(app) {
  app.use('/', router);
};

//Ruta de la primera vista
router.get('/elecciones', function(req, res, next) {

  Elecciones.find(function(err, estados, puntosTotalTrump, puntosTotalHillary) //Busca el modelo dentro del MVC
    {
      if (err) return next(err);
      res.render('elecciones', {
        titulo: 'Elecciones',
        elecciones: estados,
        arrTrump: puntosTotalTrump,
        arrHillary: puntosTotalHillary
      });
    });
});

//Ruta de la segunda vista
router.get('/votos', function(req, res, next) {
  Elecciones.find(function(err, estados, puntosTotalTrump, puntosTotalHillary) //Busca el modelo dentro del MVC
    {
      if (err) return next(err);
      res.render('votos', {
        titulo: 'Votos Totales Por Estado',
        elecciones: estados,
        arrTrump: puntosTotalTrump,
        arrHillary: puntosTotalHillary
      });
    });
});

//Ruta de la segunda vista
router.get('/ganador', function(req, res, next) {
  Elecciones.find(function(err, estados, puntosTotalTrump, puntosTotalHillary) //Busca el modelo dentro del MVC
    {
      if (err) return next(err);
      res.render('ganador', {
        titulo: 'Ganador',
        elecciones: estados,
        arrTrump: puntosTotalTrump,
        arrHillary: puntosTotalHillary
      });
    });
});

//post de la primera vista
//Obtener el id
router.post('/elecciones/:id', function(req, res) {
  var id = req.params.id,
      //obtener el resultado de los inputs
      jadeTrump = req.body.trump,
      jadeHillary = req.body.hillary,
      puntosTotalTrump = 0,
      puntosTotalHillary = 0;

  // Encuentra la respuesta por medio del id
  Elecciones.findById(id, function(err, docs) {
    if (err) {
      console.log(err);
    }
    //rellenar el campo que se encuentra en la base de datos
    docs.trump = jadeTrump;
    docs.hillary = jadeHillary;

    console.log("Datos del estado seleccionado" + JSON.stringify(docs));
    //verifica cual tuvo más votos por estado
    if (docs.trump <= 0 && docs.hillary <= 0) {
      console.log(err);
    }else {
      if (docs.trump > docs.hillary) {
        docs.ganador = "Trump";
        docs.ganadorT = true;
        docs.ganadorH = false;
        arrTrump.push(docs.puntos);
      } else {
        docs.ganador = "Hillary";
        docs.ganadorH = true;
        docs.ganadorT = false;
        arrHillary.push(docs.puntos);
      }
      console.log("Ganador " + docs.ganador);
      console.log("Puntos del estado  " + docs.puntos);
      console.log("ARR Trump " + arrTrump);
      console.log("ARR Hillary " + arrHillary);

      docs.save(function (err) {
      if (err) {
        console.log(err);
      }
        console.log("Yeah!");
      });
    }
  });

  // convertir los objetos en numero y sumarlos
  for (var i = 0; i < arrHillary.length; i++) {
    puntosTotalHillary += parseInt(arrHillary[i])
  }
  for (var i = 0; i < arrTrump.length; i++) {
    puntosTotalTrump += parseInt(arrTrump[i])
  }

  console.log("Puntos del estado de Hillary " + puntosTotalHillary);
  console.log("Puntos del estado de Trump " + puntosTotalTrump);

  res.redirect('/elecciones');
});

//post de la segunda vista
router.post('/votos/:id', function(req, res) {
  var id = req.params.id;

  // Encuentra la respuesta por medio del id
  Elecciones.findById(id, function(err, docs) {
    if (err) {
      console.log(err);
    }

    docs.save(function (err) {
    if (err) {
      console.log(err);
    }
      console.log("Yeah!");
    });
  });
  res.redirect('/votos');
});

//post de la tercera vista
router.post('/ganador/:id', function(req, res) {
  var id = req.params.id,
      jadeTrump = req.body.trump,
      jadeHillary = req.body.hillary;
  Elecciones.findById(id, function(err, docs) {
    if (err) {
      console.log(err);
    }
    docs.trump = jadeTrump;
    docs.hillary = jadeHillary;

    if (docs.trump <= 0 && docs.hillary <= 0) {
      console.log(err);
    }else {
      if (docs.trump > docs.hillary) {
        docs.ganador = "Trump";
        docs.ganadorT = true;
        docs.ganadorH = false;
        arrTrump.push(docs.puntos);
      } else {
        docs.ganador = "Hillary";
        docs.ganadorH = true;
        docs.ganadorT = false;
        arrHillary.push(docs.puntos);
      }
      console.log("Ganador " + docs.ganador);
      console.log("Puntos del estado  " + docs.puntos);
      console.log("ARR Trump " + arrTrump);
      console.log("ARR Hillary " + arrHillary);

      docs.save(function (err) {
      if (err) {
        console.log(err);
      }
        console.log("Yeah!");
      });
    }
  });
  // convertir los objetos en numero y sumarlos
  for (var i = 0; i < arrHillary.length; i++) {
    puntosTotalHillary += parseInt(arrHillary[i])
  }
  for (var i = 0; i < arrTrump.length; i++) {
    puntosTotalTrump += parseInt(arrTrump[i])
  }

  console.log("Puntos del estado de Hillary " + puntosTotalHillary);
  console.log("Puntos del estado de Trump " + puntosTotalTrump);

  res.redirect('/ganador');
});
