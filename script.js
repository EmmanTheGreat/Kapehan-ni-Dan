const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signInButton = document.getElementById('signInButton'); // Select the Sign In button in the form

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Redirect to index.html when the Sign In button in the form is clicked
signInButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    window.location.href = "index.html";
});


//sample validation
/*function fun(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email == 'user@gmail.com' && password == '12345'){
        alert('Login Sucessful!')
        window.location.assign('index.html')
    }
    else{
        alert('Invalid entry')
    }
}*/