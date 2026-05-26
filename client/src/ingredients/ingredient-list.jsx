import { useContext } from "react";
import { IngredientContext } from "./ingredient-provider";
import Ingredient from "./ingredient";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";

function IngredientList() {
  const { data, state, error } = useContext(IngredientContext);

  return (
    <div>
      <h1>
        <Stack direction="horizontal" gap={3}>
          <div>Ingredients</div>
        </Stack>
      </h1>
      <div>
        <Ingredient />
      </div>
      {(state === "errorCreating" || state === "errorDeleting") && error ? (
        <Alert variant="danger">{error}</Alert>
      ) : null}
      {data.itemList.length > 0 ? (
        data.itemList.map((ingredient) => (
          <Ingredient key={ingredient.id} data={ingredient} />
        ))
      ) : (
        <div>No ingredients have been created yet.</div>
      )}
    </div>
  );
}

export default IngredientList;
