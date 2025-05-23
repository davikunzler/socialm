function carregarPostagens() {
    fetch('http://localhost:3000/listar_postagens')
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById('duvidas');
            lista.innerHTML = ''; // Limpa o que tiver antes

            data.data.forEach(postagem => {
                const card = document.createElement('div');
                card.className = 'card-postagem';

                card.innerHTML = `
                    <h3>${postagem.titulo}</h3>
                    <p>${postagem.descricao}</p>
                    <span class="filtro">${postagem.filtro}</span>
                    <div class="botoes">
                        <button onclick="editar(${postagem.id_postagem})">Editar</button>
                        <button onclick="excluir(${postagem.id_postagem})">Excluir</button>
                    </div>
                `;

                lista.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar postagens:', error);
        });
}

function excluir(id_postagem) {
    fetch(`http://localhost:3000/delete_postagem/${id_postagem}`, { method: 'DELETE' })
        .then(() => carregarPostagens());
}

function editar(id_postagem) {
    const novoTitulo = prompt('Digite o novo título:');
    const novaDescricao = prompt('Digite a nova descrição:');

    if (!novoTitulo || !novaDescricao) {
        alert('Título e descrição são obrigatórios.');
        return;
    }

    // Primeiro buscamos a postagem atual para pegar o filtro antigo
    fetch(`http://localhost:3000/listar_postagens`)
        .then(response => response.json())
        .then(data => {
            const postagem = data.data.find(p => p.id_postagem === id_postagem);
            if (!postagem) {
                alert('Postagem não encontrada.');
                return;
            }

            const filtroAtual = postagem.filtro; // Mantemos o filtro original

            // Agora mandamos o update
            fetch(`http://localhost:3000/editar_postagem/${id_postagem}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo: novoTitulo,
                    descricao: novaDescricao,
                    filtro: filtroAtual // Continua o mesmo
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Postagem atualizada com sucesso!');
                    carregarPostagens();
                } else {
                    alert('Erro ao atualizar postagem.');
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar postagem:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar postagem:', error);
        });
}





function carregarPostagens() {
    fetch('http://localhost:3000/listar_postagens')
        .then(response => response.json())
        .then(responseJson => {
            const lista = document.querySelector('.duvidas');
            lista.innerHTML = '';

            responseJson.data.forEach(postagem => { // << aqui o ajuste
                const postDiv = document.createElement('div');
                postDiv.classList.add('postagem');

                postDiv.innerHTML = `
                    <h3>${postagem.titulo}</h3>
                    <p>${postagem.descricao}</p>
                    <p><strong>Filtro:</strong> ${postagem.filtro}</p>

                    <button onclick="editar(${postagem.id_postagem})" class="btn-edit">Editar</button>
                    <button onclick="excluir(${postagem.id_postagem})" class="btn-delete">Excluir</button>

                    <div class="comentario-area">
                        <textarea id="comentario-${postagem.id_postagem}" placeholder="Escreva seu comentário..."></textarea>
                        <button onclick="comentar(${postagem.id_postagem})" class="btn-comentar">Publicar Comentário</button>
                    </div>
                `;
                lista.appendChild(postDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar postagens:', error);
        });
}
async function comentar(postagemId) {
    const conteudo = document.getElementById(`comentario-${postagemId}`).value;

    try {
        const response = await fetch('http://localhost:3000/comentar', { // agora sem /:id_postagem/:id_usuario
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conteudo })
        });

        const result = await response.json();
        if (result.success) {
            alert('Comentário publicado!');
            // Aqui você poderia atualizar a lista de comentários também se quiser
        } else {
            alert('Erro ao comentar.');
        }
    } catch (error) {
        console.error(error);
        alert('Ocorreu um erro ao comentar.');
    }
}



window.onload = carregarPostagens;
