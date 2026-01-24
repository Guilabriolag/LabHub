/* LABRIOLAG AUTH ENGINE */

// FUNÇÃO 1: O Cadeado (Para colocar no topo do dev-master.html)
function checkAccess() {
    if (!localStorage.getItem('lab_session')) {
        window.location.href = 'login.html';
    }
}

// FUNÇÃO 2: A Validação (O que o botão Conectar chama)
async function tryLogin() {
    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('loginError');
    const btn = document.querySelector('.lab-btn');

    btn.innerText = "VALIDANDO...";
    btn.style.opacity = "0.5";

    try {
        const response = await fetch('https://labhub-auth.g-labri.workers.dev/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pass })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('lab_session', data.token);
            localStorage.setItem('lab_role', data.role);
            window.location.href = data.target;
        } else {
            error.style.display = "block";
            btn.innerText = "CONECTAR";
            btn.style.opacity = "1";
        }
    } catch (err) {
        error.innerText = "Erro de conexão com o Core.";
        error.style.display = "block";
        btn.innerText = "CONECTAR";
        btn.style.opacity = "1";
    }
}
