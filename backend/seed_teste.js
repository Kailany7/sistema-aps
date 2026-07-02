const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sistemaaps';

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  await db.collection('unidadesaudes').deleteMany({});
  await db.collection('unidadesaudes').insertMany([
    { nome: 'USF Alto Branco', macro: 'Macro João Pessoa', municipio: 'João Pessoa' },
    { nome: 'USF São José', macro: 'Macro João Pessoa', municipio: 'João Pessoa' },
    { nome: 'USF Cristo Redentor', macro: 'Macro Campina Grande', municipio: 'Campina Grande' },
    { nome: 'USF Pedro Gondim', macro: 'Macro Campina Grande', municipio: 'Campina Grande' },
  ]);
  console.log('Unidades inseridas');

  await db.collection('users').deleteMany({});
  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash('admin123', 10);
  await db.collection('users').insertOne({
    nome: 'Administrador',
    login: 'admin@aps.gov.br',
    senha_hash: hash,
    perfil: 'medico',
    unidade_saude: 'USF Alto Branco',
    macro: 'Macro João Pessoa',
    municipio: 'João Pessoa',
    ativo: true,
  });
  console.log('Usuário admin inserido (admin@aps.gov.br / admin123)');

  await db.collection('users').insertOne({
    nome: 'Enfermeiro JP',
    login: 'enfermeiro@aps.gov.br',
    senha_hash: await bcrypt.hash('123456', 10),
    perfil: 'enfermeiro',
    unidade_saude: 'USF Alto Branco',
    macro: 'Macro João Pessoa',
    municipio: 'João Pessoa',
    ativo: true,
  });
  console.log('Usuário enfermeiro inserido (enfermeiro@aps.gov.br / 123456)');

  await db.collection('users').insertOne({
    nome: 'Município JP',
    login: 'municipio@aps.gov.br',
    senha_hash: await bcrypt.hash('123456', 10),
    perfil: 'municipio',
    unidade_saude: 'USF Alto Branco',
    macro: 'Macro João Pessoa',
    municipio: 'João Pessoa',
    ativo: true,
  });
  console.log('Usuário municipio inserido (municipio@aps.gov.br / 123456)');

  const unidades = await db.collection('unidadesaudes').find().toArray();
  for (const u of unidades) {
    await db.collection('gestantes').updateMany(
      { unidade_saude: u.nome },
      { $set: { macro: u.macro, municipio: u.municipio } }
    );
  }
  const count = await db.collection('gestantes').countDocuments();
  console.log(count + ' gestantes atualizadas com macro/municipio');

  await mongoose.disconnect();
}
main().catch(console.error);
