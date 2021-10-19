const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
  listar() {
    return Modelo.findAll();
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async buscaPorId(id) {
    const fornecedor = await Modelo.findOne({
      where: {
        id
      }
    });

    if(!fornecedor) {
      throw new NaoEncontrado();
    }

    return fornecedor;
  },
  atualizar(id, dados) {
    return Modelo.update(
      dados,
      {
        where: {id}
      }
    )
  },
  remover(id) {
    return Modelo.destroy({
      where: {id}
    })
  }
}