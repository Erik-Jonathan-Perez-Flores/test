
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/GuiasLab", {useNewUrlParser: true}, (err, res)=>{
    if(err){
        return console.log(`Èrror al conectar la base de datos: ${err}`)
    }
    console.log('Conectado a la BD')
    
});
module.exports = mongoose;