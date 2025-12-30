if(localStorage.getItem('userLogged')){
    window.location.href = "../view/dashboard.html";
}
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    const user_info = JSON.parse(localStorage.getItem('user_info')) 
    const user = user_info.find(u => u.username === username && u.password === password);

    if(user){
        localStorage.setItem('userLogged', user.username)
        window.location.href = "../view/dashboard.html";
    }
    else{
        message.innerHTML = '<p style="color: blue">Invalid username or password</p>'
    }
}