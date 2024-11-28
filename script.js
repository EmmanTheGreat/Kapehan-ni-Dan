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
        alert(`Sign up Successful! You can now log in ${userData.name}.`);
        signUpForm.reset();

        // Automatically switch to the login form
        container.classList.remove("active");
    }
});

// Sign In Functionality
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('signInEmail').value; // Get entered email
    const password = document.getElementById('signInPassword').value; // Get entered password
    const role = document.getElementById('userRole').value; // Get selected role

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem(email);

    if (!storedUserData) {
        alert("No account found with this email. Please sign up.");
        return; // Exit function early if no user data
    } 

    const userData = JSON.parse(storedUserData);

    if (userData.password !== password) {
        alert("Incorrect password. Please try again.");
        return; // Exit function early if password is incorrect
    }

    // Password is correct, now handle role-based validation
    if (role === 'admin') {
        if (email === 'admin1@gmail.com' && password === 'admin123') {
            window.location.href = 'admin.html'; // Redirect to admin page
            return; // Prevent further code execution
        } else {
            alert("Invalid credentials for the selected role.");
            return; // Exit function early if role is invalid
        }
    } else if (role === 'customer') {
        window.location.href = 'index2.html'; // Redirect to customer page
        return; // Prevent further code execution
    } else {
        alert("Invalid credentials for the selected role.");
        return; // Exit function early if role is invalid
    }

    // If role and password are correct, show welcome message
    alert(`Welcome to Kapehan ni Dan, ${userData.name}!`);

    // Reset the form only if no redirection has happened
    signInForm.reset();
});



