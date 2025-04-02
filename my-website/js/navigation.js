const pages = {
    'home': {
        title: 'Home',
        path: 'index.html'
    },
    'about': {
        title: 'About',
        path: 'about.html'
    },
    'story': {
        title: 'Story',
        path: 'story.html'
    },
    'contact': {
        title: 'Contact',
        path: 'contact.html'
    }
};

function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : './';
}

function getPagePath(pagePath) {
    const basePath = getBasePath();
    if (pagePath === 'index.html') {
        return basePath + pagePath;
    }
    return basePath + 'pages/' + pagePath;
}

function loadNavigation() {
    const navList = document.querySelector('.navbar-nav');
    if (!navList) return;
    
    navList.innerHTML = '';
    
    Object.entries(pages).forEach(([key, page]) => {
        const currentPath = window.location.pathname;
        const isActive = (currentPath.endsWith(page.path) || 
                         (currentPath.endsWith('/') && page.path === 'index.html'));
        
        navList.innerHTML += `
            <li class="nav-item">
                <a class="nav-link ${isActive ? 'active' : ''}" 
                   href="${getPagePath(page.path)}">${page.title}</a>
            </li>
        `;
    });
}

document.addEventListener('DOMContentLoaded', loadNavigation);
