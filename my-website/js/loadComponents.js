function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../' : './';
}

async function loadComponent(elementId, componentPath) {
    try {
        const basePath = getBasePath();
        const response = await fetch(basePath + componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Re-initialize navigation after navbar is loaded
        if (elementId === 'navbar-container') {
            loadNavigation();
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

function initializeSharedComponents() {
    loadComponent('navbar-container', 'components/navbar.html');
}

document.addEventListener('DOMContentLoaded', initializeSharedComponents);
