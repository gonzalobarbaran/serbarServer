const mongoose =  require('mongoose');
const { Schema } = mongoose;

const ListaSchema = new Schema({
    nombre: { type: String, required: true},
})

module.exports = mongoose.model('Lista', ListaSchema);