if (localStorage.getItem('userLogged')) {
    window.location.href = "../public/dashboard.html";
}
function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('message');

    if (!username || !password) {
        messageDiv.innerHTML = '<p class="error">Please fill in all fields.</p>';
        return;
    }

    const user_info = JSON.parse(localStorage.getItem('user_info')) || [];

    if (user_info.some(u => u.username === username)) {
        messageDiv.innerHTML = '<p class="error">Username already exists.</p>';
        return;
    }

    // Add new user
    user_info.push({ username, password });
    localStorage.setItem('user_info', JSON.stringify(user_info));
    messageDiv.innerHTML = '<p style = "color: green; font-weight: bold;" class="success">Registration successful! <a href="login.html">Login now</a></p>';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}