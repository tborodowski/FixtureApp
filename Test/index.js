const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let partido = {
 id:'1',
 canchaId: '55',
 fecha: "string",
 localId: 0,
 visitanteId: "string",
 golesLoc: 0,
 golesVis: 0,
 finalizado: true
};

let equipo = {
    Id: 0,
    nombre: 0,
    Posicion: "string",
    Capitan: 0,
    puntos: 0,
    activo: true
  }

let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};


app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});


app.get('/partidos', function (req, res) {

    const fs = require('fs');
    
    fs.readFile('partidos.json', (err, data) => {
        if (err) throw err;
        let partidos = JSON.parse(data);
        console.log(partidos);
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
           };
           if(partidos.id === '') {
            respuesta = {
             error: true,
             codigo: 501,
             mensaje: 'El partido no ha sido creado'
            };
           } else {
            respuesta = {
             error: false,
             codigo: 200,
             mensaje: 'respuesta del partido',
             respuesta: partidos
            };
           }
           res.send(respuesta);
    });
});


app.post('/partidos', function (req, res) {
    
 if(!req.body.id || !req.body.canchaId) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };

 } else {
  if(false) {
   respuesta = {
    error: true,
    codigo: 503,
    mensaje: 'El usuario ya fue creado previamente'
   };
  } else {
   partido = {
    id: req.body.id,
    canchaId: req.body.canchaId,
    fecha : req.body.fecha,
    localId : req.body.localId,
    visitanteId : req.body.visitanteId,
    golesLoc : req.body.golesLoc,
    golesVis : req.body.golesVis,
    finalizado: false
   };
   const data = JSON.stringify(partido);


fs.writeFile('partidos.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
   
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'partido creado',
    respuesta: partido
   };
  }
  
 }

 res.send(respuesta);
});
app.put('/partidos', function (req, res) {
 if(!req.body.nombre || !req.body.apellido) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };
 } else {
  if(usuario.nombre === '' || usuario.apellido === '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'El usuario no ha sido creado'
   };
  } else {
   usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario actualizado',
    respuesta: usuario
   };
  }
 }
 
 res.send(respuesta);
});
app.delete('/partidos', function (req, res) {
 if(usuario.nombre === '' || usuario.apellido === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'Usuario eliminado'
  };
  usuario = { 
   nombre: '', 
   apellido: '' 
  };
 }
 res.send(respuesta);
});
app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});