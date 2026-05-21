import CategoryProvider from "./category-provider";
import CategoryStateResolver from "./category-state-resolver";
import Container from "react-bootstrap/Container";

const Categories = () => {
  return (
    <CategoryProvider>
      <Container>
        <CategoryStateResolver />
      </Container>
    </CategoryProvider>
  );
};

export default Categories;
