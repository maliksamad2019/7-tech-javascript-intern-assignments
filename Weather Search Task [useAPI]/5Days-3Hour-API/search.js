/*
    Lets use weather api : https://openweathermap.org/api to create search page where user can search weather
            1. by lat, long,
            2. city,
            3. country
    - do it using es6
    - use best coding practices with minimum lines of code
    This is the task

appID:
    8b36d31e7bf1fa94363fc455c7b1dd5a // for given APIs
    b1b15e88fa797225412429c1c50c122a1 // for inspected API
*/

var appid = '8b36d31e7bf1fa94363fc455c7b1dd5a';
var countryFieldData = 'pakistan';
var cityFieldData = 'islamabad';
var geolatFieldData = 0;
var geolonFieldData = 0;


function ajaxCallToAPI(_url, templateHTML){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            templateHTML(JSON.parse(this.responseText));
    };

    xhttp.open("GET", _url);

    xhttp.send();
}




function searchByCountry() {
    let url = `https://openweathermap.org/data/2.5/find?q=${countryFieldData}&type=like&sort=population&appid=b6907d289e10d714a6e88b30761fae22`;
    console.log(url);

    let templating = (responseJson) => {
        let _htmldiv = '';
        let list = responseJson['list'];
        list.forEach((item)=> { _htmldiv += countryResultTemplating(item)});

        document.getElementById("resultOuterDiv").innerHTML = _htmldiv;
    }

    ajaxCallToAPI(url, templating);
}

function searchByCity(){
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityFieldData}&units=metric&APPID=${appid}`;
    console.log(url);

    let templating = (responseJson) => {
        console.log(responseJson);

        let _htmldiv = '';
        _htmldiv += createHtml_Forecast(responseJson);

        document.getElementById("resultOuterDiv").innerHTML = _htmldiv;
    };

    ajaxCallToAPI(url, templating);
}

function searchByGeo(){
    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${geolatFieldData}&lon=${geolonFieldData}&units=metric&appid=${appid}`;
    console.log(url);

    let templating = (responseJson) => {
        console.log(responseJson);

        let _htmldiv = '';

        _htmldiv += createHtml_Forecast(responseJson);

        document.getElementById("resultOuterDiv").innerHTML = _htmldiv;
    };

    ajaxCallToAPI(url, templating);
}





function countryResultTemplating(item){
    return `
            <div class="resultItemDiv">
                ${(item['sys']['country'])?('<h3 style="margin: 4px">'+item['name'] + ',' + item['sys']['country']+'</h3>'):''}
                <img src="http://openweathermap.org/img/wn/${item['weather'][0]['icon']}.png" width="50px" height="50x">
                <br>
                    ${(item['wind'])?('<div><b>Wind: </b>'+item['wind']['speed']+','+item['wind']['deg']+'</div>'):('')}
                ${(item['coord']['lat'] && item['coord']['lon'])?('<div><b>coords: </b>'+item['coord']['lat'] +', '+ item['coord']['lon']+'</div>'):('')}
                ${(item['main']['temp'])?('<div><b>temperature: </b>'+item['main']['temp']+'</div>'):('')}
                ${(item['main']['feels_like'])?('<div><b>feels like: </b>'+item['main']['feels_like']+'</div>'):('')}
                ${(item['main']['temp_min'])?('<div><b>temp-min: </b>'+item['main']['temp_min']+'</div>'):('')}
                ${(item['main']['temp_max'])?('<div><b>temp-max: </b>'+item['main']['temp_max']+'</div>'):('')}
                ${(item['main']['humidity'])?('<div><b>humidity: </b>'+item['main']['humidity']+'</div>'):('')}
                ${(item['main']['ground_level'])?('<div><b>ground-level: </b>'+item['main']['ground_level']+'</div>'):('')}
                ${(item['main']['sea_level'])?('<div><b>sea-level: </b>'+item['main']['sea_level']+'</div>'):('') }
            </div>
        `
}

function createHtml_Forecast(item){
    let city = item.city;
    let list = item['list'];
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let daysHtml = '';
    let prevDate = '';
    list.forEach( (item) => {
         if(prevDate == '' || !item['dt_txt'].startsWith(prevDate.split(' ')[0])){
            prevDate = item['dt_txt'];
            let _date = new Date(item['dt_txt']);
            daysHtml += `
                <td>
                    <div><b>${weekDays[_date.getDay()]}</b></div> <br>
                    <img src="http://openweathermap.org/img/wn/${item['weather'][0]['icon']}.png" width="50px" height="50x"><br>
                    
                    <b>${item['weather'][0]['description']}</b>
                    <hr>
                    <b>wind: </b>${item['wind']['speed'] + ', ' + item['wind']['deg']} <br>
                    <b>temp: </b>${item['main']['temp']} <br>
                    <b>temp-min: </b>${item['main']['temp_min']} <br>
                    <b>temp-max: </b>${item['main']['temp_max']} <br> 
                    <b>humidity:</b> ${item['main']['humidity']} <br>
                </td>`;
        }
    });


    return `
            <div class="resultItemDiv">
                <h3 style="margin: 4px">${(city['name'] && city['country'])?(''+city['name'] + ', ' + city['country']+''):('Unknown Area')}</h3>  
                ${(city['coord']['lat'])?('<div><b>coords:</b> '+city['coord']['lat'] + ' ,  ' + city['coord']['lon']+'</div>'):('')}
                ${(city['population'])?('<div><b>population:</b> '+city['population']+'</div>'):('')}
                <br>
                <table>
                    <tr>
                         ${daysHtml}
                    </tr>
                </table>
        </div>
        `
}


