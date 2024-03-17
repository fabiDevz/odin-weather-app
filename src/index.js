import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const btnBusqueda = document.getElementById('btnBusqueda');
let ubicacion = document.getElementById('search-bar').value;

document.addEventListener('DOMContentLoaded', (event) => {

    console.log('La estructura básica de la página ha sido cargada.');
    getDataWeather('Chile');

});

btnBusqueda.addEventListener('click', () => {
    ubicacion = document.getElementById('search-bar').value;

    if (ubicacion.trim() === '') {
        ubicacion = 'Chile';
    }
    getDataWeather(ubicacion);


});

async function getDataWeather(ubicacion) {
    const API_KEY_WEATHER = '8c8a90f7de104e87ab4194550241103';
    const URL_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${ubicacion}`;
    try {
        const response = await fetch(URL_WEATHER);
        const data = await response.json();
        const dataCountry = await getDataCountry(data.location.country);
        console.log('clima');
        console.log(data);
        let urlCountry = dataCountry[0].flags.png;
        let titleCountry = data.location.country;
        let location = data.location.name;
        let condition = data.current.condition.text;
        let iconoClima = data.current.condition.icon;
        let degreesC = data.current.temp_c;
        let time = data.location.localtime;
        let windKPH = data.current.wind_kph;
        let humidity = data.current.humidity;

        updateWeather(urlCountry, titleCountry, location, condition, iconoClima, degreesC, time, windKPH, humidity);
        getForecast(ubicacion);
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

function updateWeather(urlCountry, titulo, ubicacion, condicion, iconoClima, gradosC, hora, vientoKPH, humedad) {
    const mainError = document.getElementById('error-content');
    const logoCountry = document.getElementById('logo-country');
    const location = document.getElementById('location');
    const condition = document.getElementById('condition');
    const weatherIcon = document.getElementById('weather-icon');
    const degrees = document.getElementById('degrees');
    const localTime = document.getElementById('local-time');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');


    //En caso que  la visualizacion de que no hay datos este activa

    mainError.style.display = 'none';

    logoCountry.src = urlCountry;
    logoCountry.title = titulo;
    location.textContent = ubicacion;
    condition.textContent = obtenerClimaES(condicion);
    weatherIcon.src = iconoClima;
    degrees.textContent = gradosC + '°c';
    localTime.textContent = '' + hora.split(' ')[1];
    wind.textContent = vientoKPH + ' kph';
    humidity.textContent = '% ' + humedad;


}

function obtenerClimaES(condition) {
    const condicionesClimaticas = {
        "Clear": "Despejado",
        "Sunny": "Soleado",
        "Partly cloudy": "Parcialmente nublado",
        "Cloudy": "Nublado",
        "Overcast": "Cubierto",
        "Mist": "Neblina",
        "Fog": "Niebla",
        "Haze": "Neblina",
        "Smoke": "Humo",
        "Dust": "Polvo",
        "Sand": "Arena",
        "Ash": "Ceniza",
        "Squalls": "Chubascos",
        "Tornado": "Tornado",
        "Light rain showers": "Lluvias ligeras",
        "Moderate rain showers": "Lluvias moderadas",
        "Heavy rain showers": "Lluvias intensas",
        "Light snow showers": "Nevadas ligeras",
        "Moderate snow showers": "Nevadas moderadas",
        "Heavy snow showers": "Nevadas intensas",
        "Patchy rain possible": "Lluvia intermitente posible",
        "Patchy snow possible": "Nevadas intermitentes posibles",
        "Patchy sleet possible": "Aguanieve intermitente posible",
        "Patchy freezing drizzle possible": "Llovizna helada intermitente posible",
        "Thundery outbreaks possible": "Posibles tormentas eléctricas",
        "Blowing snow": "Nevadas con viento",
        "Blizzard": "Ventisca",
        "Freezing fog": "Niebla helada",
        "Patchy light drizzle": "Llovizna ligera intermitente",
        "Light drizzle": "Llovizna ligera",
        "Freezing drizzle": "Llovizna helada",
        "Heavy freezing drizzle": "Llovizna helada intensa",
        "Light rain": "Lluvia ligera",
        "Moderate rain": "Lluvia moderada",
        "Heavy rain": "Lluvia intensa",
        "Light freezing rain": "Lluvia helada ligera",
        "Moderate or heavy freezing rain": "Lluvia helada moderada o intensa",
        "Light sleet": "Aguanieve ligera",
        "Moderate or heavy sleet": "Aguanieve moderada o intensa",
        "Patchy light rain with thunder": "Lluvias ligeras intermitentes con truenos",
        "Moderate or heavy rain with thunder": "Lluvias moderadas o intensas con truenos",
        "Patchy light snow with thunder": "Nevadas ligeras intermitentes con truenos",
        "Moderate or heavy snow with thunder": "Nevadas moderadas o intensas con truenos",
        "Torrential rain shower": "Lluvia torrencial",
        "Torrential rain": "Lluvia torrencial",
        "Light drizzle": "Llovizna ligera",
        "Ice pellets": "Granizo",
        "Light rain shower": "Lluvia ligera",
        "Moderate or heavy rain shower": "Lluvia moderada o intensa",
        "Moderate or heavy snow showers": "Nevadas moderadas o intensas",
        "Light showers of ice pellets": "Lluvias ligeras de granizo",
        "Moderate or heavy showers of ice pellets": "Lluvias moderadas o intensas de granizo",
        "Patchy light snow": "Nevadas ligeras intermitentes",
        "Patchy moderate snow": "Nevadas moderadas intermitentes",
        "Patchy heavy snow": "Nevadas intensas intermitentes",
        "Light snow": "Nevadas ligeras",
        "Patchy moderate snow": "Nevadas moderadas intermitentes",
        "Moderate snow": "Nevadas moderadas",
        "Blowing snow": "Nevadas con viento",
        "Patchy light rain": "Lluvias ligeras intermitentes",
        "Light rain": "Lluvias ligeras",
        "Moderate rain": "Lluvias moderadas",
        "Patchy light sleet": "Aguanieve ligera intermitente",
        "Light sleet": "Aguanieve ligera",
        "Ice pellets": "Granizo",
        "Moderate or heavy rain": "Lluvia moderada o intensa",
        "Patchy light rain with thunder": "Lluvias ligeras intermitentes con truenos",
        "Moderate or heavy rain with thunder": "Lluvias moderadas o intensas con truenos",
        "Patchy light snow with thunder": "Nevadas ligeras intermitentes con truenos",
        "Moderate or heavy snow with thunder": "Nevadas moderadas o intensas con truenos"
    };
    return condicionesClimaticas[condition];
}

async function getForecast(localidad) {
    const API_KEY_WEATHER = '8c8a90f7de104e87ab4194550241103';
    const URL_WEATHER = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY_WEATHER}&q=${localidad}&days=3&aqi=no&alerts=no`;

    const response = await fetch(URL_WEATHER);
    const data = await response.json();
    console.log('pronostico');
    console.log(data);
    console.log('fechas y weas');
    console.log(data.forecast.forecastday[1].date);
   

   
        let date = data.forecast.forecastday[2].date;
        let urlIcon = data.forecast.forecastday[2].day.condition.icon;
        let degreesMin = data.forecast.forecastday[2].day.mintemp_c;
        let degreesMax = data.forecast.forecastday[2].day.maxtemp_c;
        let humidity = data.forecast.forecastday[2].day.avghumidity;
      
       
        const fecha = new Date(date);
        console.log(fecha);
        const fechaFormateada = format(new Date(date), 'EEE dd-MM', { timeZone: 'America/Santiago', locale: es });
        console.log('aca va el date de la wea');
        console.log(fechaFormateada);

        updateWeatherNextDays(fechaFormateada, urlIcon, degreesMin, degreesMax, humidity);
    






}


function updateWeatherNextDays(date, urlIcono, degreesMinC, degreesMaxC, humidity, wind) {
  
 
    const pronosticoFecha = document.getElementById(`forecast-date-1`);
    const pronosticoIcono = document.getElementById(`forecast-img-1`);
    const pronosticoDegreesMin = document.getElementById(`forecast-min-c-1`);
    const pronosticoDegreesMax = document.getElementById(`forecast-max-c-1`);
    const pronosticoHumidity = document.getElementById(`forecast-humidity-1`);
 

    pronosticoFecha.textContent = date;
    pronosticoIcono.src = urlIcono;
    pronosticoDegreesMin.textContent = degreesMinC +'°c';
    pronosticoDegreesMax.textContent = degreesMaxC +'°c';
    pronosticoHumidity.textContent = humidity;

  
}


