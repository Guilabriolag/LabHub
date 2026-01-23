/**
 * LABRIOLAG | CORE ENGINE v1.0
 * Gerenciador de Ecossistema, Rotas e Componentes
 */

// 1. CONFIGURAÇÕES GLOBAIS (Simulação de Banco de Dados KV)
const LabCore = {
    config: {
        maintenance: true,           // Se true, vai para manutenc.html após splash
        splash_duration: 4000,       // Tempo do splash em milissegundos
        primary_color: '#0077B6',    // Cor DNA
        target_live: './dashboard.html',
        target_maint: './manutenc.html'
    },

    // Inicia a lógica de redirecionamento (Usado na index.html)
    initSplash: function() {
        console.log("🧬 LabCore: Iniciando sequência de Splash...");
        setTimeout(() => {
            const destination = this.config.maintenance ? this.config.target_maint : this.config.target_live;
            window.location.href = destination;
        }, this.config.splash_duration);
    },

    // Ajusta a interface se estiver dentro de um Iframe (Módulos do Painel)
    setupIframeBehavior: function() {
        if (window.self !== window.top) {
            // Estamos dentro do Painel Dev
            document.body.classList.add('in-iframe');
            // Remove o fundo pesado para não sobrecarregar a GPU
            document.body.style.background = "rgba(0,0,0,0.1)"; 
            
            // Garante que links internos não "quebrem" o frame
            document.querySelectorAll('a').forEach(link => {
                if (!link.target) link.target = "_self";
            });
        }
    }
};

// 2. WEB COMPONENTS (Definição das Tags Customizadas)
class LabTV extends HTMLElement { connectedCallback() { this.innerHTML = `<div class="lab-tv-status">📺 LabTV Ready</div>`; } }
class LabCard extends HTMLElement { connectedCallback() { } }
class LabHeader extends HTMLElement { connectedCallback() { } }

customElements.define('lab-tv', LabTV);
customElements.define('lab-card', LabCard);
customElements.define('lab-header', LabHeader);

// 3. INICIALIZAÇÃO AUTOMÁTICA
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar Cor DNA globalmente via CSS Variables
    document.documentElement.style.setProperty('--azul-lab', LabCore.config.primary_color);
    
    // Executa comportamento de Iframe
    LabCore.setupIframeBehavior();

    // Se estiver na index.html, inicia o splash automaticamente
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        LabCore.initSplash();
    }
});

console.log("%c 🧬 LABRIOLAG CORE ACTIVE ", "background: #0077B6; color: white; font-weight: bold; border-radius: 4px; padding: 2px 10px;");
