//ARMAZENAMENTO LOCAL TEMPORÁRIO
// Os arquivos são salvos na pasta uploads/ do servidor.
// Por enquanto funciona para desenvolvimento e testes.

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde os arquivos ficam salvos
  },
  filename: (req, file, cb) => {
    // nome do arquivo: timestamp + nome original
    const nomeUnico = `${Date.now()}-${file.originalname}`;
    cb(null, nomeUnico);
  }
});


const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png'];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use PDF, JPG ou PNG'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // limite de 10MB
  }
});

module.exports = upload;