import { createContext, useState, useEffect } from "react";

import FetchHelper from "../fetch-helper.js";

export const TransactionListContext = createContext();

function TransactionListProvider({ children }) {
  const [transactionListDto, setTransactionListDto] = useState({
    state: "ready",
    data: null,
    error: null,
  });

  async function handleLoad() {
    setTransactionListDto((current) => {
      return { ...current, data: undefined, state: "pending" };
    });

    const [recipeResult, ingredientResult] = await Promise.all([
      FetchHelper.recipe.list(),
      FetchHelper.ingredient.list(),
    ]);

    setTransactionListDto((current) => {
      if (recipeResult.ok && ingredientResult.ok) {
        return {
          ...current,
          state: "ready",
          data: {
            itemList: recipeResult.data.itemList,
            ingredientList: ingredientResult.data.itemList,
          },
          error: null,
        };
      }

      return {
        ...current,
        state: "error",
        error: recipeResult.ok ? ingredientResult.data : recipeResult.data,
      };
    });
  }

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  /* eslint-enable */

  async function handleCreate(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.recipe.create(dtoIn);
    setTransactionListDto((current) => {
      if (result.ok) {
        current.data.itemList.push(result.data);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      }

      return { ...current, state: "error", error: result.data };
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleDelete(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.recipe.delete(dtoIn);
    setTransactionListDto((current) => {
      if (result.ok) {
        const itemIndex = current.data.itemList.findIndex(
          (item) => item.id === dtoIn.id
        );
        current.data.itemList.splice(itemIndex, 1);
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      }

      return { ...current, state: "error", error: result.data };
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  const value = {
    ...transactionListDto,
    handlerMap: { handleLoad, handleCreate, handleDelete },
  };

  return (
    <TransactionListContext.Provider value={value}>
      {children}
    </TransactionListContext.Provider>
  );
}

export default TransactionListProvider;
