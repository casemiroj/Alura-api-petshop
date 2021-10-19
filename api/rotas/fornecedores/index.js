const { Router } = require('express');
const router = Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

router.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200).json(resultados);
});

router.post('/', async (req, res, next) => {
  try {
    const dados = req.body;
    const fornecedor = new Fornecedor(dados);
    await fornecedor.criar();
    res.status(201).json(fornecedor);
  } catch(erro) {
    next(erro);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id })
    await fornecedor.carregar();
    res.status(200).json(fornecedor);
  } catch(erro) {
    next(erro);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.sendStatus(204);
  } catch(erro) {
    next(erro);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.carregar();
    await fornecedor.remover();
    res.sendStatus(204);
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;