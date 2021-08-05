const mongoose =  require('mongoose');
const { Schema } = mongoose;

const ClienteSchema = new Schema({
    // idCliente: { type: Number, required: true},
    CUIT: { type: Number, required: true},
    razonSocial: { type: String, required: true},
    domicilio: { type:String, required: false},
    condIVA: { type:String, required: false},
    telefono: { type:Number, required: false},
    email: { type:String, required: false},
    localidad: { type:String, required: false},
    provincia: { type:String, required: false},
})

module.exports = mongoose.model('Cliente', ClienteSchema);