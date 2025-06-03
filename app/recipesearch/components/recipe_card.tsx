"use client";

import { useState } from "react";

import { Recipe, Ingredient } from "./recipe";

function RecipeCard({
  recipe,
  myIngredients,
  addToShoppingList,
}: {
  recipe: Recipe;
  myIngredients: JSON[];
  addToShoppingList: (_: string[]) => void;
}) {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  function numMatchingIngredients(): number {
    return recipe.ingredients.filter((i) =>
      myIngredients
        .map((j) => j["strIngredient"].toLowerCase())
        .includes(i.name.toLowerCase())
    ).length;
  }

  function addMissingToShoppingList(ingredients: Ingredient[]) {
    addToShoppingList(
      ingredients
        .map((x) => x.name)
        .filter(
          (x) =>
            !myIngredients
              .map((i) => i["strIngredient"].toLowerCase())
              .includes(x.toLowerCase())
        )
    );
  }

  return (
    <div className="card mb-4 text-start">
      <div className="row">
        <div className="col-md-4">
          <div className="container d-flex h-100 w-100 align-items-start mt-4">
            <img className="img-fluid" src={recipe.thumbnailUrl} alt={recipe.name} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <button
              className="btn btn-light float-end"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-three-dots-vertical" />
            </button>
            <div className="dropdown-menu">
              <div
                className="dropdown-item-text btn btn-light"
                onClick={() => addMissingToShoppingList(recipe.ingredients)}
              >
                Add missing ingredients to shopping list
              </div>
              <div
                hidden={showInstructions}
                className="dropdown-item-text btn btn-light"
                onClick={() => setShowInstructions(true)}
              >
                Show instructions
              </div>
              <div
                hidden={!showInstructions}
                className="dropdown-item-text btn btn-light"
                onClick={() => setShowInstructions(false)}
              >
                Hide instructions
              </div>
            </div>
            <div>
              <h4 className="card-title" hidden={!recipe.sourceUrl}>
                <a href={recipe.sourceUrl} target="_blank">
                  {recipe.name}
                </a>
              </h4>
              <h4 className="card-title" hidden={recipe.sourceUrl != ""}>
                {recipe.name}
              </h4>
              <h6 className="card-text">{recipe.category}</h6>
              <h6 className="card-text">{recipe.region}</h6>
              <p className="card-text" hidden={showInstructions}>
                {recipe.ingredients.map((x) => x.name).join(", ")}
              </p>
              <p className="card-text">
                You have {numMatchingIngredients()} out of{" "}
                {recipe.ingredients.length} ingredients
              </p>
              {recipe.ingredients.map((ingredient, i) => (
                <p className="card-text" key={i} hidden={!showInstructions}>
                  {ingredient.name}: {ingredient.measure}
                </p>
              ))}
              {recipe.instructions.split("\n").map((line, i) => (
                <p className="card-text" key={i} hidden={!showInstructions}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RecipeCard };
