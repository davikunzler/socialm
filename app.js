const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();
 
app.use(cors());
app.use(express.json());
 
const port = 3000;
app.get('/listar_usuario', (req, res) => {
    connection.query('SELECT * FROM Usuarios', (err, rows) => {
        if (err) {
            console.error('Erro ao buscar usuarios:', err);
            return res.status(500).json({ message: 'Erro ao buscar usuarios' });
        }
        res.json({ success: true, data: rows });

    });
});
 
app.post('/cadastrar', (req, res) => {
    const {nome, senha, email} = req.body
    const query = 'INSERT INTO Usuarios(nome, senha, email) VALUES(?, ?, ?)'
    if (senha.length < 8) {
        return res.status(400).send("A senha precisa ter no mínimo 8 caracteres.");
    }
    if (senha.length > 15) {
        return res.status(400).send("A senha não pode ter mais que 15 caracteres.");
    }
    connection.query(query, [nome, senha, email], (err, _result) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar usuário.'})
        }
        res.json({success: true, message: 'Usuário cadastrado com sucesso!'})
    })
})


app.put('/editar_usuario/:id', (req, res) => {
    const query = 'UPDATE Usuarios SET nome = ?, senha = ?, email = ? WHERE id_usuario = ?';
    const {id} = req.params
    const {nome, senha, email} = req.body;

    if (!nome || !senha || !email) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }
    if (senha.length < 8) {
        return res.status(400).send("A senha precisa ter no mínimo 8 caracteres.");
    }
    if (senha.length > 15) {
        return res.status(401).send("A senha não pode ter mais que 15 caracteres.");
    }
    connection.query(query, [nome, senha, email, id], (err) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao editar usuário.'})
        }
       res.json({success: true, message: 'Usuário editado com sucesso'})
    })
})
 
app.delete('/delete_usuario/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM Usuarios WHERE id_usuario = ?'
    connection.query(query, [id], (err) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar usuário.'})
        }
        res.json({success: true, message: 'Usuário deletado com sucesso!'})
    })
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body;
 
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor.'});
        }
 
        if (results.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido'})
        } else {
            res.json({ success: false, message: 'Email ou senha incorretos'})
        }
    })
})
////////////////////////
////////////////////////
/////////////////////
/////////////////////




app.get('/listar_postagens', (_req, res) => {
    const query = 'SELECT * FROM Postagens';
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao listar postagens.' });
        }
        res.json({ success: true, data: result }); // retornando também as postagens
    });
});

// Publicar uma nova postagem
app.post('/postar', (req, res) => {
    const { titulo, descricao, filtro } = req.body;
    const query = 'INSERT INTO Postagens(titulo, descricao, filtro) VALUES(?, ?, ?)';
    connection.query(query, [titulo, descricao, filtro], (err, _result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Erro ao publicar postagem.' });
        }
        res.json({ success: true, message: 'Postagem publicada com sucesso!' });
    });
});

// Editar uma postagem
app.put('/editar_postagem/:id', (req, res) => {
    const query = 'UPDATE Postagens SET titulo = ?, descricao = ?, filtro = ? WHERE id_postagem = ?';
    const { id } = req.params; // corrigido
    const { titulo, descricao, filtro } = req.body;

    connection.query(query, [titulo, descricao, filtro, id], (err) => { // corrigida a ordem dos parâmetros
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao editar postagem.' });
        }
        res.json({ success: true, message: 'Postagem editada com sucesso' });
    });
});

// Deletar uma postagem
app.delete('/delete_postagem/:id', (req, res) => {
    const { id } = req.params; // corrigido
    const query = 'DELETE FROM Postagens WHERE id_postagem = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar postagem.' });
        }
        res.json({ success: true, message: 'Postagem deletada com sucesso!' });
    });
});



















// Listar todos os comentários
app.get('/listar_comentarios', (_req, res) => {
    const query = 'SELECT * FROM Comentarios';
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao listar comentários.' });
        }
        res.json({ success: true, data: result });
    });
});app.post('/comentar', (req, res) => {
    const { conteudo } = req.body;
    
    const query = 'INSERT INTO Comentarios (conteudo) VALUES (?)';
    
    connection.query(query, [conteudo], (err, _result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Erro ao publicar comentário' });
        }
        res.json({ success: true, message: 'Comentário publicado com sucesso!' });
    });
});


// app.put('/editar_comentario/:id', (req, res) => {
//     const query = 'UPDATE comentarios SET conteudo = ? WHERE id_comentario = ?';
//     const {id} = req.params
//     const {conteudo} = req.body;
//     connection.query(query, [conteudo, id], (err) => {
//         if(err){
//             return res.status(500).json({success: false, message: 'Erro ao editar comentário.'})
//         }
//        res.json({success: true, message: 'Comentário editado com sucesso!'})
//     })
// })

// app.delete('/delete_comentario/:id', (req, res) => {
//     const {id} = req.params
//     const query = 'DELETE FROM comentarios WHERE id_comentario = ?'
//     connection.query(query, [id], (err) => {
//         if(err){
//             return res.status(500).json({success: false, message: 'Erro ao deletar comentario.'})
//         }
//         res.json({success: true, message: 'Comentário deletado com sucesso!'})
//     })
// })

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));