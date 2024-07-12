const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    validateForm();
});

function validateForm() {
    // Validate Username
    if (username.value.trim() === '') {
        setError(username, 'Username is required');
    } else if (username.value.trim().length < 3) {
        setError(username, 'Username must be at least 3 characters');
    } else {
        setSuccess(username);
    }
    
    // Validate Email
    if (email.value.trim() === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Email is not valid');
    } else {
        setSuccess(email);
    }
    
    // Validate Password
    validatePassword();
    
    // Validate Confirm Password
    if (confirmPassword.value.trim() === '') {
        setError(confirmPassword, 'Confirm Password is required');
    } else if (confirmPassword.value.trim() !== password.value.trim()) {
        setError(confirmPassword, 'Passwords do not match');
    } else {
        setSuccess(confirmPassword);
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();
    
    // Regular expressions for weak and strong passwords
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const weakPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    if (strongPasswordRegex.test(passwordValue)) {
        setSuccess(password);
        passwordError.innerText = 'Password is strong.';
        passwordError.style.color = 'green';
        passwordError.style.display = 'block';
    } else if (weakPasswordRegex.test(passwordValue)) {
        setError(password, 'Password is weak. Try including special characters.');
    } else {
        setError(password, 'Password is very weak. It should be at least 6 characters long and include uppercase, lowercase, and numbers.');
    }
}

function setError(element, message) {
    const formGroup = element.parentElement;
    const small = formGroup.querySelector('small');
    small.innerText = message;
    small.style.display = 'block';
    element.classList.add('error');
}

function setSuccess(element) {
    const formGroup = element.parentElement;
    const small = formGroup.querySelector('small');
    small.innerText = '';
    small.style.display = 'none';
    element.classList.remove('error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
