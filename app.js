const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.render('index');
})


app.get('/EditText', (req,res)=>{
    res.render('EditText');
})

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})


app.listen(app.get('port'),()=>{
    console.log(`servidor en puerto ${app.get('port')}`)
});