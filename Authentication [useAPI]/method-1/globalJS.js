
/*
    this function redirects user... according to authentication state
    if not signed in:
        1. can't access dashboard page [profile.html]
   if signed in:
        1. can't access sign-in page [signin.html]
        2. can't access Register page [signup.html]
 */
function getThisUserData(){ 
    var domainAdd = "http://localhost:63342/Seven%20Technologies%20%5BTasks%5D/1.Task%20method%5B1%5D/";
    // file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/

    // prepare sending data:
    var data = 'userName='+ (getCookie('userName')); 
    data += '&password='+ (getCookie('password'));  
    
    jsonData = {
        userName: (getCookie('userName')), 
        password: (getCookie('password')) 
    }

    console.log(jsonData);
    
 
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(this.responseText);
            
            if( myObj['success'] == true ){ 
                createCookie('userName', jsonData.userName, 1);
                createCookie('password', jsonData.password, 1);
                // alert(getCookie('userName') + " : " + jsonData.userName +"\n"+ getCookie('password') + " : " + jsonData.password);

                if(window.location != domainAdd+'profile.html')
                    window.location = domainAdd+'profile.html';
            }
            else if(window.location != domainAdd+'signin.html')
                window.location = domainAdd+'signin.html'; 

            document.getElementById("response").innerHTML = this.responseText;
        }
    };

    xmlhttp.open("POST", 
        "http://api.d.playback.live/api/1.0/user/login",
        true);
 
    xmlhttp.setRequestHeader("Content-Type", 
                        "application/json;charset=UTF-8");

    xmlhttp.send(JSON.stringify(jsonData));
} 

function createCookie(name, value, days) {
    var expires;
    console.log('setting Cookeis: ' + name + "=" + value);
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


 