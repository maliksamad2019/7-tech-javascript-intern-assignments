
function LogOut(){

    createCookie('userName', 'none', 0);
    createCookie('password', 'none', 0);
    getThisUserData();
}

// function getThisUserData(){ 
  
//     // prepare sending data:
//     var data = 'userName='+ (document.getElementById('username-field').value); 
//     data += '&password='+ (document.getElementById('password-field').value);  
    
//     jsonData = {
//         userName: (document.getElementById('username-field').value), 
//         password: (document.getElementById('password-field' q ).value)
//     }
 
//     var xmlhttp = new XMLHttpRequest();

//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var myObj = JSON.parse(this.responseText);
//             console.log(this.responseText);
            
//             if( myObj['success'] == true ){ 
//                 createCookie('userName', jsonData.userName, 1);
//                 createCookie('password', jsonData.password, 1);
//                 alert(getCookie('userName') + " : " + jsonData.userName +"\n"+ getCookie('password') + " : " + jsonData.password);

//                 window.location = 'file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/profile.html'; 
//             }
//             else
//             window.location = 'file:///C:/Users/AK-MASK/Desktop/Seven%20Technologies%20[Tasks]/1.%20Task/signin.html'; 

//             document.getElementById("response").innerHTML = this.responseText;
//         }
//     };

//     xmlhttp.open("POST", 
//         "http://api.d.playback.live/api/1.0/user/login",
//         true);
 
//     xmlhttp.setRequestHeader("Content-Type", 
//                         "application/json;charset=UTF-8");

//     xmlhttp.send(JSON.stringify(jsonData));
// } 

  