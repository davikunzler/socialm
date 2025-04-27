document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ nome, senha })
      });
  
      const data = await response.json();
      if (data.sucess) { // (tava escrito errado no back: "sucess", não "success")
        alert('Login realizado!');
        window.location.href = 'home.html';
      } else {
        alert('Nome ou senha inválidos');
      }
    } catch (error) {
      alert('Erro de conexão.');
    }
  });
  