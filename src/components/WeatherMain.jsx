import { Card, Container } from "react-bootstrap";

const WeatherMain = ({ data }) => {
  if (!data) return null; // Se non ci sono dati, non mostrare nulla

  // Funzione per scegliere l'emoji giusta
  const getIcon = (condition) => {
    if (condition === "Clear") return "☀️";
    if (condition === "Clouds") return "☁️";
    if (condition === "Rain") return "🌧️";
    if (condition === "Drizzle") return "🌧️";
    if (condition === "Mist") return "🌫️";
    return "🌡️";
  };
  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Container className="my-4 d-flex justify-content-center">
      <Card
        className="text-center shadow-lg weather-card"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          border: "none",
        }}
      >
        <Card.Body className="py-5">
          <Card.Title className="display-4 fw-bold">
            {data.name}
            <div className="h3 text-capitalize text-muted mt-2">{today}</div>
          </Card.Title>

          <div className="emoji-pulse" style={{ fontSize: "100px" }}>
            {getIcon(data.weather[0].main)}
          </div>

          <Card.Text className="display-1 fw-bold">
            {Math.round(data.main.temp)}°C
          </Card.Text>

          <Card.Text className="text-muted text-uppercase fw-bold h4">
            {data.weather[0].description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WeatherMain;
