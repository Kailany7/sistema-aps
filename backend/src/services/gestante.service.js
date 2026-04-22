const Gestante = require('../models/Gestante');

class GestanteService {
  async getAll() {
    return Gestante.find();
  }

  async getById(id) {
    const gestante = await Gestante.findById(id);
    
    if (!gestante) {
      throw new Error('Gestante não encontrada');
    }
    
    return gestante;
  }

  async create(data) {
    return Gestante.create(data);
  }

  async update(id, data) {
    return Gestante.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return Gestante.findByIdAndDelete(id);
  }
}

module.exports = GestanteService;