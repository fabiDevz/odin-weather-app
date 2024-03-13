


const btnBusqueda = document.getElementById('btnBusqueda');

btnBusqueda.addEventListener('click', () => {
    let ubicacion = document.getElementById('search-bar').value;

    getDataWeather(ubicacion);


});

async function getDataWeather(ubicacion) {
    const API_KEY_WEATHER = '8c8a90f7de104e87ab4194550241103';
    const URL_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${ubicacion}`;
    try {
        const response = await fetch(URL_WEATHER);
        const data = await response.json();
        const dataCountry = await getDataCountry(data.location.country);

        let urlCountry = dataCountry[0].flags.png;

        let location = data.location.name;
        let condition = data.current.condition.text;
        let degreesC = data.current.temp_c;
        let time = data.location.localtime;
        let windKPH = data.current.wind_kph;
        let humidity = data.current.humidity;

        updateWeather(urlCountry, location, condition, degreesC, time, windKPH, humidity);
    
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
}

async function getDataCountry(pais) {
    const URL_COUNTRY = `https://restcountries.com/v3.1/name/${pais}`;

    const response = await fetch(URL_COUNTRY);
    const dataCountry = await response.json();

    return dataCountry;
}

function updateWeather(urlCountry, ubicacion, condicion, gradosC, hora, vientoKPH, humedad) {
    const mainError = document.getElementById('error-content');
    const logoCountry = document.getElementById('logo-country');
    const location = document.getElementById('location');
    const condition = document.getElementById('condition');
    const degrees = document.getElementById('degrees');
    const localTime = document.getElementById('local-time');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');

    //En caso que  la visualizacion de que no hay datos este activa

    mainError.style.display = 'none';

    logoCountry.src = urlCountry;
    location.textContent = ubicacion;
    condition.textContent = condicion;
    degrees.textContent = gradosC + '°c';
    let auxString = hora;
    localTime.textContent =''+ hora.split(' ')[1];
    wind.textContent = vientoKPH + ' kph';
    humidity.textContent = '% ' + humedad;




}