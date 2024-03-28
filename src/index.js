import { format, isWithinInterval, set, parse, addDays } from 'date-fns';
import { es } from 'date-fns/locale/es';

const btnBusqueda = document.getElementById('btnBusqueda');
const btnTemperatura = document.getElementById('btnTemperatura');
let ubicacion = document.getElementById('search-bar').value;
let temperatura_c = true;
let ubicacionActual  = "Chile";

function inicializarBackground(time) {
    //let hora = time.split(' ')[1];

    // Suponiendo que tienes una hora en formato de cadena "HH:mm"
    const horaStr = time.split(' ')[1];
    const hora = parse(horaStr, "HH:mm", new Date());


    const dayIntervalStart = set(new Date(), { hours: 7, minutes: 0 }) //7:00 AM
    const dayIntervalEnd = set(new Date(), { hours: 17, minutes: 0 }) //5:00 PM

    const afterNoonIntervalStart = set(new Date(), { hours: 17, minutes: 1 }) //17:01 PM
    const afterNoonIntervalEnd = set(new Date(), { hours: 21, minutes: 0 }) //21:00 PM

    const nightIntervalStart = set(new Date(), { hours: 21, minutes: 1 }) //21:01 PM
    const nightIntervalEnd = set(new Date(), { hours: 23, minutes: 59 }) //23:59 PM

    const nightIntervalStart2 = set(new Date(), { hours: 0, minutes: 1 }) //00:01 AM
    const nightIntervalEnd2 = set(new Date(), { hours: 6, minutes: 59 }) //06:59 AM

    if (isWithinInterval(hora, { start: dayIntervalStart, end: dayIntervalEnd })) {
        document.body.style.backgroundImage = "url('img/day.jpg')";
    }

    if (isWithinInterval(hora, { start: afterNoonIntervalStart, end: afterNoonIntervalEnd })) {
        document.body.style.backgroundImage = "url('img/afternoon.jpg')";
    }

    if (isWithinInterval(hora, { start: nightIntervalStart, end: nightIntervalEnd })) {
        document.body.style.backgroundImage = "url('img/night.jpg')";
    }

    if (isWithinInterval(hora, { start: nightIntervalStart2, end: nightIntervalEnd2 })) {
        document.body.style.backgroundImage = "url('img/night.jpg')";
    }

}

document.addEventListener('DOMContentLoaded', (event) => {

    getDataWeather('Chile');
    getDataWeatherPerHr('Chile');

});

btnTemperatura.addEventListener('click', () => {

    btnTemperatura.textContent  = temperatura_c? "Cambiar a °C": "Cambiar a °F" ;
    temperatura_c = !temperatura_c;
    getDataWeather(ubicacionActual);
    getDataWeatherPerHr(ubicacionActual);
    
});

btnBusqueda.addEventListener('click', () => {
    ubicacion = document.getElementById('search-bar').value;

    if (ubicacion.trim() === '') {
        ubicacion = 'Chile';
    }
    ubicacionActual = ubicacion;
    getDataWeather(ubicacion);
    getDataWeatherPerHr(ubicacion);

});

