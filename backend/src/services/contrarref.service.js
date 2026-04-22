const Contrarref = require('../models/Contrarref');

class ContrarrefService {
  async getAll() {
    return Contrarref.find().populate('gestanteId');
  }

  async getById(id) {
    const contrarref = await Contrarref.findById(id).populate('gestanteId');
    
    if (!contrarref) {
      throw new Error('Contrarreferência não encontrada');
    }
    
    return contrarref;
  }

  async create(data) {
    return Contrarref.create(data);
  }

  async update(id, data) {
    return Contrarref.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return Contrarref.findByIdAndDelete(id);
  }
}

module.exports = ContrarrefService;