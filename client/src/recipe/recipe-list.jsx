import Container from "react-bootstrap/esm/Container";
import RecipeListProvider from "./recipe-list-provider";
import RecipeListContent from "./recipe-list-content";

function RecipeList() {
  return (
    <Container>
      <RecipeListProvider>
        <RecipeListContent />
      </RecipeListProvider>
    </Container>
  );
}

export default RecipeList;
