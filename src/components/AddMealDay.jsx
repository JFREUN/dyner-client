import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import houseCook from "../images/house-cook.png"
import burger from "../images/Burger.png"

import "../css/styles.css";

const API_URL = process.env.REACT_APP_API_URL || "https://jealous-blue-pocketbook.cyclic.app";

export default function AddMeal(props) {
  const [day, setDay] = useState("");
  const [error, setError] = useState("");

  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const [allBreakfasts, setAllBreakfasts] = useState([]);
  const [allLunches, setAllLunches] = useState([]);
  const [allDinners, setAllDinners] = useState([]);

  const [breakfastSearch, setBreakfastSearch] = useState("");
  const [lunchSearch, setLunchSearch] = useState("");
  const [dinnerSearch, setDinnerSearch] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { day, breakfast, lunch, dinner, userId: user };
    const sameDay = props.meals.find((meal) => meal.day === day);

    if (sameDay) {
      return setError("Please choose a different day or delete exisiting day.");
    } else {
      return axios
        .post(`${API_URL}/api/meals`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log(
            "posted meal, breakfast, lunch, dinner:",
            response.data,
            breakfast,
            lunch,
            dinner
          );
          setBreakfast("");
          setLunch("");
          setDinner("");
          props.getMeals();
          props.toggleShow()
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (breakfastSearch) {
      axios
        .get(`${API_URL}/api/search?name=${breakfastSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllBreakfasts(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [breakfastSearch, storedToken]);

  useEffect(() => {
    if (lunchSearch) {
      axios
        .get(`${API_URL}/api/search?name=${lunchSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllLunches(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [lunchSearch, storedToken]);

  useEffect(() => {
    if (dinnerSearch) {
      axios
        .get(`${API_URL}/api/search?name=${dinnerSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllDinners(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [dinnerSearch,storedToken]);

  return (
    <div>
    <section className="addMealSection">
    <div className="formImgWrapper">
    <img src={houseCook} alt="" />
    </div>
    <div className="formWrapper">
      <form className="addMealDay" onSubmit={handleSubmit}>

      <div className="addMealHeader">

      <div className="burgerIconWrapper">
      <img src={burger} alt=""/> 
      </div>

      <h2>Add a Meal</h2>
      </div>
      
        <p>{error}</p>
        <label className="addMealLabels" htmlFor="selectDay">
          Day:
        </label>
        <select
          id="selectDay"
          name="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday"> Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <div className="mealSearch">
          <label className="addMealLabels" htmlFor="selectBreakfast">
            {" "}
            Breakfast:
          </label>
          <input
            className="addMealInputs"
            id="selectBreakfast"
            type="text"
            placeholder="Search Breakfast"
            value={breakfastSearch}
            onChange={(e) => setBreakfastSearch(e.target.value)}
          />
          {allBreakfasts.map((oneRecipe) => {
            return (
              <div key={oneRecipe._id} className="searchDiv">
                <p className="searchP">{oneRecipe.name}</p>
                <button
                  className="searchButton breakfastButton"
                  type="button"
                  onClick={() => setBreakfast(oneRecipe._id)}
                >
                  Select
                </button>
              </div>
            );
          })}

          <label className="addMealLabels" htmlFor="selectLunch">
            {" "}
            Lunch:
          </label>
          <input
            className="addMealInputs"
            id="selectLunch"
            type="text"
            placeholder="Search Lunch"
            value={lunchSearch}
            onChange={(e) => setLunchSearch(e.target.value)}
          />
          {allLunches.map((oneRecipe) => {
            return (
              <div key={oneRecipe._id} className="searchDiv">
                <p className="searchP">{oneRecipe.name}</p>
                <button
                  className="searchButton lunchButton"
                  type="button"
                  onClick={() => setLunch(oneRecipe._id)}
                >
                  Select
                </button>
              </div>
            );
          })}
          <label className="addMealLabels" htmlFor="selectDinner">
            {" "}
            Dinner:
          </label>
          <input
            className="addMealInputs"
            id="selectDinner"
            type="text"
            placeholder="Search Dinner"
            value={dinnerSearch}
            onChange={(e) => setDinnerSearch(e.target.value)}
          />
          {allDinners.map((oneRecipe) => {
            return (
              <div key={oneRecipe._id} className="searchDiv">
                <p className="searchP">{oneRecipe.name}</p>
                <button
                  className="searchButton dinnerButton"
                  type="button"
                  onClick={() => setDinner(oneRecipe._id)}
                >
                  Select
                </button>
              </div>
            );
          })}
        </div>

        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
      </div>
      </section>
    </div>
    
  );
}
