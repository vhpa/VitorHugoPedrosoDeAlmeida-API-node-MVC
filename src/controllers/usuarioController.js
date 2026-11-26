const usuarioModel = require('../models/usuarioModel');

async function criar(req, res) {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }

    const usuario = await usuarioModel.inserir(nome, email);
    return res.status(201).json(usuario);
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Já existe um usuário com este email.' });
    }
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao inserir usuário.' });
  }
}

async function listar(req, res) {
  try {
    const usuarios = await usuarioModel.listar();
    return res.status(200).json(usuarios);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao listar usuários.' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }

    const atualizado = await usuarioModel.atualizar(id, nome, email);

    if (!atualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ id: Number(id), nome, email });
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Já existe um usuário com este email.' });
    }
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;

    const removido = await usuarioModel.remover(id);

    if (!removido) {
      return res.status(404).json({ erro: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao remover usuário.' });
  }
}

module.exports = { criar, listar, atualizar, remover };