async function getDataWeather(ubicacion) {
    const API_KEY_WEATHER = '8c8a90f7de104e87ab4194550241103';
    const URL_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${ubicacion}`;
    try {
        const response = await fetch(URL_WEATHER);
        const data = await response.json();
        const dataCountry = await getDataCountry(data.location.country);

        let urlCountry = dataCountry[0].flags.png;
        let titleCountry = data.location.country;
        let location = data.location.name;
        let condition = data.current.condition.text;
        let iconoClima = data.current.condition.icon;
        
        
        let degrees = temperatura_c ? data.current.temp_c  :data.current.temp_f;
        
        let time = data.location.localtime;
        let windKPH = data.current.wind_kph;
        let humidity = data.current.humidity;
        inicializarBackground(time);

        updateWeather(urlCountry, titleCountry, location, condition, iconoClima, degrees, time, windKPH, humidity);
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

function updateWeather(urlCountry, titulo, ubicacion, condicion, iconoClima, grados, hora, vientoKPH, humedad) {
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
    degrees.textContent =  temperatura_c ? grados + '°c': grados + '°F';
    localTime.textContent = '' + hora.split(' ')[1];
    wind.textContent = vientoKPH + ' kph';
    humidity.textContent =  humedad;


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

    /*codigo experimental borrar si falla*/
    for (let index = 1; index < 3; index++) {
        let dateAux = data.forecast.forecastday[index].date;
        let urlIconAux = data.forecast.forecastday[index].day.condition.icon;
        let degreesMinAux = temperatura_c ?  data.forecast.forecastday[index].day.mintemp_c: data.forecast.forecastday[index].day.mintemp_f;
        let degreesMaxAux = temperatura_c ? data.forecast.forecastday[index].day.maxtemp_c :  data.forecast.forecastday[index].day.maxtemp_f;
        let humidityAux = data.forecast.forecastday[index].day.avghumidity;

        const aux = addDays(new Date(dateAux), 1);
        const dateAuxFormated = format(aux, 'EEE dd-MM', { timeZone: 'America/Santiago', locale: es });



        updateWeatherNextDays(index, dateAuxFormated, urlIconAux, degreesMinAux, degreesMaxAux, humidityAux);


    }
}


function updateWeatherNextDays(index, date, urlIcono, degreesMin, degreesMax, humidity, wind) {


    const pronosticoFecha = document.getElementById(`forecast-date-${index}`);
    const pronosticoIcono = document.getElementById(`forecast-img-${index}`);
    const pronosticoDegreesMin = document.getElementById(`forecast-min-c-${index}`);
    const pronosticoDegreesMax = document.getElementById(`forecast-max-c-${index}`);
    const pronosticoHumidity = document.getElementById(`forecast-humidity-${index}`);


    pronosticoFecha.textContent = date;
    pronosticoIcono.src = urlIcono;
    pronosticoDegreesMin.textContent = temperatura_c ? degreesMin + '°c': degreesMin + '°F';
    pronosticoDegreesMax.textContent = temperatura_c ? degreesMax + '°c': degreesMax + '°F';
    pronosticoHumidity.textContent = humidity;


}


async function getDataWeatherPerHr(localidad) {
    const API_KEY_WEATHER = '8c8a90f7de104e87ab4194550241103';
    const URL_WEATHER_CURRENT = `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${localidad}`;
    const URL_WEATHER = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY_WEATHER}&q=${localidad}&days=3&aqi=no&alerts=no`;
    try {
        const response = await fetch(URL_WEATHER);
        const data = await response.json();

        const response_2 = await fetch(URL_WEATHER_CURRENT);
        const data_2 = await response_2.json();

        const containerCardsHrs = document.getElementById('container-forecast-hours');
        if (containerCardsHrs.childElementCount > 0) limpiarCardsPerHr();
        //agregar cards


        /*Manipulacion del tiempo*/
        let time = data_2.location.localtime;
        const horaStr = time.split(' ')[1];
        const hora = parse(horaStr, "HH:mm", new Date());

        const intervalStart = set(new Date(), { hours: 0, minutes: 0 }) //00:00 AM
        const intervalEnd = set(new Date(), { hours: 16, minutes: 59 }) //04:59 PM
        let index = 0;
        if (isWithinInterval(hora, { start: intervalStart, end: intervalEnd })) {
            index = hora.getHours();
            console.log(index);
        }else{
            index = 16;
        }

        /*************************************** */
        for (let i = index; i < index+8; i++) {

            const cardHrs = document.createElement('div');

            cardHrs.classList.add('card-forecast-hour');

            const divTemp = document.createElement('div');
            const divCondition = document.createElement('img');
            const divTime = document.createElement('div');

            divTemp.textContent = temperatura_c ? data.forecast.forecastday[0].hour[i].temp_c + '°c': data.forecast.forecastday[0].hour[i].temp_f + '°F' ;
            divCondition.src = data.forecast.forecastday[0].hour[i].condition.icon;
            let dateTime = data.forecast.forecastday[0].hour[i].time;
            let hora = dateTime.split(' ')[1];
            divTime.textContent = hora;



            cardHrs.appendChild(divTemp);
            cardHrs.appendChild(divCondition);
            cardHrs.appendChild(divTime);

            containerCardsHrs.appendChild(cardHrs);
        }




    } catch (error) {
        console.error('Error al obtener los datos del clima per hour:', error);
    }

}

function limpiarCardsPerHr() {
    const containerCardsHrs = document.getElementById('container-forecast-hours');

    while (containerCardsHrs.childElementCount > 0) {
        containerCardsHrs.children[0].remove();
    }
}

