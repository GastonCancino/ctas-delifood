var express = require('express');
var router = express.Router();

var controladorRegPedidoAdmin = require('../controlador/controladorRegPedidoAdmin');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/grabaPedidoAdm', controladorRegPedidoAdmin.tomarPedido);

module.exports = router;