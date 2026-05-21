import { CategoryContext } from "./category-provider";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { mdiPlus, mdiLoading, mdiDeleteOutline } from "@mdi/js";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";

function Category({ data }) {
  const { state, handlerMap } = useContext(CategoryContext);
  const [name, setName] = useState("");
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const handleCreate = async () => {
    const result = await handlerMap.handleCreate(name);
    if (result?.ok) {
      setName("");
    }
  };

  return (
    <>
      {showDeleteConfirmationDialog && (
        <DeleteConfirmationDialog
          showDeleteConfirmationDialog={showDeleteConfirmationDialog}
          setShowDeleteConfirmationDialog={setShowDeleteConfirmationDialog}
          handleDelete={handlerMap.handleDelete}
        />
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 84px",
          gap: 8,
          margin: "4px 0",
        }}
      >
        <div>
          {data?.id ? (
            <Form.Control type="text" value={data.name} disabled />
          ) : (
            <Form.Control
              type="text"
              placeholder="Ingredient name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={state === "creating"}
            />
          )}
        </div>
        <div>
          {!data?.id ? (
            <Button
              variant="success"
              onClick={handleCreate}
              size="sm"
              disabled={!name || state === "creating"}
            >
              <Icon
                path={state === "creating" ? mdiLoading : mdiPlus}
                size={1}
                spin={state === "creating"}
              />
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              disabled={state === "deleting_" + data.id}
              onClick={() => {
                setShowDeleteConfirmationDialog(data);
              }}
            >
              <Icon path={mdiDeleteOutline} size={1} />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Category;
