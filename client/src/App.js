import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Ingredients from "./ingredients/ingredients.jsx";
import RecipeList from "./recipe/recipe-list";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<RecipeList />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
