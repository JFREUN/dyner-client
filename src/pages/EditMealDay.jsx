import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import "../css/styles.css";
import burger from "../images/Burger.png";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function AddMeal(props) {
  const [day, setDay] = useState("");

  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const [allBreakfasts, setAllBreakfasts] = useState([]);
  const [allLunches, setAllLunches] = useState([]);
  const [allDinners, setAllDinners] = useState([]);

  const [breakfastSearch, setBreakfastSearch] = useState("");
  const [lunchSearch, setLunchSearch] = useState("");
  const [dinnerSearch, setDinnerSearch] = useState("");

  const { mealId } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/meals/${mealId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        const oneMeal = response.data;
        setDay(oneMeal.day);
        setBreakfast(oneMeal.breakfast);
        setLunch(oneMeal.lunch);
        setDinner(oneMeal.dinner);
      })
      .catch((error) => console.log(error));
  }, [mealId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { day, breakfast, lunch, dinner, userId: user };

    axios
      .put(`${API_URL}/api/meals/${mealId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Changed a meal.");
        navigate("/meals");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (breakfastSearch) {
      axios
        .get(`${API_URL}/api/search?name=${breakfastSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllBreakfasts(response.data);
        });
    }
  }, [breakfastSearch]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (lunchSearch) {
      axios
        .get(`${API_URL}/api/search?name=${lunchSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllLunches(response.data);
        });
    }
  }, [lunchSearch]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (dinnerSearch) {
      axios
        .get(`${API_URL}/api/search?name=${dinnerSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setAllDinners(response.data);
        });
    }
  }, [dinnerSearch]);

  return (
    <div>
    <section className="addMealSection">

    <div className="editWrapper">
      <div className="editMeals">
        <div>
          <h3>Breakfast:</h3>
          <img src={breakfast.imageUrl} alt="" />
          <p>{breakfast.name}</p>
        </div>
        <div>
          <h3>Lunch:</h3>
          <img src={lunch.imageUrl} alt="" />
          <p>{breakfast.name}</p>
        </div>
        <div>
          <h3>Dinner:</h3>
          <img src={dinner.imageUrl} alt="" />
          <p>{dinner.name}</p>
        </div>
      </div>
      </div>

      <div className="formWrapper">
      
      <form className="addMealDay" onSubmit={handleSubmit}>
      <div className="addMealHeader">

      <div className="burgerIconWrapper">
      <img src={burger} alt=""/> 
      </div>

      <h2>Edit {day}'s meal:</h2>
      </div>
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
          <label className="editMealLabels" htmlFor="selectBreakfast">
            {" "}
            Your breakfast: <b> {breakfast.name}</b>
          </label>
          <input
            className="addMealInputs"
            id="selectBreakfast"
            type="text"
            placeholder="Set breakfast"
            value={breakfastSearch}
            onChange={(e) => setBreakfastSearch(e.target.value)}
          />
          {allBreakfasts.map((oneRecipe) => {
            return (
              <div key={oneRecipe._id} className="searchDiv">
                <p className="searchP">{oneRecipe.name}</p>
                <button
                  className="searchButton"
                  type="button"
                  onClick={() => setBreakfast(oneRecipe._id)}
                >
                  Select
                </button>
              </div>
            );
          })}

          <label className="editMealLabels" htmlFor="selectLunch">
            {" "}
            Your lunch: <b>{lunch.name} </b>
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
                  className="searchButton"
                  type="button"
                  onClick={() => setLunch(oneRecipe._id)}
                >
                  Select
                </button>
              </div>
            );
          })}
          <label className="editMealLabels" htmlFor="selectDinner">
            {" "}
            Your dinner: <b>{dinner.name}</b>
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
                  className="searchButton"
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
