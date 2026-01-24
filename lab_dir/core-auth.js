/* LABRIOLAG AUTH ENGINE v2.5 */

// 1. O CADEADO: Protege as páginas internas
function checkAccess() {
    const session = localStorage.getItem('lab_session');
    if (!session) {
        // Se não estiver logado e não for a página de login, expulsa
        if (!window.location.href.includes('login.html')) {
            window.location.href = 'login.html';
        }
    }
}

// 2. A VALIDAÇÃO: Acionada pelo botão do login.html
async function tryLogin() {
    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('loginError');
    const btn = document.querySelector('.lab-btn');

    if(!user || !pass) return;

    btn.innerText = "CONECTANDO...";
    btn.style.opacity = "0.5";
    error.style.display = "none";

    try {
        const response = await fetch('https://labhub-auth.g-labri.workers.dev/', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pass })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('lab_session', data.token);
            localStorage.setItem('lab_role', data.role);
            window.location.href = data.target;
        } else {
            throw new Error("Acesso Negado");
        }
    } catch (err) {
        error.innerText = "IDENTIFICAÇÃO INVÁLIDA";
        error.style.display = "block";
        btn.innerText = "CONECTAR";
        btn.style.opacity = "1";
        console.error("Auth Error:", err);
    }
}/* LABRIOLAG AUTH ENGINE */

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
