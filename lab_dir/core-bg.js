/* LABRIOLAG GLOBAL BACKGROUND ENGINE v2.1 */
function initLabBackground() {
    // Evita duplicados
    if (document.getElementById('globalCanvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'globalCanvas';
    // Estilo forçado para garantir visibilidade
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1'; 
    canvas.style.background = '#000000';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let nodes = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Criar pontos (ajustado para melhor visibilidade)
    for (let i = 0; i < 60; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            radius: 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0077B6'; // Azul Labriola

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;

            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
    console.log("LABRIOLAG Background Engine: Ativo");
}

// Inicialização robusta
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLabBackground);
} else {
    initLabBackground();
}
