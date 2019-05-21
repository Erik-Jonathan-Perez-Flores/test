'use strict'

const mongoose = require("./connect");
//const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MateriaSchema = Schema({
     nombre: {
        type: String,
        require: true
      },
      sigla: {
        type: String,
        require: true
      }
})
const MATERIA = mongoose.model('Materia', MateriaSchema);
module.exports = MATERIA;