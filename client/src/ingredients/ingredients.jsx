import IngredientProvider from "./ingredient-provider";
import IngredientStateResolver from "./ingredient-state-resolver";
import Container from "react-bootstrap/Container";

const Ingredients = () => {
  return (
    <IngredientProvider>
      <Container>
        <IngredientStateResolver />
      </Container>
    </IngredientProvider>
  );
};

export default Ingredients;
