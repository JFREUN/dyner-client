import React from "react";
import { useState, useEffect, useContext } from "react";
import "../css/styles.css";
import { AuthContext } from "./../context/auth.context";

import axios from "axios";
import "../css/styles.css";
import ShoppingList from "../components/ShoppingList";
import saladIcon from "../images/Salad.svg";
import breakfastIcon from "../images/Breakfast.png";

const API_URL = process.env.REACT_APP_API_URL || "https://jealous-blue-pocketbook.cyclic.app";

export default function FridgePage() {
  const [ingredients, setIngredients] = useState([]);
  const [show, setShow] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const toggleShow = () => {
    setShow(!show);
  };
  const refreshIngredients = () => {
    axios
      .get(`${API_URL}/api/ingredients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInstock = (id) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient._id === id) {
        return { ...ingredient, inStock: !ingredient.inStock };
      }
      return ingredient;
    });
  
    setIngredients(updatedIngredients);
  
    const ingredientToUpdate = updatedIngredients.find(
      (ingredient) => ingredient._id === id
    );
  
    if (ingredientToUpdate) {
      const requestBody = {
        inStock: ingredientToUpdate.inStock
      };
  
      axios
        .put(`${API_URL}/api/ingredients/${id}`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .catch((err) =>
          console.log("This is an ingredient update error: ", err)
        );
    }
  };
  

  return (
    <div className="fridgeSection">
      <div className="fridgeLeft">
        <div className="mealplanHeading" id="fridgeHeading">
          <div className="welcomeWrapper">
            {" "}
            <img src={breakfastIcon} alt="" />
            <h1>
              Welcome <span>{user.name}</span>!
            </h1>
          </div>
          <p>Select whether your groceries are <span className="greenSpan">In Stock</span> or <span className="redSpan">Out of Stock</span>.</p>
          <div className="addAndDelete">
            <button className="mealButton" onClick={toggleShow}>
              {show ? "Hide List" : "Shopping List"}
            </button>
          </div>
        </div>
        {show && (
          <ShoppingList
            ingredients={ingredients}
            refreshIngredients={refreshIngredients}
            handleInstock={handleInstock}
          ></ShoppingList>
        )}
      </div>

      <div className="ingredientsContainer">
        
        <div className="ingredientsList">
        <h2>Groceries</h2>
        <div className="ingredientsWrapper">
          {ingredients.map((ingredient) => (
            <div className="ingredientsDiv" key={ingredient._id}>
              <img src={saladIcon} alt="" />
              <p>{ingredient.name}</p>

              {ingredient.inStock && (
                <button
                  onClick={() => handleInstock(ingredient._id)}
                  style={{ backgroundColor: "#5C8D89" }}
                >
                  In Stock
                </button>
              )}
              {!ingredient.inStock && (
                <button
                  onClick={() => handleInstock(ingredient._id)}
                  style={{ backgroundColor: "#89375F" }}
                >
                  Out of Stock
                </button>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
