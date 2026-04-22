const Referencia = require('../models/Referencia');

class ReferenciaService {
  async getAll() {
    return Referencia.find().populate('gestanteId');
  }

  async getById(id) {
    const referencia = await Referencia.findById(id).populate('gestanteId');
    
    if (!referencia) {
      throw new Error('Referência não encontrada');
    }
    
    return referencia;
  }

  async create(data) {
    return Referencia.create(data);
  }

  async update(id, data) {
    return Referencia.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return Referencia.findByIdAndDelete(id);
  }
}

module.exports = ReferenciaService;