import React from "react";
import AddRecipe from "../components/AddRecipe";
import { useState, useEffect, useContext } from "react";
import service from "../api/service";
import "../css/styles.css";
import { Link } from "react-router-dom";
import recipeImage from "../images/Sandwich.svg";
import { AuthContext } from "./../context/auth.context";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);

  const refreshRecipes = () => {
    service
      .getRecipes()
      .then((data) => {
        // console.log("data", data);
        setRecipes(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshRecipes();
  }, []);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="recipePage">
      <div className="mealplanHeading">
        <div className="welcomeWrapper">
          {" "}
          <img src={recipeImage} alt="" />
          <h1>
            Welcome <span className="welcome-recipe-span">{user.name}</span>!
          </h1>
        </div>

        <p>Add your recipe and have a nice week!</p>
        <div className="addAndDelete">
          <button onClick={toggleShowForm} className="mealButton">
            {showForm ? "Hide Form" : "Add Recipe"}
          </button>
        </div>
      </div>

      <AddRecipe refreshRecipes={refreshRecipes} showForm={showForm} />

      <div className="recipe-list-container">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-container">
            <h3>{recipe.name}</h3>
            <img src={recipe.imageUrl} alt="recipe" />
            <Link className="linkDetail" to={`/recipes/${recipe._id}`}>
              {" "}
              Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
