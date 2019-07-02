var express = require('express');
var router = express.Router();
var Categoria = require('./categoria');
var Jogo = require('./jogo');

router.get('/', function (req, res) {
    Categoria.find().exec((err, categs) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(categs);
    })
})

router.post('/', function (req, res) {
    console.log(req.body);
    let c = new Categoria({ nome: req.body.nome });
    c.save((err, categ) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(categ);
    })
})

router.patch('/:id', (req, res) => {
    Categoria.findById(req.params.id, (err, categ) => {
        if (err)
            res.status(500).send(err)
        else if (!categ)
            res.status(404).send({})
        else {
            categ.nome = req.body.nome;
            categ.save()
                .then((c) => res.status(200).send(c))
                .catch((e) => res.status(500).send(e));
        }
    })
})

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let jogos = await Jogo.find({ categorias: id }).exec();
        if (jogos.length > 0) {
            res.status(500).send({
                msg: 'Não pode remover esta categoria, esta sendo usado por um jogo.'
            })
        }
        else {
            await Categoria.deleteOne({ _id: id });
            res.status(200).send({});
        }
    }
    catch (err) {
        res.status(500).send({ msg: "Erro interno.", error: err })
    }
})

module.exports = router;