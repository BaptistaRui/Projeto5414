/**
 * Benfica Website Authentication
 * Basic user authentication system
 */


/**
 * Initialize authentication functionality
 */
function initAuth() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle logout button clicks
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'logout-btn') {
            handleLogout();
        }
    });
}

/**
 * Check if user is logged in and update UI accordingly
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('benficaLoggedIn') === 'true';
    const userEmail = localStorage.getItem('benficaUserEmail');
    
    // Update navigation
    updateNavForAuth(isLoggedIn, userEmail);
}

/**
 * Update navigation for authenticated/unauthenticated users
 */
function updateNavForAuth(isLoggedIn, userEmail) {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) {
        console.error('Navigation container not found. Authentication UI could not be added.');
        return;
    }
    
    // Remove existing auth element if it exists
    const existingAuthElement = document.getElementById('auth-element');
    if (existingAuthElement) {
        existingAuthElement.remove();
    }
    
    // Create new auth element
    const authElement = document.createElement('div');
    authElement.id = 'auth-element';
    authElement.className = 'ms-3 d-flex align-items-center';
    
    if (isLoggedIn) {
        // Show user info and logout button
        authElement.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-sm btn-light dropdown-toggle" type="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle me-1" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    ${userEmail.split('@')[0]}
                </button>
                <ul class="dropdown-menu" aria-labelledby="user-dropdown">
                    <li><a class="dropdown-item" href="#">Meu Perfil</a></li>
                    <li><a class="dropdown-item" href="#">Minhas Encomendas</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" id="logout-btn">Sair</a></li>
                </ul>
            </div>
        `;
    } else {
        // Show login button
        authElement.innerHTML = `
            <a href="login.html" class="btn btn-sm btn-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right me-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                Login
            </a>
        `;
    }
    
    // Add the auth element to the navigation
    navContainer.appendChild(authElement);
}

/**
 * Handle login form submission
 */
function handleLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('remember-me').checked;
    const errorEl = document.getElementById('login-error');
    
    // Hide any previous error
    errorEl.classList.add('d-none');
    
    // Simple validation - for demo purposes
    // In a real app, this would validate against a server
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Demo credentials (this would come from a server in a real app)
    const validEmail = "benfica@exemplo.com";
    const validPassword = "admin123";
    
    if (email === validEmail && password === validPassword) {
        // Store login state
        localStorage.setItem('benficaLoggedIn', 'true');
        localStorage.setItem('benficaUserEmail', email);
        
        // Redirect to homepage
        window.location.href = "index.html";
    } else {
        // Show error
        errorEl.classList.remove('d-none');
        passwordInput.value = '';
    }
}

/**
 * Handle logout button clicks
 */
function handleLogout() {
    // Clear login state
    localStorage.removeItem('benficaLoggedIn');
    localStorage.removeItem('benficaUserEmail');
    
    // Update UI
    updateNavForAuth(false);
    
    // Redirect to homepage if not already there
    if (window.location.pathname.indexOf('index.html') === -1) {
        window.location.href = "index.html";
    } else {
        // Just refresh the current page
        window.location.reload();
    }
}