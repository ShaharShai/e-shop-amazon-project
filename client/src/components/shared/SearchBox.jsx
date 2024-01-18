import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function SearchBox() {
  return (
    <Form className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          placeholder="Search For a Product"
          aria-describedby="button-search"
        />
        <Button
          id="button-search"
          style={{
            transition: "0.2s",
            ":hover": { variant: "outline-warning" },
          }}
        >
          <i className="fa fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
