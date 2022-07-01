const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Remedios = mongoose.model('Remedio',{
    nome:String,
    dosagem: Number,
    quantidade: Number,
    price: Number,
})

module.exports = Remedios