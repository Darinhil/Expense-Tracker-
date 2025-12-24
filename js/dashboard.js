// logout
if(!localStorage.getItem('userLogged')){
    window.location.href = "../pages/login.html"
}
function logout(){
    localStorage.removeItem('userLogged');
    window.location.href = "../pages/login.html"
}
// 