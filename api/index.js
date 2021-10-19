const express = require('express');
const config = require('config');
const router = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const { formatosAceitos } = require('./Serializador');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  let formatoRequisitado = req.header('Accept');

  if(formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json'
  }

  if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
    return res.sendStatus(406);
  }

  res.setHeader('Content-Type', formatoRequisitado);
  next();
});

app.use('/api/fornecedores', router);
app.use((erro, req, res, next) => {
  let status = 500;
  if(erro instanceof NaoEncontrado) {
    status = 404;
  }

  if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400
  }

  if(erro instanceof ValorNaoSuportado) {
    status = 406;
  }

  res.status(status).json({erro: erro.message});
})

app.listen(config.get('api.porta'), () => console.log('Server started'));