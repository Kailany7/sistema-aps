const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sistemaaps';

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('Conectado ao MongoDB\n');

  const UnidadeSaude = require('./src/models/UnidadeSaude');
  const Risco = require('./src/models/Risco');
  const Gestante = require('./src/models/Gestante');
  const User = require('./src/models/User');

  // ── Unidades de Saúde ────────────────────────────────────────
  const unidades = [
    { nome: 'USF Alto Branco' },
    { nome: 'USF São José' },
    { nome: 'USF Cristo Redentor' },
    { nome: 'USF Pedro Gondim' },
  ];

  await UnidadeSaude.deleteMany({});
  await UnidadeSaude.insertMany(unidades);
  console.log(`  ${unidades.length} unidades de saúde inseridas`);

  // ── Níveis de Risco ──────────────────────────────────────────
  const riscos = [
    { valor: 'Baixo', rotulo: 'Baixo Risco' },
    { valor: 'Intermediário', rotulo: 'Risco Intermediário' },
    { valor: 'Alto', rotulo: 'Alto Risco' },
  ];

  await Risco.deleteMany({});
  await Risco.insertMany(riscos);
  console.log(`  ${riscos.length} níveis de risco inseridos`);

  // ── Usuário Padrão ───────────────────────────────────────────
  await User.deleteMany({});
  const usuario = await User.create({
    nome: 'Administrador',
    login: 'admin@aps.gov.br',
    senha_hash: 'admin123',
    perfil: 'medico',
    unidade_saude: 'USF Alto Branco',
  });
  console.log('  1 usuário inserido (admin@aps.gov.br / admin123)');

  // ── Gestantes Mock ───────────────────────────────────────────
  const now = new Date();
  const makeDate = (y, m, d) => new Date(y, m - 1, d);
  const usuarioId = usuario._id;

  const gestantes = [
    // ── 2 Baixo Risco ──
    {
      nome: 'Ana Beatriz Oliveira',
      cpf: '234.567.890-11',
      data_nascimento: makeDate(2002, 8, 5),
      telefone: '(83) 98888-0002',
      endereco: 'Av. dos Estados, 456',
      unidade_saude: 'USF São José',
      profissional_responsavel: 'Dra. Marina Rocha',
      usuario_id: usuarioId,
      semanas_gestacao: 20,
      data_ultima_menstruacao: makeDate(2026, 1, 3),
      data_provavel_parto: makeDate(2026, 10, 12),
      num_gestacoes: 1,
      num_partos: 0,
      num_abortos: 0,
      estratificacao_risco: 'baixo',
      consultas: [
        { data: makeDate(2026, 3, 10), tipo: 'Pré-natal', profissional: 'Dra. Marina Rocha', peso: 58, pressao_arterial: '110/70', semana_gestacional: 10 },
        { data: makeDate(2026, 4, 14), tipo: 'Pré-natal', profissional: 'Dra. Marina Rocha', peso: 59.5, pressao_arterial: '115/75', semana_gestacional: 15 },
      ],
    },
    {
      nome: 'Fernanda Rocha Dias',
      cpf: '567.890.123-22',
      data_nascimento: makeDate(2003, 11, 15),
      telefone: '(83) 98888-0005',
      endereco: 'Rua Nova, 100',
      unidade_saude: 'USF Alto Branco',
      profissional_responsavel: 'Dr. Carlos Mendes',
      usuario_id: usuarioId,
      semanas_gestacao: 14,
      data_ultima_menstruacao: makeDate(2026, 2, 15),
      data_provavel_parto: makeDate(2026, 11, 22),
      num_gestacoes: 1,
      num_partos: 0,
      num_abortos: 0,
      estratificacao_risco: 'baixo',
      consultas: [
        { data: makeDate(2026, 3, 28), tipo: 'Primeira consulta', profissional: 'Dr. Carlos Mendes', peso: 62, pressao_arterial: '120/80', semana_gestacional: 6 },
      ],
    },

    // ── 2 Risco Intermediário ──
    {
      nome: 'Juliana Costa Lima',
      cpf: '987.654.321-00',
      data_nascimento: makeDate(1990, 7, 12),
      telefone: '(83) 98888-0003',
      endereco: 'Rua do Sol, 789',
      unidade_saude: 'USF Cristo Redentor',
      profissional_responsavel: 'Dr. Paulo Nogueira',
      usuario_id: usuarioId,
      semanas_gestacao: 28,
      data_ultima_menstruacao: makeDate(2025, 11, 8),
      data_provavel_parto: makeDate(2026, 8, 15),
      num_gestacoes: 1,
      num_partos: 0,
      num_abortos: 0,
      estratificacao_risco: 'medio',
      historico_doencas: 'Hipertensão Arterial Sistêmica',
      resumo_clinico: 'PA elevada (140/90 mmHg) em consultas consecutivas. Risco de pré-eclâmpsia.',
      consultas: [
        { data: makeDate(2026, 1, 10), tipo: 'Pré-natal', profissional: 'Dr. Paulo Nogueira', peso: 65, pressao_arterial: '130/85', semana_gestacional: 12 },
        { data: makeDate(2026, 3, 5), tipo: 'Pré-natal', profissional: 'Dr. Paulo Nogueira', peso: 67, pressao_arterial: '140/90', semana_gestacional: 20 },
        { data: makeDate(2026, 4, 20), tipo: 'Ultrassom', profissional: 'Dra. Ana Lúcia', peso: 68, pressao_arterial: '135/88', semana_gestacional: 24 },
      ],
    },
    {
      nome: 'Carolina Melo Barbosa',
      cpf: '111.222.333-44',
      data_nascimento: makeDate(1995, 4, 18),
      telefone: '(83) 98888-0006',
      endereco: 'Rua das Acácias, 200',
      unidade_saude: 'USF São José',
      profissional_responsavel: 'Dra. Marina Rocha',
      usuario_id: usuarioId,
      semanas_gestacao: 24,
      data_ultima_menstruacao: makeDate(2025, 12, 20),
      data_provavel_parto: makeDate(2026, 9, 26),
      num_gestacoes: 2,
      num_partos: 1,
      num_abortos: 0,
      estratificacao_risco: 'medio',
      historico_doencas: 'Diabetes gestacional anterior',
      resumo_clinico: 'Glicemia em jejum alterada (110 mg/dL). Acompanhamento nutricional necessário.',
      consultas: [
        { data: makeDate(2026, 2, 10), tipo: 'Pré-natal', profissional: 'Dra. Marina Rocha', peso: 72, pressao_arterial: '120/80', semana_gestacional: 10 },
        { data: makeDate(2026, 4, 5), tipo: 'Pré-natal', profissional: 'Dra. Marina Rocha', peso: 74, pressao_arterial: '125/82', semana_gestacional: 18 },
      ],
    },

    // ── 2 Alto Risco ──
    {
      nome: 'Maria da Silva Santos',
      cpf: '123.456.789-00',
      data_nascimento: makeDate(1998, 3, 10),
      telefone: '(83) 98888-0001',
      endereco: 'Rua das Flores, 123',
      unidade_saude: 'USF Alto Branco',
      profissional_responsavel: 'Dr. Carlos Mendes',
      usuario_id: usuarioId,
      semanas_gestacao: 32,
      data_ultima_menstruacao: makeDate(2025, 10, 5),
      data_provavel_parto: makeDate(2026, 7, 20),
      num_gestacoes: 2,
      num_partos: 1,
      num_abortos: 0,
      estratificacao_risco: 'alto',
      historico_doencas: 'Diabetes Mellitus tipo 2 (histórico familiar)',
      resumo_clinico: 'Diabetes Gestacional diagnosticada na 24ª semana. Glicemia em jejum elevada (126 mg/dL). Necessita acompanhamento com endocrinologista.',
      consultas: [
        { data: makeDate(2025, 12, 15), tipo: 'Primeira consulta', profissional: 'Dr. Carlos Mendes', peso: 70, pressao_arterial: '120/80', semana_gestacional: 10 },
        { data: makeDate(2026, 2, 10), tipo: 'Pré-natal', profissional: 'Dr. Carlos Mendes', peso: 71.5, pressao_arterial: '125/85', semana_gestacional: 18 },
        { data: makeDate(2026, 3, 20), tipo: 'Pré-natal', profissional: 'Dr. Carlos Mendes', peso: 72, pressao_arterial: '130/85', semana_gestacional: 24 },
        { data: makeDate(2026, 4, 25), tipo: 'Ultrassom', profissional: 'Dra. Ana Lúcia', peso: 72.5, pressao_arterial: '135/90', semana_gestacional: 28 },
      ],
    },
    {
      nome: 'Patrícia Almeida Souza',
      cpf: '456.789.123-00',
      data_nascimento: makeDate(1995, 1, 3),
      telefone: '(83) 98888-0004',
      endereco: 'Rua da Paz, 321',
      unidade_saude: 'USF Pedro Gondim',
      profissional_responsavel: 'Dr. Paulo Nogueira',
      usuario_id: usuarioId,
      semanas_gestacao: 36,
      data_ultima_menstruacao: makeDate(2025, 9, 15),
      data_provavel_parto: makeDate(2026, 6, 28),
      num_gestacoes: 1,
      num_partos: 0,
      num_abortos: 0,
      estratificacao_risco: 'alto',
      historico_doencas: 'Pré-eclâmpsia',
      resumo_clinico: 'PA: 150/100 mmHg. Proteinúria detectada. Edema progressivo e cefaleia. Necessita internação e acompanhamento de alto risco.',
      consultas: [
        { data: makeDate(2025, 12, 5), tipo: 'Primeira consulta', profissional: 'Dr. Paulo Nogueira', peso: 75, pressao_arterial: '130/85', semana_gestacional: 12 },
        { data: makeDate(2026, 2, 18), tipo: 'Pré-natal', profissional: 'Dr. Paulo Nogueira', peso: 78, pressao_arterial: '140/95', semana_gestacional: 22 },
        { data: makeDate(2026, 4, 5), tipo: 'Pré-natal', profissional: 'Dr. Paulo Nogueira', peso: 80, pressao_arterial: '150/100', semana_gestacional: 30 },
      ],
    },
  ];

  await Gestante.deleteMany({});
  await Gestante.insertMany(gestantes);
  console.log(`  ${gestantes.length} gestantes inseridas (2 por nível de risco)\n`);

  await mongoose.disconnect();
  console.log('População concluída');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
