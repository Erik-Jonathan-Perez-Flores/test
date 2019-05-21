const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const Practica = require('./modelos/practicas.js')
const Materia = require('./modelos/materias.js')

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    Materia.find({},(err, materia)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!materia) return res.status(404).send({message:`El producto no existe`})
        res.render('MostrMate', { materia })
    }) 
})
app.get('/MostrPrac', function(req, res){
    console.log("ENTER TO SERVICE");
    Practica.find({},(err, practicas)=>{
         var practicas = practicas.map(data=>({
            titulo:data.titulo,
            texto:data.texto
        }))
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!practicas) return res.status(404).send({message:`El producto no existe`})
        console.log(practicas);
        //res.status(200).json({msn: practicas});
        res.render('MostrPrac', { practicas })
    });
      
})


app.get('/EditText', (req,res)=>{
    res.render('EditText');
})

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})

///////////////////////


app.get('/api/practicas', (req,res) =>{

    Practica.find({},(err, practicas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!practicas) return res.status(404).send({message:`El producto no existe`})
        res.send(200, { practicas })
    })            
})

app.get('/api/materia', (req,res) =>{

    Materia.find({},(err, materia)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!materia) return res.status(404).send({message:`El producto no existe`})
        res.send(200, { materia })
    })            
})

app.get('/api/practicas/:pId', (req,res) =>{
    let pId = req.practicas.pId

    Practicas.findById(pId,(err,practicas)=> {
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!practicas) return res.status(404).send({message:`El producto no existe`})
        res.status(200).send({practicas})
    })
})

app.post('/api/practicas', (req,res) =>{
    
    console.log(req.body)
    let practica = new Practica()
    practica.titulo =  req.body.titulo;
    practica.texto =  req.body.texto;
    practica.save((err, practicaStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})

        res.status(200).send({practica: practicaStored})
    })
    res.redirect('/MostrPrac');
    return;
})

app.post('/api/materia', (req,res) =>{
    
    console.log(req.body)
    let materia = new Materia()
    materia.nombre =  req.body.nombre
    materia.sigla =  req.body.sigla
    materia.save((err, materiaStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})

        res.status(200).send({materia: materiaStored})
    })
})

app.put('/api/practicas/:pId', (req,res) =>{

})

app.delete('/api/practicas/:pId', (req,res) =>{
    let practicaId = req.params.practicaId

    Practica.findById(practicaId,(err, practicas)=>{
        if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
   
    practicas.remove(err =>{
        if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
        res.status(200).send({message:`El producto a sido elmininado`})
        })
    })
})

app.listen(app.get('port'),()=>{
    console.log(`servidor en puerto ${app.get('port')}`)
});

module.exports = app;