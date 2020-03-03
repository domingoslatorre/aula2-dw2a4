const express = require('express');

const app = express();
app.use(express.json())

const usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
]

//get, post, put, delete, patch
//localhost:3000/
app.get('/', function(req, res) {
    res.send('Olá mundo');
});

// GET /usuarios - todos os usuários
app.get('/usuarios', function(req, res) {
    res.status(200).json(usuarios);
});

// POST /usuarios - criar um novo usuário
app.post('/usuarios', function(req, res) {
    const usuario = {
        id: req.body.id,
        nome: req.body.nome
    }
    usuarios.push(usuario)
    res.status(201).json(usuario);
});

const usuarioExiste = function(req, res, next) {
    const usuario = usuarios.find(u => u.id == req.params.id);
    if(!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    req.usuario = usuario;
    next();
}

// GET /usuarios/:id - devolve um usuário específico
app.get('/usuarios/:id', usuarioExiste, function(req, res) {
    return res.status(200).json(req.usuario);
})

// PUT /usuarios/:id - alterar os dados de um usuário
app.put('/usuarios/:id', usuarioExiste, function(req, res) {
    req.usuario.nome = req.body.nome;
    return res.status(200).json(req.usuario);
})

// DELETE /usuarios/:id - delete um usuário
app.delete('/usuarios/:id', usuarioExiste, function(req, res) {
    const index = usuarios.indexOf(req.usuario);
    usuarios.splice(index, 1);
    res.status(204).end();
})

app.listen(3000, function() {
    console.log('Rodando na porta 3000');
});