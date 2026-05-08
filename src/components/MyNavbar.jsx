import {
  Navbar,
  Container,
  Alert,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useState } from "react";

const MyNavbar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const SearchSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setInputValue(""); //svuoto il campo di ricerca
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="justify-content-center py-3"
        style={{ borderBottom: "3px solid #6f42c1" }}
      >
        <Container className="flex-column">
          <Navbar.Brand href="/" className="mb-3">
            <img src="epicode_logo.png" height="40" alt="Epicode Logo" />
          </Navbar.Brand>

          <Form
            className="d-flex w-100"
            style={{ maxWidth: "500px" }}
            onSubmit={SearchSubmit}
          >
            <FormControl
              type="search"
              placeholder="Cerca una città..."
              className="me-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button variant="outline-info" type="submit">
              Cerca
            </Button>
          </Form>
        </Container>
      </Navbar>

      {/* Banner di guida per usare la navigazione */}
      <Container className="mt-3">
        <Alert variant="info" className="text-center shadow-sm">
          <strong>Benvenuto!</strong> Per favore, accetta il pop-up per
          recuperare la posizione dal browser e mostrare il meteo locale in
          automatico, Oppure cerca una città in lingua EN o IT es:{" "}
          <em>"Rome/Roma"</em> o <em>"London/Londra"</em>.
          <strong>
            {" "}
            <br />
            Consiglio:
          </strong>{" "}
          Per una ricerca precisa, usa il formato
          <em> "Città, IT"</em> (es: <strong>Roma, IT</strong>). Senza la sigla
          dello stato, potresti finire in una città omonima all'estero!
        </Alert>
      </Container>
    </>
  );
};

export default MyNavbar;
