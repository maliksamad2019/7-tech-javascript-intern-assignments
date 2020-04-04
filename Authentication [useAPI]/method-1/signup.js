

function ajaxSignupRequest(e){
    e.preventDefault();

    var domainAdd = "http://localhost:63342/Seven%20Technologies%20%5BTasks%5D/1.Task%20method%5B1%5D/";
    // file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/

    //xmlhttp.setRequestHeader('Content-Type', "application/json-patch+json");
     
    // prepare sending data:
    var data = 'userName='+ (document.getElementById('username-field').value);
    data += '&email='+ (document.getElementById('email-field').value);
    data += '&password='+ (document.getElementById('password-field').value);
    data += '&passwordConfirmation='+ (document.getElementById('conf-password-field').value);
    data += '&dateOfBirth='+ (document.getElementById('dob-field').value); 
    data += '&firstName='+ (document.getElementById('firstName-field').value); 
    data += '&lastName='+ (document.getElementById('lastName-field').value); 
    data += '&gender='+ (document.getElementById('gender-field').value); 
    
    jsonData = {
        userName: (document.getElementById('username-field').value),
        email: (document.getElementById('email-field').value),
        password: (document.getElementById('password-field').value),
        passwordConfirmation: (document.getElementById('conf-password-field').value),
        dateOfBirth: (document.getElementById('dob-field').value),
        firstName: (document.getElementById('firstName-field').value),
        lastName: (document.getElementById('lastName-field').value),
        gender: (document.getElementById('gender-field').value)
    }

    console.log( jsonData);

 
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(this.responseText);
            
            if( myObj['success'] == true ){ 
                createCookie('userName', jsonData.userName, 1);
                createCookie('password', jsonData.password, 1);

                window.location = domainAdd+ 'profile.html';
            }
            else
                alert('Message: ' + myObj['message']);

            document.getElementById("response").innerHTML = this.responseText;
        }
    };

    xmlhttp.open("POST", 
        "http://api.d.playback.live/api/1.0/user/register",
        true);

    //xmlhttp.send(jsonData);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(jsonData));
}