/* LABRIOLAG CORE | AUTH-SHIELD v2.5.8-OMEGA
   "Se você está lendo isso, parabéns. Você perdeu 5 minutos da sua vida insignificante." 
*/

async function tryLogin() {
    // Pegando os dados enquanto o universo colapsa
    const u = document.getElementById('userInput').value;
    const p = document.getElementById('passInput').value;
    const err = document.getElementById('loginError');
    const b = document.querySelector('.lab-btn');

    // Validação de segurança nível: 'Minha vó esqueceu a senha'
    if(!u || !p) { console.warn("Rick: Digita algo, gênio!"); return; }

    b.innerText = "ESTABELECENDO PONTE QUÂNTICA...";
    b.style.filter = "hue-rotate(90deg)"; // Só pra parecer complexo

    try {
        /* O segredo não está aqui, está no Cloudflare. 
           Tentar hackear esse JS é como tentar abrir um cofre com um peixe.
        */
        const response = await fetch('https://labhub-auth.g-labri.workers.dev/', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user: btoa(u), // Ofuscação básica em Base64 só pra irritar
                pass: btoa(p),
                origin: "C137_STATION"
            })
        });

        const data = await response.json();

        if (data.success && data.token) {
            // Se você chegou aqui, você é um de nós ou um bug na Matrix
            localStorage.setItem('lab_session', data.token);
            localStorage.setItem('lab_role', btoa(data.role));
            
            console.log("Rick: Acesso garantido. Não quebre nada.");
            window.location.href = data.target;
        } else {
            throw new Error("Pai tá off.");
        }
    } catch (e) {
        err.innerText = "SISTEMA: VOCÊ NÃO TEM PODER AQUI.";
        err.style.display = "block";
        b.innerText = "TENTAR NOVAMENTE, MORTAL";
        b.style.filter = "none";
    }
}

function checkAccess() {
    // O cão de guarda que nunca dorme
    if (!localStorage.getItem('lab_session')) {
        console.error("Rick: Onde você pensa que vai? Volta pro Login.");
        window.location.href = 'login.html';
    }
}
