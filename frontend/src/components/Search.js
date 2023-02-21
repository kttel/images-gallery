import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={9}>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={word}
                    type="text"
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="Search"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
