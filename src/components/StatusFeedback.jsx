import { Spinner, Alert, Container } from "react-bootstrap";

const StatusFeedback = ({ loading, error }) => {
  return (
    <Container className="text-center my-3">
      {/* Se loading è vero, mostra lo spinner */}
      {loading && <Spinner animation="border" variant="info" />}

      {/* Se c'è un errore, mostra l'alert */}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
};

export default StatusFeedback;
