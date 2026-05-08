import { Container } from "react-bootstrap";

// Mi passo il valore dato dalla geolocalizzazione
const MyFooter = ({ city }) => {
  const today = new Date().toLocaleDateString();

  return (
    <footer
      className="mt-auto py-3 bg-dark text-white text-center"
      style={{ borderTop: "3px solid #6f42c1" }}
    >
      <Container>
        <p className="mb-0">
          Dati rilevati il: <strong>{today}</strong>
        </p>
        <p>
          Rilevati a: <strong>{city || "Caricamento..."}</strong>
        </p>
      </Container>
    </footer>
  );
};

export default MyFooter;
