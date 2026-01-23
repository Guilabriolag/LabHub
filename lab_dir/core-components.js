// lab_dir/core-components.js

// 1. Simulação do Banco de Dados (Depois isso vem da Cloudflare)
const mockDB = {
    tv_slides: [
        { h1: "LABSOCIAL", sub: "MARKETING DIGITAL", extra: "OFERTA ATIVA" },
        { h1: "LABMENU", sub: "PIZZARIA VITORELLI", extra: "PEÇA AGORA" }
    ],
    config: {
        primaryColor: "#0077B6"
    }
};

// 2. Definição do Componente <lab-card>
class LabCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'LAB_ITEM';
        const status = this.getAttribute('status') || 'ONLINE';
        
        this.innerHTML = `
            <div class="lab-glass" style="padding: 20px; margin: 10px; min-width: 200px; text-align: center;">
                <span style="font-size: 9px; color: #00ff00;">● ${status}</span>
                <h3 class="lab-title" style="margin: 10px 0; font-size: 1.2rem;">${title}</h3>
                <slot></slot>
            </div>
        `;
    }
}

// 3. Registro das Tags
customElements.define('lab-card', LabCard);

console.log("🧬 DNA Labriolag: Componentes Carregados.");
