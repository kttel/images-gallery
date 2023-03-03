import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import Welcome from "./components/Welcome";
import { Container, Row, Col } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";

const App = () => {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // fetch(`${API_URL}/new-image?query=${word}`)
    //   .then((result) => result.json())
    //   .then((data) => {
    //     setImages([{ title: word, ...data }, ...images]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ title: word, ...res.data }, ...images]);
    } catch (error) {
      console.log(error);
    }
    setWord("");
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, i) => (
              <Col key={image.id} className="pb-3">
                <ImageCard image={image} deleteImage={handleDeleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
};

export default App;
