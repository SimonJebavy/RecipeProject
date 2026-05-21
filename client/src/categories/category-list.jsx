import { useContext } from "react";
import { CategoryContext } from "./category-provider";
import Category from "./category";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Icon from "@mdi/react";
import { mdiRefresh } from "@mdi/js";

function CategoryList() {
  const { data, state, error, handlerMap } = useContext(CategoryContext);

  return (
    <div>
      <h1>
        <Stack direction="horizontal" gap={3}>
          <div>Ingredients</div>
          <div className="ms-auto">
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                handlerMap.fetchCategories();
              }}
            >
              <Icon path={mdiRefresh} size={1} spin={state === "loading"} />{" "}
              Refresh
            </Button>
          </div>
        </Stack>
      </h1>
      <div>
        <Category />
      </div>
      {(state === "errorCreating" || state === "errorDeleting") && error ? (
        <Alert variant="danger">{error}</Alert>
      ) : null}
      {data.itemList.length > 0 ? (
        data.itemList.map((ingredient) => (
          <Category key={ingredient.id} data={ingredient} />
        ))
      ) : (
        <div>No ingredients have been created yet.</div>
      )}
    </div>
  );
}

export default CategoryList;
