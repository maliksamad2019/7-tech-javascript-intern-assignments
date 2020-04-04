
function getThisUserData(){ 
    var domainAdd = "http://localhost:51309/Seven%20Technologies%20%5BTasks%5D/1.Task%20method%5B2%5D/";
    // file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200)
            {
                document.getElementById("response").innerHTML = this.responseText;
                if(window.location != domainAdd+'profile.html' )
                {
                    console.log(domainAdd+'profile.html');
                    window.location = domainAdd+'profile.html';
                }
            }
            else if(window.location == domainAdd+'profile.html' )
                window.location = domainAdd+'signin.html';
        }
    };

    xmlhttp.open("GET",
        "http://api.d.playback.live/api/1.0/user/is-authenticated",
        true);

    var token = getCookie('token');

    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);

    xmlhttp.send();
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


 