import React from 'react';

const RecipeItem = ({ recipe }) => {
    return (
        <div>
            <h3>{recipe.title}</h3>
            <p>{recipe.preparation}</p>
            <p>Time: {recipe.time} minutes</p>
            <ul>
              {recipe.ingredients.map(({ name, quantity, units }) => (
                <li key={name}>
                  {name} : {quantity}
                  {units}
                </li>
              ))}
            </ul>
        </div>
    );
};

export default RecipeItem;