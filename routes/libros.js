var express = require('express');
var router = express.Router();
//Simular BD
//var tablaLibros= "{'id':1, 'título':'El Perfume','autor':'Patrick Suskind'}";
var tablaLibros= {'id':1, 'Título':'Lagrimas del Diablo','Autor':'Jeffery Deaver'};
var tablaLibros2= [
                    {'id':1, 'Título':'El Perfume','Autor':'Patrick Suskind'},
                    {'id':2, 'Título':'Lagrimas del Diablo','Autor':'Jeffery Deaver'},
                    {'id':3, 'Título':'La Biblia','Autor':'Apostoles'}
                  ];

router.get('/', function(req, res, next) {
  //realizar consulta BD
  res.status(200).json(tablaLibros2);
});

router.get('/:idLibro',(req, res, next)=>{
  var id= req.params.idLibro;
  res.status(200).json(tablaLibros2[id-1]);
});

router.post('/:idLibro', (req, res, next)=>{
  res.status(400).json({'Error':'Opereción no permitida'});
});

router.post('/', (req,res,next)=>{
  console.log(req.body);
  var libro= {
    //línea 30 actua como AUTOINCREMENT Y OBTENEMOS ÚLTIMO LIBRO
    'id':tablaLibros2[tablaLibros2.length-1]['id']+1,
    'Título':req.body.titulo,
    'Autor':req.body.autor
  };
  //INSERT EN BD DEL OBJETO LIBRO
  tablaLibros2.push(libro);
  //RESPUESTA BD (regresaría a el cliente)
  res.status(200).json(tablaLibros2[tablaLibros2.length-1]);
});

router.patch('/:idLibro', (req,res,next)=>{
  var id= req.params.idLibro;
  //BD: update libros set titulo= where id= 1
  tablaLibros2[id-1]['Título']= req.body.titulo;
  tablaLibros2[id-1]['Autor']= req.body.autor;
  res.status(201).json({'MENSAJE':'Actualizado'});
});

module.exports = router;
