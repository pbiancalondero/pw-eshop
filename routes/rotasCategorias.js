const {Router} = require('express');
const {getCategorias, addCategoria, updateCategoria, getCategoriaPorCodigo, deleteCategoria} = require('../controllers/categoriaController');
const rotasCategorias = new Router();

rotasCategorias.route('/categorias')
    .get(getCategorias)
    .post(addCategoria)
    .put(updateCategoria)

rotasCategorias.route('/categorias/:codigo')
    .get(getCategoriaPorCodigo)
    .delete(deleteCategoria)

module.exports = {rotasCategorias};