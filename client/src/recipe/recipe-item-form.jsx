import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { RecipeListContext } from "./recipe-list-provider.jsx";

function RecipeItemForm({ onClose }) {
  const { state, data, error, handlerMap } = useContext(RecipeListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          values.ingredientIds = formData.getAll("ingredientIds");

          const result = await handlerMap.handleCreate({ ...values });
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error.message}</Alert>
          ) : null}
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            disabled={state === "pending"}
            required
          />
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="instructions"
            disabled={state === "pending"}
            required
          />
          <Form.Label>Ingredients</Form.Label>
          <Form.Select
            name="ingredientIds"
            disabled={state === "pending"}
            multiple
            required
          >
            {data?.ingredientList
              ? data.ingredientList.map((ingredient) => {
                  return (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  );
                })
              : null}
          </Form.Select>
          <Form.Text>
            Hold Ctrl to select multiple ingredients. Create ingredients first
            on the Ingredients page.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending" || !data?.ingredientList?.length}
          >
            Create Recipe
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default RecipeItemForm;
