import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import recipeIcon from "./cook-book.png";

function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      data-bs-theme="dark"
      collapseOnSelect={true}
      style={{backgroundColor: "#e7aa1a" }}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("")}>
          <img
            src={recipeIcon}
            alt="Recipe Book"
            height={50}
            style={{ marginRight: 16 }}
          />
          Recipe Book
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("")}
              active={window.location.pathname === "/"}
              eventKey="recipes"
            >
              Recipes
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("ingredients")}
              active={window.location.pathname === "/ingredients"}
              eventKey="ingredients"
            >
              Ingredients
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
