import { useState, useEffect } from 'react'
import './WeatherApp.css'

export default function WeatherApp() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('London')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  const WEATHER_API_KEY = 'demo' // Using demo for testing - use real key in production

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    try {
      // Using Open-Meteo API which is free and doesn't require a key
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
      )
      
      if (!geoResponse.ok) throw new Error('City not found')
      
      const geoData = await geoResponse.json()
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found')
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&timezone=auto`
      )

      const weatherData = await weatherResponse.json()
      
      setWeather({
        city: name,
        country,
        ...weatherData.current,
        timezone: weatherData.timezone
      })
      setCity(cityName)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      fetchWeather(searchInput)
      setSearchInput('')
    }
  }

  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0) return '☀️' // Clear sky
    if (code === 1 || code === 2) return '🌤️' // Mostly clear
    if (code === 3) return '☁️' // Overcast
    if (code === 45 || code === 48) return '🌫️' // Foggy
    if (code >= 51 && code <= 67) return '🌧️' // Drizzle
    if (code >= 71 && code <= 77) return '❄️' // Snow
    if (code >= 80 && code <= 82) return '🌧️' // Rain showers
    if (code >= 85 && code <= 86) return '❄️' // Snow showers
    if (code >= 80 && code <= 99) return '⛈️' // Thunderstorm
    return '🌡️' // Default
  }

  return (
    <div className="weather-container">
      <div className="weather-app">
        <h1>🌤️ Weather App</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {loading && (
          <div className="loading">
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ {error}</p>
            <small>Try searching for a different city</small>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-info">
            <div className="weather-header">
              <h2>
                {weather.city}, {weather.country}
              </h2>
              <div className="weather-icon">
                {getWeatherIcon(weather.weather_code)}
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <span className="label">Temperature</span>
                <span className="value">{Math.round(weather.temperature_2m)}°C</span>
              </div>
              <div className="detail-card">
                <span className="label">Humidity</span>
                <span className="value">{weather.relative_humidity_2m}%</span>
              </div>
              <div className="detail-card">
                <span className="label">Wind Speed</span>
                <span className="value">{Math.round(weather.wind_speed_10m)} km/h</span>
              </div>
              <div className="detail-card">
                <span className="label">Timezone</span>
                <span className="value text-small">{weather.timezone}</span>
              </div>
            </div>

            <div className="forecast-info">
              <p>Data updated from Open-Meteo Weather API</p>
            </div>
          </div>
        )}

        {!loading && !weather && !error && (
          <div className="placeholder">
            <p>👀 Search for a city to see its weather!</p>
          </div>
        )}
      </div>
    </div>
  )
}
