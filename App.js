const { useState } = React;

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function getWeather() {
        if (!city.trim()) {
            setError("Please enter a city name.");
            setWeather(null);
            return;
        }

        setLoading(true);
        setError("");
        setWeather(null);

        try {
            // Step 1: Get city coordinates
            const locationResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
            );

            if (!locationResponse.ok) {
                throw new Error("Unable to find the city.");
            }

            const locationData = await locationResponse.json();

            if (!locationData.results || locationData.results.length === 0) {
                throw new Error("City not found.");
            }

            const location = locationData.results[0];

            // Step 2: Get weather data
            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
            );

            if (!weatherResponse.ok) {
                throw new Error("Unable to fetch weather data.");
            }

            const weatherData = await weatherResponse.json();

            setWeather({
                city: location.name,
                country: location.country,
                temperature: weatherData.current.temperature_2m,
                humidity: weatherData.current.relative_humidity_2m,
                wind: weatherData.current.wind_speed_10m,
                time: weatherData.current.time
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <header>
                <h1>React Weather App</h1>
                <p>Weather data fetched from a public API</p>
            </header>

            <main className="container">

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                getWeather();
                            }
                        }}
                    />

                    <button onClick={getWeather}>
                        Get Weather
                    </button>
                </div>

                {loading && (
                    <p className="loading">
                        Loading weather data...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {weather && (
                    <div className="weather-card">

                        <h2>
                            {weather.city}, {weather.country}
                        </h2>

                        <div className="weather-info">

                            <div className="info-box">
                                <strong>Temperature</strong>
                                <span>{weather.temperature} °C</span>
                            </div>

                            <div className="info-box">
                                <strong>Humidity</strong>
                                <span>{weather.humidity}%</span>
                            </div>

                            <div className="info-box">
                                <strong>Wind Speed</strong>
                                <span>{weather.wind} km/h</span>
                            </div>

                        </div>

                        <p style={{ marginTop: "20px" }}>
                            Data time: {weather.time}
                        </p>

                    </div>
                )}

            </main>

            <footer>
                <p>© 2026 React API Integration Project</p>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
