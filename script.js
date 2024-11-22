const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInButton = document.getElementById('signInButton');

// Toggle between login and register forms
registerBtn.addEventListener('click', () => container.classList.add("active"));
loginBtn.addEventListener('click', () => container.classList.remove("active"));

// Sign Up Functionality
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();

    // Input validation
    if (!name || !email || !password) {
        alert("All fields are required for registration.");
        return;
    }

    // Check if account already exists
    if (localStorage.getItem(email)) {
        alert("An account with this email already exists. Please log in.");
    } else {
        // Save user data in localStorage
        const userData = { name, password };
        localStorage.setItem(email, JSON.stringify(userData));
        alert("Sign up Successful! You can now log in.");
        signUpForm.reset();
    }
});

// Sign In Functionality
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();

    if (!email || !password) {
        alert("Both email and password are required to log in.");
        return;
    }

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem(email);

    if (!storedUserData) {
        alert("No account found with this email. Please sign up.");
    } else {
        const userData = JSON.parse(storedUserData);
        if (userData.password === password) {
            alert(`Welcome to Kapehan ni Dan, ${userData.name}!`);
            signInForm.reset();
            window.location.href = "index2.html"; // Redirect after successful login
        } else {
            alert("Incorrect password. Please try again.");
        }
    }
});
