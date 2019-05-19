const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Params = require('./modelos/params.js')

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.render('MostrMate');
})

app.get('/index', (req,res)=>{
    res.render('index');
})


app.get('/EditText', (req,res)=>{
    res.render('EditText');
})

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})

///////////////////////


app.get('/api/params', (req,res) =>{

    Params.find({},(err, params)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!params) return res.status(404).send({message:`El producto no existe`})
        res.send(200, { params })
    })            
})

app.get('/api/params/:pId', (req,res) =>{
    let pId = req.params.pId

    Params.findById(pId,(err,params)=> {
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
        if(!params) return res.status(404).send({message:`El producto no existe`})
        res.status(200).send({params})
    })
})

app.post('/api/params', (req,res) =>{
    
    console.log(req.body)
    let params = new Params()
    params.autor =  req.body.autor
    params.materia = req.body.materia
    params.titulo = req.body.titulo
    params.cuerpo = req.body.GuiasdeLaboratorio

    params.save((err, paramsStored)=>{
        if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})

        res.status(200).send({params: paramsStored})
    })
})
app.put('/api/params/:pId', (req,res) =>{

})

app.delete('/api/params/:pId', (req,res) =>{

})

mongoose.connect("mongodb://localhost:27017/GuiasLab", (err, res)=>{
    if(err){
        return console.log(`Èrror al conectar la base de datos: ${err}`)
    }
    console.log('Conectado a la BD')
app.listen(app.get('port'),()=>{
    console.log(`servidor en puerto ${app.get('port')}`)
})
})