import { Spinner as Loader } from "react-bootstrap";

const spinnerStyle = {
  position: "absolute",
  top: "calc(50% - 1rem)",
  left: "calc(50% - 1rem)",
};

const Spinner = () => {
  return (
    <Loader
      animation="border"
      style={spinnerStyle}
      role="status"
      variant="primary"
    >
      <span className="visually-hidden">Loading...</span>
    </Loader>
  );
};

export default Spinner;
