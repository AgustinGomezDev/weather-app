window.addEventListener('load', () => { // Wait for the page to load
    let long; // Longitude
    let lat; // Latitude

    // DOM ELEMENTS
    const country = document.getElementById('country');
    const region = document.getElementById('region');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const currentDate = document.getElementById('current-date');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const feelsLike = document.getElementById('feels-like');
    const icon = document.getElementById('container-icon');

    // CURRENT DATE
    const date = new Date();
    let day = date.getDate();
    let dayText = date.getDay();
    let month = date.getMonth();

    switch(dayText) { // Get the day of the week
        case 0: dayText = 'Sunday'; break;
        case 1: dayText = 'Monday'; break;   
        case 2: dayText = 'Tuesday'; break;
        case 3: dayText = 'Wednesday'; break; 
        case 4: dayText = 'Thursday'; break;
        case 5: dayText = 'Friday'; break;
        case 6: dayText = 'Saturday'; break;
    }

    switch(month) { // Get the month
        case 0: month = 'January'; break;
        case 1: month = 'February'; break;
        case 2: month = 'March'; break;
        case 3: month = 'April'; break;
        case 4: month = 'May'; break;
        case 5: month = 'June'; break;
        case 6: month = 'July'; break;
        case 7: month = 'August'; break;
        case 8: month = 'September'; break;
        case 9: month = 'October'; break;
        case 10: month = 'November'; break;
        case 11: month = 'December'; break;
    }

    if(navigator.geolocation){ // Check if the browser supports geolocation
        navigator.geolocation.getCurrentPosition(position =>{ // getCurrentPosition() is a method of the navigator object
            long = position.coords.longitude; // Get the longitude
            lat = position.coords.latitude; // Get the latitude
            const api = `https://api.weatherapi.com/v1/current.json?key=9b2b5680c6d24657b9e195458220906&q=${lat},${long}&aqi=no`; // API URL
            
            fetch(api) // fetching the data from the api
                .then(response => { // response is the response from the api
                    return response.json(); // return the response as json
                })
                .then(data => { // data is the json data
                    country.textContent = data.location.country + ',';
                    region.textContent = data.location.region;
                    temperature.textContent = data.current.temp_c;
                    description.textContent = data.current.condition.text;
                    currentDate.textContent = dayText + ', ' + day + ' ' + month;
                    humidity.textContent = data.current.humidity + '%';
                    wind.textContent = data.current.wind_kph + ' km/h';
                    feelsLike.textContent = data.current.feelslike_c;
                    let currentCondition = data.current.condition.code;
                    let isDay = data.current.is_day;
                    
                    temperature.addEventListener('click', () => { // Change the temperature to fahrenheit or celsius
                        if(temperature.textContent == data.current.temp_c) {
                            temperature.textContent = data.current.temp_f;
                        }else{
                            temperature.textContent = data.current.temp_c;
                        }
                    });

                    switch(currentCondition) { // Get the weather icon
                        case 1000: // Sunny / Clear
                            if(isDay) {
                                icon.innerHTML = '<img class="icon" src="icons/sun/sunny.png" alt="Sunny">';
                            } else{
                                icon.innerHTML = '<img class="icon" src="icons/moon/clear.png" alt="Clear">';
                            }
                            break;

                        case 1003: // Partly cloudy
                        case 1006:
                        case 1009:
                        case 1030:
                            if(isDay) {
                                icon.innerHTML = '<img class="icon" src="icons/sun/sun+cloud.png" alt="Partly Cloudy">';
                            }else{
                                icon.innerHTML = '<img class="icon" src="icons/moon/moon+cloud.png" alt="Partly Cloudy">';
                            }  
                            break;

                        case 1063: // Rain
                        case 1150:
                        case 1153:
                        case 1180:
                        case 1183:
                        case 1186:
                        case 1189:
                        case 1192:
                        case 1195:
                        case 1240:
                        case 1243:
                        case 1246:
                            if(isDay) {
                                icon.innerHTML = '<img class="icon" src="icons/sun/sun+rain.png" alt="Rain">';
                            }else{
                                icon.innerHTML = '<img class="icon" src="icons/moon/moon+rain.png" alt="Rain">';
                            }
                            break;

                        case 1066: // Snow
                        case 1072:
                        case 1168:
                        case 1171:
                        case 1210:
                        case 1213:
                        case 1216:
                        case 1219:
                        case 1222:
                        case 1225:
                        case 1258:
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+snow.png" alt="Snow">';
                            break;

                        case 1087: // Lighting
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+lighting.png" alt="Lighting">';
                            break;

                        case 1127: // Lighting with snow
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+lighting+snow.png" alt="Lighting with snow">';
                            break;

                        case 1135: // Fog
                        case 1249:
                            if(isDay) {
                                icon.innerHTML = '<img class="icon" src="icons/sun/sun+fog.png" alt="Fog">';
                            }else{
                                icon.innerHTML = '<img class="icon" src="icons/moon/moon+fog.png" alt="Fog">';
                            }
                            break;

                        case 1147: // Fog with snow
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+snow2.png" alt="Fog with snow">'; 
                            break;

                        case 1069: // Rain with snow
                        case 1198:
                        case 1201:
                        case 1204:
                        case 1207:
                        case 1237:
                        case 1249:
                        case 1252:
                        case 1261:
                        case 1264:
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+snow+rain.png" alt="Rain with snow">';
                            break;

                        case 1273: // Rain with thunder
                        case 1276:
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+rain+lighting.png" alt="Rain with thunder">';
                            break;

                        case 1279: // Rain with snow and thunder
                        case 1282:
                            icon.innerHTML = '<img class="icon" src="icons/cloud/cloud+snow+lighting.png" alt="Rain with snow and thunder">';
                            break;

                        default: // Default icon
                            icon.innerHTML = `<img class="icon" src="${data.current.condition.icon}" alt="${data.current.condition.text}">`;
                            break;
                    }
                });
        });  
    }
});