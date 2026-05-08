import { Row, Col, Card, Container } from "react-bootstrap";

const WeatherForecast = ({ forecastList }) => {
  if (!forecastList || forecastList.length === 0) return null;

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4 text-white fw-bold">Prossimi 5 Giorni</h3>
      <Row className="g-3 justify-content-center">
        {forecastList.map((day, index) => (
          <Col xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              className="text-center shadow-sm h-100 weather-card"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body>
                {/* Indico solo la data breve */}
                <Card.Title className="h6 text-capitalize">
                  {new Date(day.dt_txt).toLocaleDateString("it-IT", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </Card.Title>
                <div className="emoji-pulse" style={{ fontSize: "40px" }}>
                  {day.weather[0].main === "Clear"
                    ? "☀️"
                    : day.weather[0].main === "Rain"
                      ? "🌧️"
                      : "☁️"}
                </div>
                <Card.Text className="h4 fw-bold">
                  {Math.round(day.main.temp)}°C
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WeatherForecast;
