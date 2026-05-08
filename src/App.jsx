import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

// Component
import MyNavbar from "./components/MyNavbar";
import StatusFeedback from "./components/StatusFeedback";
import WeatherMain from "./components/WeatherMain";
import WeatherForecast from "./components/WeatherForecast";
import MyFooter from "./components/MyFooter";

// Configurazione API
const apiKey = "2232733b1ea78198cba94f4ef007fd03";
const currentWeatherapi = "https://api.openweathermap.org/data/2.5/weather";
const forecastWeatherapi = "https://api.openweathermap.org/data/2.5/forecast";

function App() {
  // Setto gli Stati
  const [currentWeather, setCurrentWeather] = useState(null); // Il meteo di oggi
  const [forecast, setForecast] = useState([]); // La lista dei prossimi 5 giorni
  const [loading, setLoading] = useState(false); // Diventa "vero" quando scarichiamo i dati
  const [error, setError] = useState(null); // Salva un messaggio se qualcosa va storto
  const [bgClass, setBgClass] = useState("bg-default"); // Decide il colore dello sfondo

  // Logica di cambio sfondo
  const updateBackground = (condition) => {
    switch (condition) {
      case "Clear":
        setBgClass("bg-sunny");
        break; // Sole
      case "Clouds":
        setBgClass("bg-cloudy");
        break; // Nuvole
      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        setBgClass("bg-rainy");
        break; // Pioggia o Temporale
      case "Mist":
      case "Fog":
      case "Haze":
        setBgClass("bg-mist");
        break;
      default: // Nebbia Foschia ecc.
        setBgClass("bg-default");
    }
  };

  // CHIAMATA FETCH
  // Può ricevere o il nome di una città o le coordinate (lat e lon) // p.s necessito di lat e lon solo per recuperare il valore iniziale dato dalla
  // geolocalizzazione del browser
  const fetchWeatherData = async (cityName, lat = null, lon = null) => {
    setLoading(true);
    setError(null);

    try {
      let urlToday = "";
      let urlForecast = "";

      // Se abbiamo latitudine e longitudine x la geolocalizzazione
      if (lat && lon) {
        urlToday = `${currentWeatherapi}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        urlForecast = `${forecastWeatherapi}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      }
      // Se abbiamo il nome di una città barra di ricerca
      else {
        urlToday = `${currentWeatherapi}?q=${cityName}&appid=${apiKey}&units=metric`;
        urlForecast = `${forecastWeatherapi}?q=${cityName}&appid=${apiKey}&units=metric`;
      }

      // Scarichiamo il meteo di oggi
      const respToday = await fetch(urlToday);
      if (!respToday.ok)
        throw new Error(
          "Località non trovata. Prova a scrivere ad esempio 'Milano o Milan'",
        );
      const dataToday = await respToday.json();

      setCurrentWeather(dataToday); // Salviamo oggi
      updateBackground(dataToday.weather[0].main); // Cambiamo sfondo

      // Scarichiamo le previsioni dei prossimi giorni
      const respForecast = await fetch(urlForecast);
      const dataForecast = await respForecast.json();

      // Filtriamo i dati per averne solo uno al giorno
      const filteredForecast = dataForecast.list.filter(
        (_, index) => (index + 1) % 8 === 0,
      );

      setForecast(filteredForecast);
    } catch (err) {
      setError(err.message); // Mostriamo l'errore se la città non esiste
    } finally {
      setLoading(false); // Spegniamo lo spinner
    }
  };

  // POSIZIONE AUTOMATICA ALL'AVVIO
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Se l'utente clicca consenti prendiamo la sua posizione reale
        const { latitude, longitude } = position.coords;
        fetchWeatherData(null, latitude, longitude);
      },
      () => {
        // Se l'utente nega il permesso, carichiamo Gorizia come base Prof Stefano vibes
        fetchWeatherData("Gorizia");
      },
    );
  }, []);

  return (
    /* Il div esterno che gestisce lo sfondo e tiene il footer in basso */
    <div className={`min-vh-100 d-flex flex-column transition-bg ${bgClass}`}>
      {/* Navbar con barra di ricerca */}
      <MyNavbar onSearch={(city) => fetchWeatherData(city)} />

      {/* Messaggi di caricamento o errore */}
      <StatusFeedback loading={loading} error={error} />

      {/* Parte centrale con i dati meteo */}
      <main className="flex-grow-1">
        {!loading && currentWeather && (
          <>
            {/* La Card grande di oggi */}
            <WeatherMain data={currentWeather} />

            {/* Le 5 mini-card dei prossimi giorni */}
            <WeatherForecast forecastList={forecast} />
          </>
        )}
      </main>

      {/* Footer */}
      <MyFooter city={currentWeather ? currentWeather.name : ""} />
    </div>
  );
}

export default App;
