const pool = require('../config/db');

async function inserir(nome, email) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  );
  return { id: resultado.insertId, nome, email };
}

async function listar() {
  const [linhas] = await pool.query('SELECT * FROM usuarios');
  return linhas;
}

async function atualizar(id, nome, email) {
  const [resultado] = await pool.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );
  return resultado.affectedRows > 0;
}

async function remover(id) {
  const [resultado] = await pool.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id]
  );
  return resultado.affectedRows > 0;
}

module.exports = { inserir, listar, atualizar, remover };
