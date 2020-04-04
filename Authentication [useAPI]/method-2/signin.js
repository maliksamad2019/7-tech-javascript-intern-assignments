


function ajaxSigninRequest(e){
    e.preventDefault();

    var domainAdd = "http://localhost:51309/Seven%20Technologies%20%5BTasks%5D/1.Task%20method%5B2%5D/";
    // file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/

    // prepare sending data:
    var data = 'userName='+ (document.getElementById('username-field').value); 
    data += '&password='+ (document.getElementById('password-field').value);  
    
    jsonData = {
        userName: (document.getElementById('username-field').value), 
        password: (document.getElementById('password-field').value) 
    }
 
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);
            
            if( myObj['success'] + '' == 'true' ){ 
                createCookie('userName', jsonData.userName, 1);
                createCookie('password', jsonData.password,1);
                createCookie('token', myObj['data']['token'],1);
                
                console.log(getCookie('userName') + " : " + jsonData.userName +"\n"+ getCookie('password') + " : " + jsonData.password);

                window.location = domainAdd+'profile.html';
            }
            else
                alert('Message: ' + myObj['message']);

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

  