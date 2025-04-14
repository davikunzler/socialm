const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Rota para cadastrar Morador
app.post('/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao salvar usuário no banco:', err);
            return res.status(500).send({ message: 'Erro ao cadastrar o usuário.' });
        }
        res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
    });
});

// Rota para cadastrar Veículo
app.post('/cadastrar-duvida', (req, res) => {
    const { placa, modelo, cor, morador_id, box } = req.body;

    if (!placa || !modelo || !cor || !morador_id || !box) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    const query = 'INSERT INTO veiculos (placa, modelo, cor, morador_id, box) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [placa, modelo, cor, morador_id, box], (err, result) => {
        if (err) {
            console.error('Erro ao salvar veículo no banco:', err);
            return res.status(500).send({ message: 'Erro ao cadastrar o veículo.' });
        }
        res.status(201).send({ message: 'Veículo cadastrado com sucesso!' });
    });
});

// Inicia o servidor
app.listen(3001, () => console.log('Servidor rodando na porta 3001'));