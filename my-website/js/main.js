document.addEventListener('DOMContentLoaded', function() {
    // Insert the header navigation
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png" alt="SL Benfica Logo" class="logo">
            <h1>Sport Lisboa e Benfica</h1>
            <div class="nav-links">
                <a href="index.html">Início</a>
                <a href="historia.html">História</a>
                <a href="galeria-jogadores.html">Jogadores</a>
                <a href="estadio.html">Estádio</a>
                <a href="contactos.html">Contactos</a>
            </div>
        `;
    }
    
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active-link');
        }
    });
});