import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import SignUp from "./pages/SignUp";
import EditRecipe from "./pages/EditRecipe";
import MealPlan from "./pages/MealPlan";
import EditMeal from "./pages/EditMealDay";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import FridgePage from "./pages/FridgePage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignUp />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <Login />{" "}
            </IsAnon>
          }
        />

        <Route
          path="/recipes"
          element={
            <IsPrivate>
              <Recipes />
            </IsPrivate>
          }
        />
        <Route
          path="/recipes/:recipeId"
          element={
            <IsPrivate>
              <RecipeDetail />
            </IsPrivate>
          }
        />
        <Route
          path="/recipes/edit/:recipeId"
          element={
            <IsPrivate>
              <EditRecipe />
            </IsPrivate>
          }
        />
        <Route
          path="/meals"
          element={
            <IsPrivate>
              <MealPlan />
            </IsPrivate>
          }
        />
        <Route
          path="/meals/edit/:mealId"
          element={
            <IsPrivate>
              <EditMeal />
            </IsPrivate>
          }
        />
        <Route
          path="/ingredients"
          element={
            <IsPrivate>
              <FridgePage />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
