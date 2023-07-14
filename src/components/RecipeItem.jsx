import React from "react";

const RecipeItem = ({ recipe }) => {
  return (
    <div
      style={{
        textAlign: "left",
        background: "rgb(231 214 175)",
        borderRadius: "20px",
        padding: "1rem 2rem",
        margin: "1rem",
        display: "flex",
      }}
    >
      <div style={{ width: "50%" }}>
        {recipe.image ? (<img src={recipe.image} alt="recipe"/>) : null }
        <h3>{recipe.title}</h3>

        <ul>{recipe.tags ? recipe.tags.map((tag) => <li>{tag}</li>) : null}</ul>
        <p>{recipe.preparation}</p>
        <p>Time: {recipe.time} minutes</p>
      </div>
      <div style={{ width: "50%" }}>
        <h4>Ingredients: </h4>
        <ul>
          {recipe.ingredients && recipe.ingredients.length
            ? recipe.ingredients.map(({ name, quantity, units }) => (
                <li key={name}>
                  {name} : {quantity}
                  {units}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default RecipeItem;
