import './App.css';
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [films, setFilms] = useState([]);
    const [mainFilm, setMainFilm] = useState(null);
    const [view, setView] = useState("main"); // Estado para controlar qué sección se muestra

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
        setView("main");
    };

    const verCategoria = () => {
        setView("categoria");
    };

    const verDirectores = () => {
        setView("directores");
    };

    return (
        <Container>
            {/* Vista principal */}
            {view === "main" && mainFilm && (
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
                        <Button onClick={verCategoria}>Ver Categoría</Button>
                        <Button onClick={verDirectores} className="ml-2">Ver Directores</Button>
                    </Col>
                </Row>
            )}

            {/* Vista de categoría */}
            {view === "categoria" && (
                <div>
                    <h1>Categoría</h1>
                    <p>Categoría de la película: {mainFilm?.categoria || "N/A"}</p>
                    <Button onClick={() => setView("main")}>Volver</Button>
                </div>
            )}

            {/* Vista de directores */}
            {view === "directores" && (
                <div>
                    <h1>Directores</h1>
                    <p>Director de la película: {mainFilm?.director || "N/A"}</p>
                    <Button onClick={() => setView("main")}>Volver</Button>
                </div>
            )}

            {/* Lista de películas */}
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
                                    onClick={() => handleSelectFilm(film)}
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