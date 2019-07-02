var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    nome: String,
}, { versionKey: false });

module.exports = mongoose.model("Categoria", categoriaSchema);