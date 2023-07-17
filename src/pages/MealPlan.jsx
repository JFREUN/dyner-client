import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AddMeal from "../components/AddMealDay";
import binIcon from "../images/icons8-waste-50.png";
import editIcon from "../images/icons8-edit-row-50.png";
import "../css/styles.css";
import { AuthContext } from "./../context/auth.context";
import breakfastIcon from "../images/Breakfast.png";

const API_URL = process.env.REACT_APP_API_URL || "https://jealous-blue-pocketbook.cyclic.app";

export default function MealPlan() {
  const [meals, setMeals] = useState([]);
  const [show, setShow] = useState(false);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext);

  const toggleShow = () => {
    setShow(!show);
  };

  const getMeals = () => {
    axios
      .get(`${API_URL}/api/meals`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setMeals(response.data);
        console.log("meals: ", response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (meals) {
      const updatedDays = [...days];
      meals.forEach((meal) => {
        const index = updatedDays.findIndex((day) => day === meal.day);
        if (index !== -1) {
          updatedDays.splice(index, 1, {
            day: meal.day,
            breakfast: meal.breakfast,
            lunch: meal.lunch,
            dinner: meal.dinner,
            id: meal._id,
          });
        }
      });
      console.log(days);
      setDays(updatedDays);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meals]);

  const handleDelete = (mealId) => {
    const updatedDays = [...days];

    axios
      .delete(`${API_URL}/api/meals/${mealId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        console.log("Item was deleted!", result);
        days.forEach((day) => {
          if (day.day) {
            const index = updatedDays.findIndex((day) => day.id === mealId); 
            if (index !== -1) {
              updatedDays.splice(index, 1, `${day.day}`);
            }
            setDays(updatedDays)
          }
        });
      })
      .catch((err) => console.log("This is a delete error: ", err));
  };

  return (
    <div className="mealplanPage">
      <div className="mealplanHeading">
        <div className="welcomeWrapper">
          {" "}
          <img src={breakfastIcon} alt="" />
          {user && (
            <h1>
              Welcome <span>{user.name}</span>!
            </h1>
          )}
        </div>
        <p>Create your new mealplan and have a nice week!</p>
        <div className="addAndDelete">
          <button className="mealButton" onClick={toggleShow}>
            {show ? "Hide Form" : "Add Meals"}
          </button>
        </div>
      </div>
      {show && (
        <AddMeal getMeals={getMeals} meals={meals} toggleShow={toggleShow} />
      )}
      <div className="mealplan">
        {meals &&
          days.map((day) => {
            return (
              <div className="dayColumn">
                {day.day ? <p>{day.day}</p> : <p>{day}</p>}
                {day.day && (
                  <div className="mealsContainer">
                    <div className="mealDiv">
                      <a href={`/recipes/${day.breakfast._id}`}>
                        {day.breakfast.name}
                      </a>
                      <img src={day.breakfast.imageUrl} alt="" />
                    </div>
                    <div className="mealDiv">
                      <a href={`/recipes/${day.lunch._id}`}>{day.lunch.name}</a>
                      <img src={day.lunch.imageUrl} alt="" />
                    </div>
                    <div className="mealDiv">
                      <a href={`/recipes/${day.dinner._id}`}>
                        {day.dinner.name}
                      </a>
                      <img src={day.dinner.imageUrl} alt="" />
                    </div>
                    <div className="buttonsContainer">
                      <Link
                        to={`/meals/edit/${day._id}`}
                        className="editButton"
                      >
                        <img src={editIcon} alt="" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(day.id)}
                        className="editButton"
                      >
                        <img src={binIcon} alt="" />
                      </button>
                    </div>
                  </div>
                )}
                {!day.day && (
                  <div className="noMealMessage">
                    {" "}
                    <span>Please add a new meal!</span>{" "}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
