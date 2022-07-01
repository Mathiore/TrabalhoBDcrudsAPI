const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Funcionario = mongoose.model('Funcionario',{
    nome:String,
    funcao: String,
})

module.exports = Funcionario