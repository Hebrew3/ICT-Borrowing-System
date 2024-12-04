// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields');
    }
}

// Updated modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    // Add signup logic here
    alert('Sign up successful!');
    closeModal('signupModal');
}

// Handle forgot password form submission
function handleForgotPassword(event) {
    event.preventDefault();
    // Add forgot password logic here
    alert('Password reset link sent to your email!');
    closeModal('forgotModal');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Optional: Add form validation
document.getElementById('signupForm').addEventListener('submit', function(event) {
    const password = this.querySelector('input[type="password"]').value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        event.preventDefault();
        alert('Passwords do not match!');
    }
});

// Optional: Add password visibility toggle
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

