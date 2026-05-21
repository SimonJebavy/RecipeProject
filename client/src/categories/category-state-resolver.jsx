import { useContext } from "react";
import { CategoryContext } from "./category-provider";
import Loading from "../common/loading";
import Error from "../common/error";
import CategoryList from "./category-list";

const CategoryStateResolver = () => {
  const { data, state, error } = useContext(CategoryContext);

  if (data) {
    return <CategoryList />;
  }

  if (state === "loading" && !data) {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Loading size={7} spin={4} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={6} spin={2} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={9} spin={6} />
        </div>
      </div>
    );
  }

  if (state === "error" && !data) {
    return <Error message={error} />;
  }
};

export default CategoryStateResolver;
