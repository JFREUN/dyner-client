
import React from 'react'
import { useEffect, useState } from 'react'

export default function ShoppingList(props) {
    const[toBuy, setToBuy] = useState([]);

    useEffect(() => {
        const missingIngredients= props.ingredients.filter((ingredient) => {
            return ingredient.inStock === false
        })
        setToBuy(missingIngredients)
    },[props.ingredients])


  return (
    <div className="shoppingList">
    <h3>Shopping List</h3>
    <div className='listWrapper'>
    {toBuy.map((ingredient) => {
        return (
            <div key={ingredient._id} className="listItem" onChange={() => props.handleInstock(ingredient._id)}>
            <input type="checkbox" id="listCheck" />
            <label htmlFor="listCheck">{ingredient.name}</label>           
            </div>
            )      
      })}
      </div>
   
    </div>
  )
}

