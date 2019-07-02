var express = require('express');
var router = express.Router();
var Jogo = require('./jogo');

router.get('/', (req, res) => {
    Jogo.find().exec((err, jogs) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(jogs);
    })
})

router.post('/', (req, res) => {
    let j = new Jogo({
        nome: req.body.nome,
        desenvolvedora: req.body.desenvolvedora,
        nota: req.body.nota,
        categorias: req.body.categorias
    });
    j.save((err, jog) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(jog);
    })
})

router.patch('/:id', (req, res) => {
    Jogo.findById(req.params.id, (err, jog) => {
        if (err)
            res.status(500).send(err);
        else if (!jog)
            res.status(404).send({});
        else {
            jog.nome = req.body.nome;
            jog.desenvolvedora = req.body.desenvolvedora;
            jog.nota = req.body.nota;
            jog.categorias = req.body.categorias;

            jog.save((err, jog) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).send(jog);
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    Jogo.deleteOne({ _id: req.params.id }, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({});
    })
})

module.exports = router;