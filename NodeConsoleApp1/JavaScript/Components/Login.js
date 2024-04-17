// Function to authenticate user
function authenticate(username, password) {
    fetch(`https://localhost:7094/Accounts/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            // Redirect to clients.html if authentication succeeds
            window.location.href = 'clients.html';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Create login window elements
const loginContainer = document.createElement('div');
loginContainer.classList.add('login-container');

const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.placeholder = 'Username';

const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.placeholder = 'Password';

const loginButton = document.createElement('button');
loginButton.textContent = 'Login';

// Create create account button
//const createAccountButton = document.createElement('button');
//createAccountButton.textContent = 'Create Account';

// Append elements to the login container
loginContainer.appendChild(usernameInput);
loginContainer.appendChild(passwordInput);
loginContainer.appendChild(loginButton);
/*loginContainer.appendChild(createAccountButton);*/

// Append login container to the body
document.body.appendChild(loginContainer);

// Event listener for login button click
loginButton.addEventListener('click', function () {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (username && password) {
        authenticate(username, password);
    } else {
        alert('Please enter username and password');
    }
});

// Event listener for create account button click
//createAccountButton.addEventListener('click', function () {
//    // Redirect to createaccount.html
//    window.location.href = 'createaccount.html';
//});
