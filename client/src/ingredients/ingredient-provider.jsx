import { createContext, useState, useEffect, useCallback } from "react";

export const IngredientContext = createContext();

const readErrorMessage = async (response) => {
  try {
    const errorData = await response.json();
    return (
      errorData.message ||
      errorData.error?.message ||
      "Request failed. Please try again."
    );
  } catch {
    return response.statusText || "Request failed. Please try again.";
  }
};

const IngredientProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState();

  const ingredientExists = (name) => {
    return data?.itemList?.some(
      (ingredient) =>
        ingredient.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

  const fetchIngredients = useCallback(async () => {
    setState("loading");
    const response = await fetch("/ingredient/list");
    if (response.ok) {
      const data = await response.json();
      setData(data);
      setError(undefined);
      setState("success");
    } else {
      setError(await readErrorMessage(response));
      setState("error");
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleCreate = async (name) => {
    if (ingredientExists(name)) {
      setError(`Ingredient "${name.trim()}" already exists.`);
      setState("errorCreating");
      return { ok: false };
    }

    setState("creating");
    const response = await fetch("/ingredient/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newIngredient = await response.json();
      setData((currentData) => {
        currentData.itemList.push(newIngredient);
        return { ...currentData };
      });
      setError(undefined);
      setState("success");
      return { ok: true };
    } else {
      setError(await readErrorMessage(response));
      setState("errorCreating");
      return { ok: false };
    }
  };

  const handleDelete = async (id) => {
    setState("deleting_" + id);
    const response = await fetch("/ingredient/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await response.json();
      setData((currentData) => {
        const itemIndex = currentData.itemList.findIndex(
          (item) => item.id === id
        );
        currentData.itemList.splice(itemIndex, 1);
        return { ...currentData };
      });
      setError(undefined);
      setState("success");
    } else {
      setError(await readErrorMessage(response));
      setState("errorDeleting");
    }
  };

  return (
    <IngredientContext.Provider
      value={{
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleDelete,
          fetchIngredients,
        },
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
