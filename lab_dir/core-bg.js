/* LABRIOLAG GLOBAL BACKGROUND ENGINE */
function initLabBackground() {
    // Insere o canvas automaticamente no início do body
    const canvas = document.createElement('canvas');
    canvas.id = 'globalCanvas';
    canvas.style = "display: block; position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none; background: #000;";
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); 
    resize();

    let nodes = [];
    const nodeCount = window.innerWidth < 768 ? 30 : 60; // Menos átomos no celular para poupar bateria

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({ 
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height, 
            vx: (Math.random() - 0.5) * 0.8, 
            vy: (Math.random() - 0.5) * 0.8, 
            radius: 1.5 
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0077B6'; // Azul Labriola
        
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// Inicia automaticamente ao carregar o script
window.addEventListener('DOMContentLoaded', initLabBackground);
