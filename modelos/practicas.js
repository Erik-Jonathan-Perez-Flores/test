'use strict'

const mongoose = require('./connect')
const Schema = mongoose.Schema

const PracticaSchema = Schema({
      titulo: {
        type: String,
        require: true
      },
      texto: {
        type: String,
        require: true
      }
})
const PRACTICA = mongoose.model('Practica', PracticaSchema);
module.exports = PRACTICA;