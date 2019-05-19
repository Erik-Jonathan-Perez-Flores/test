'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ParamsSchema = Schema({
     autor: {
        type: String,
        require: true
      },
      materia: {
        type: String,
        require: true,
        enum: ['SIS-110', 'SIS-141', 'SIS-211', 'SIS-312', 'SIS-313', 'SIS-414', 'SIS-443', 'SIS-518', 'SIS-523', 'SIS-624',
               'SIS-625', 'OPT-005', 'SIS-710', 'SIS-735', 'SIS-737', 'OPT-001', 'OPT-003', 'OPT-013']
      },
      titulo: {
        type: String,
        require: true
      },
      cuerpo: {
        type: String,
        require: true
      }
})

module.exports = mongoose.model('Params', ParamsSchema)