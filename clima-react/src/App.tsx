import styles from "./App.module.css"
import ErrorC from "./components/Error/Error"
import Form from "./components/form/Form"
import Loading from "./components/loading/Loading"
import WeatherDetail from "./components/weatherDetail/WeatherDetail"
import useWeather from "./hooks/useWeather"


function App() {

  const{weather,fetchWeather, hasWeatherData,loading,error}=useWeather()
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}/>
        {loading && <Loading/>}
        {hasWeatherData && <WeatherDetail weather={weather}/>}
        {error && <ErrorC/>}
      </div>
    </>
  )
}

export default App
