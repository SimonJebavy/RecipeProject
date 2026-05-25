import Button from "react-bootstrap/Button";

function RecipeItem({ item, setRecipeDetailDialog }) {
  return (
    <tr>
      <td>{item.title}</td>
      <td style={{ width: 96, textAlign: "center" }}>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={() => setRecipeDetailDialog(item)}
        >
          Open
        </Button>
      </td>
    </tr>
  );
}

export default RecipeItem;
