
function LogOut(){

    createCookie('userName', 'none', 1);
    createCookie('password', 'none', 1);
    createCookie('token', 'none', 1);
    getThisUserData();
}

  