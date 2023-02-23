import { Button } from "react-bootstrap";
import "../css/jumbotron.css";

const Welcome = () => {
  return (
    <div className="jumbotron">
      <h1>Images Gallery</h1>
      <p>
        This is simple apllication that retrieves photos using Unsplash API. In
        order to start enter any search term in the input.
      </p>
      <p>
        <Button variant="dark" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </div>
  );
};

export default Welcome;
