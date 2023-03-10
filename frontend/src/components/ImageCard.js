import { Card, Button, Nav } from "react-bootstrap";

const cardFooterStyle = {
  textAlign: "center",
};

const ImageCard = ({ image, deleteImage, saveImage }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>
          {image.title?.charAt(0).toUpperCase() + image.title.slice(1)}
        </Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="dark" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{" "}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-center text-muted">
        {image.user?.portfolio_url ? (
          <Nav.Link href={image.user?.portfolio_url} target="_blank">
            {image.user.name}
          </Nav.Link>
        ) : image.user?.name ? (
          image.user.name
        ) : (
          "No author name"
        )}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
