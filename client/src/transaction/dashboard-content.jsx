import { useContext, useMemo, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import { TransactionListContext } from "./transaction-list-provider";
import PendingItem from "./pending-item";
import TransactionItemForm from "./transaction-item-form";
import TransactionItemDeleteDialog from "./transaction-item-delete-dialog";
import TransactionItem from "./transaction-item";

const emptyRecipeList = [];

function RecipeDetailDialog({ item, onClose, setTransactionItemDeleteDialog }) {
  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{item.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "60vh", maxHeight: "75vh", overflowY: "auto" }}>
        <Stack gap={3}>
          <div>
            <strong>Ingredients:</strong>{" "}
            {item.ingredients?.length
              ? item.ingredients.map((ingredient) => ingredient.name).join(", ")
              : "none"}
          </div>
          <div style={{ whiteSpace: "pre-wrap" }}>{item.instructions}</div>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => {
            onClose();
            setTransactionItemDeleteDialog(item);
          }}
        >
          Delete recipe
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DashboardContent() {
  const [transactionItemFormData, setTransactionItemFormData] = useState();
  const [transactionItemDeleteDialog, setTransactionItemDeleteDialog] =
    useState();
  const [recipeDetailDialog, setRecipeDetailDialog] = useState();
  const [requiredIngredientIds, setRequiredIngredientIds] = useState([
    "",
    "",
    "",
  ]);
  const [excludedIngredientIds, setExcludedIngredientIds] = useState([
    "",
    "",
    "",
  ]);
  const { state, data } = useContext(TransactionListContext);
  const recipeList = data?.itemList || emptyRecipeList;
  const filteredRecipeList = useMemo(() => {
    const requiredFilters = requiredIngredientIds.filter(Boolean);
    const excludedFilters = excludedIngredientIds.filter(Boolean);

    if (!requiredFilters.length && !excludedFilters.length) {
      return recipeList;
    }

    return recipeList.filter((recipe) => {
      const recipeIngredientIds = recipe.ingredientIds || [];
      const hasRequiredIngredients = requiredFilters.every((ingredientId) =>
        recipeIngredientIds.includes(ingredientId)
      );
      const hasExcludedIngredients = excludedFilters.some((ingredientId) =>
        recipeIngredientIds.includes(ingredientId)
      );

      return hasRequiredIngredients && !hasExcludedIngredients;
    });
  }, [excludedIngredientIds, recipeList, requiredIngredientIds]);

  const updateRequiredIngredientId = (index, value) => {
    setRequiredIngredientIds((current) =>
      current.map((ingredientId, currentIndex) =>
        currentIndex === index ? value : ingredientId
      )
    );
  };

  const updateExcludedIngredientId = (index, value) => {
    setExcludedIngredientIds((current) =>
      current.map((ingredientId, currentIndex) =>
        currentIndex === index ? value : ingredientId
      )
    );
  };

  return (
    <Card className="border-0">
      {!!transactionItemFormData ? (
        <TransactionItemForm
          onClose={() => setTransactionItemFormData()}
        />
      ) : null}
      {!!transactionItemDeleteDialog ? (
        <TransactionItemDeleteDialog
          item={transactionItemDeleteDialog}
          onClose={() => setTransactionItemDeleteDialog()}
        />
      ) : null}
      {!!recipeDetailDialog ? (
        <RecipeDetailDialog
          item={recipeDetailDialog}
          onClose={() => setRecipeDetailDialog()}
          setTransactionItemDeleteDialog={setTransactionItemDeleteDialog}
        />
      ) : null}
      <Card.Header
        className="sticky-top"
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <Stack direction="horizontal" gap={3}>
          <h1 className="m-0">Recipes</h1>
          <Button
            id="myButton"
            className="ms-auto"
            variant="success"
            size="sm"
            disabled={state === "pending"}
            onClick={() => setTransactionItemFormData({})}
          >
            <Icon path={mdiPlus} size={0.8} /> Add recipe
          </Button>
        </Stack>
      </Card.Header>
      <Card.Body className="px-0" style={{ position: "relative", top: "16px" }}>
        <div className="px-2">
          <h2 className="h5">Ingredients</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 28,
              marginBottom: 12,
            }}
          >
            <div>
              <div className="small fw-semibold mb-1">Contains</div>
              {[0, 1, 2].map((index) => (
                <Form.Select
                  key={index}
                  className="mb-2"
                  value={requiredIngredientIds[index]}
                  onChange={(event) =>
                    updateRequiredIngredientId(index, event.target.value)
                  }
                  disabled={state === "pending" || !data?.ingredientList?.length}
                >
                  <option value=""></option>
                  {data?.ingredientList?.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              ))}
            </div>
            <div>
              <div className="small fw-semibold mb-1">Does not contain</div>
              {[0, 1, 2].map((index) => (
                <Form.Select
                  key={index}
                  className="mb-2"
                  value={excludedIngredientIds[index]}
                  onChange={(event) =>
                    updateExcludedIngredientId(index, event.target.value)
                  }
                  disabled={state === "pending" || !data?.ingredientList?.length}
                >
                  <option value=""></option>
                  {data?.ingredientList?.map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </Form.Select>
              ))}
            </div>
          </div>
          <h3 className="h5">Recipes</h3>
        </div>
        {state === "pending" && !data
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {data ? (
          recipeList.length > 0 ? (
            <Table bordered hover size="sm" className="mb-0">
              <tbody>
              {filteredRecipeList.length > 0 ? (
                filteredRecipeList.map((item) => (
                  <TransactionItem
                    key={item.id}
                    item={item}
                    setRecipeDetailDialog={setRecipeDetailDialog}
                  />
                ))
              ) : (
                <tr>
                  <td>No recipes match the selected ingredient filters.</td>
                  <td style={{ width: 96 }} />
                </tr>
              )}
              </tbody>
            </Table>
          ) : (
            <div>No recipes have been created yet.</div>
          )
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default DashboardContent;
