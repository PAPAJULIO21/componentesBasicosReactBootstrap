import './App.css';
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [films, setFilms] = useState([]);
    const [mainFilm, setMainFilm] = useState(null);


    useEffect(() => {
        fetch("./peliculas.json")
            .then(res => res.json())
            .then(data => {
                setFilms(data);
                setMainFilm(data[0]);
            });
    }, []);

    const handleSelectFilm = (film) => {
        setMainFilm(film);
    };

    
    return (
        <Container>
            {/* Película principal */}
            {mainFilm && (
                <Row className="mb-4">
                    {/* Imagen de la película principal */}
                    <Col xs={12} md={8}>
                        <img
                            src={mainFilm.foto}
                            alt={mainFilm.titulo}
                            style={{ width: "80%", height: "auto", borderRadius: "8px" }}
                        />
                    </Col>

                    <Col xs={12} md={4}>
                        <h2>{mainFilm.titulo}</h2>
                        <p><strong>Director:</strong> {mainFilm.director}</p>
                        <p><strong>Actores Principales:</strong> {mainFilm.actoresPrincipales.join(", ")}</p>
                        <p><strong>Sinopsis:</strong> {mainFilm.sinopsis}</p>
                    </Col>
                </Row>
            )}

            <Row>
                {films.map((film, index) => (
                    <Col xs={12} md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={film.foto} alt={film.titulo} />
                            <Card.Body>
                                <Card.Title>{film.titulo}</Card.Title>
                                <Card.Text><strong>Director:</strong> {film.director}</Card.Text>
                                <Card.Text><strong>Actores:</strong> {film.actoresPrincipales.join(", ")}</Card.Text>
                                <Button variant="secondary" onClick={() => alert(film.sinopsis)}>Más</Button>
                                <Button
                                    variant="primary"
                                    onClick={() => handleSelectFilm(film)}  // Al seleccionar, se convierte en la película principal
                                    className="ml-2"
                                >
                                    Seleccionar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;