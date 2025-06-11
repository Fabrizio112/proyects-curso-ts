import { formatTemperature } from "../../helper";
import type { Weather } from "../../hooks/useWeather";
import style from "./WeatherDetail.module.css"


type WeatherDetailProps={
    weather:Weather
}

function WeatherDetail({weather}:WeatherDetailProps ) {
    return ( 
    <div className={style.container}>
        <h2>Clima de {weather.name}</h2>
        <p className={style.current}>{formatTemperature(weather.main.temp)}°C</p>
        <div className={style.temperatures}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)}°C</span></p>
            <p>Max: <span>{formatTemperature(weather.main.temp_max)}°</span></p>
        </div>
    </div> );
}

export default WeatherDetail;