import {useState, useEffect} from 'react'
import axios from 'axios'

function buildUrl(city, apiKey) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
}

function WeatherIcon({ icon }) {
  return (
    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
  )
}

function Weather({ city }) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) return null

  const [wind, setWind] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [icon, setIcon] = useState('')

  useEffect(() => {
    const refetch = async () => {
      try {
        const response = await axios.get(buildUrl(city, apiKey))
        const data = response.data
        setWind(data.wind.speed)
        setTemperature(data.main.temp)
        setIcon(data.weather[0].icon)
      } catch (err) {
        console.error(err)
      }
    }
    refetch()
  }, [city])

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>Temperature {temperature} Celsius</p>
      <WeatherIcon icon={icon} />
      <p>Wind {wind} m/s</p>
    </>
  )
}

export default Weather