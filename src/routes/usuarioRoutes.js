const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
router.put('/:id', usuarioController.atualizar);
router.delete('/:id', usuarioController.remover);

module.exports = router;
