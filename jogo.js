var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jogoSchema = new Schema({
    nome: String,
    desenvolvedora: String,
    nota: Number,
    categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }]
}, { versionKey: false });

module.exports = mongoose.model("Jogo", jogoSchema);