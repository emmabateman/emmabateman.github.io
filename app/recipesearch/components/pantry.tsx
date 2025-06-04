"use client";

import { useState, useEffect } from "react";

function SearchBar({
  ingredientData,
  isInMyIngredients,
  handleAddIngredient,
}: {
  ingredientData: JSON[];
  isInMyIngredients: (_: JSON) => boolean;
  handleAddIngredient: (_: JSON) => void;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<JSON[]>([]);

  //update filter
  useEffect(() => {
    setSearchResult(
      ingredientData.filter(
        (x) =>
          x["strIngredient"].toLowerCase().includes(searchText.toLowerCase()) &&
          !isInMyIngredients(x)
      )
    );
  }, [searchText, ingredientData]);

  function onAddIngredientClicked(ingredient) {
    handleAddIngredient(ingredient);
    setSearchResult(
      searchResult.filter(
        (x) => x["idIngredient"] != ingredient["idIngredient"]
      )
    );
  }

  return (
    <div>
      <div
        className="input-group"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        <i className="bi bi-search input-group-text" />
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Ingredient search"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
      </div>
      <div className="dropdown-menu">
        {searchResult.slice(0, 10).map((ingredient) => (
          <div key={ingredient["idIngredient"]} className="dropdown-item-text">
            <button
              className="btn btn-sm text-primary"
              title="Add"
              aria-label="Add"
              onClick={() => onAddIngredientClicked(ingredient)}
            >
              <i className="bi bi-plus-lg" />
            </button>
            {ingredient["strIngredient"]}
          </div>
        ))}
      </div>
    </div>
  );
}

function IngredientList({
  ingredients,
  handleRemoveIngredient,
}: {
  ingredients: JSON[];
  handleRemoveIngredient: (_: JSON) => void;
}) {
  return (
    <ul className="list-group mt-4">
      {ingredients.map((ingredient) => (
        <li key={ingredient["idIngredient"]} className="list-group-item">
          {ingredient["strIngredient"]}
          <button
            className="btn btn-sm float-end text-danger"
            title="Remove"
            aria-label="Remove"
            onClick={() => handleRemoveIngredient(ingredient)}
          >
            <i className="bi bi-x-lg" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Pantry({
  myIngredients,
  setMyIngredients,
  addIngredient,
  ingredientData,
  setIngredientData,
  cookies,
  setCookie,
}: {
  myIngredients: JSON[];
  setMyIngredients: (ingredients: JSON[]) => void;
  addIngredient: (ingredient: JSON) => void;
  ingredientData: JSON[];
  setIngredientData: (data: JSON[]) => void;
  cookies: object;
  setCookie: (name: string, value: string[]) => void;
}) {
  const ingredientUrl =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  async function loadIngredientData() {
    const response = await fetch(ingredientUrl);
    if (!response.ok) {
      console.log(`Failed to fetch ingredient list: ${response.status}`);
    }
    const data = await response.json();
    setIngredientData(data["meals"]);
    if (cookies["my-ingredients"]) {
      setMyIngredients(
        cookies["my-ingredients"].map((id) =>
          data["meals"].find((x) => x["idIngredient"] == id)
        )
      );
    }
  }

  //fetch ingredient data on mount
  useEffect(() => {
    loadIngredientData();
  }, []);

  function removeIngredient(ingredient: JSON) {
    const newIngredients = new Set(myIngredients);
    newIngredients.delete(ingredient);
    setMyIngredients([...newIngredients]);
    setCookie(
      "my-ingredients",
      [...newIngredients].map((ingredient) => ingredient["idIngredient"])
    );
  }

  function isInMyIngredients(ingredient: JSON): boolean {
    return myIngredients.includes(ingredient);
  }

  return (
    <div className="card p-4">
      <h4>Your Ingredients</h4>
      <SearchBar
        ingredientData={ingredientData}
        isInMyIngredients={isInMyIngredients}
        handleAddIngredient={addIngredient}
      />
      <IngredientList
        ingredients={myIngredients}
        handleRemoveIngredient={removeIngredient}
      />
    </div>
  );
}

export { Pantry };
