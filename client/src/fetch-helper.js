async function Call(baseUri, useCase, dtoIn, method) {
    // return fetch
    let response;
    if (!method || method === "get") {
        response = await fetch(
            `${baseUri}/${useCase}${
                dtoIn && Object.keys(dtoIn).length
                    ? `?${new URLSearchParams(dtoIn)}`
                    : ""
            }`,
        );
    } else {
        response = await fetch(`${baseUri}/${useCase}`, {
            method: method.toUpperCase(),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
    }
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
    recipe: {
        get: async (dtoIn) => {
            return await Call(baseUri, "recipe/get", dtoIn, "get");
        },
        create: async (dtoIn) => {
            return await Call(baseUri, "recipe/create", dtoIn, "post");
        },
        delete: async (dtoIn) => {
            return await Call(baseUri, "recipe/delete", dtoIn, "post");
        },
        list: async (dtoIn) => {
            return await Call(baseUri, "recipe/list", dtoIn, "get");
        },
    },

    ingredient: {
        create: async (dtoIn) => {
            return await Call(baseUri, "ingredient/create", dtoIn, "post");
        },
        delete: async (dtoIn) => {
            return await Call(baseUri, "ingredient/delete", dtoIn, "post");
        },
        list: async () => {
            return await Call(baseUri, "ingredient/list", null, "get");
        },
    },
};

export default FetchHelper;
