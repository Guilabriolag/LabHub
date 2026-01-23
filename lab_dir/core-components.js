/**
 * LABRIOLAG CORE COMPONENTS
 * Biblioteca de Web Components reutilizáveis para o Ecossistema.
 */

// 1. Tag <lab-tv> (O Player de Sinalização Digital)
class LabTV extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        console.log("📺 Componente <lab-tv> detectado.");
    }
}
customElements.define('lab-tv', LabTV);

// 2. Tag <lab-card> (Células do Carrossel e Cards de Painel)
class LabCard extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        console.log("📦 Componente <lab-card> detectado.");
    }
}
customElements.define('lab-card', LabCard);

// 3. Tag <lab-header> (Barra de navegação unificada)
class LabHeader extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        console.log("🔝 Componente <lab-header> detectado.");
    }
}
customElements.define('lab-header', LabHeader);

// Log de inicialização do DNA
console.log("%c 🧬 DNA LABRIOLAG ATIVO ", "background: #0077B6; color: white; font-weight: bold; padding: 5px;");
