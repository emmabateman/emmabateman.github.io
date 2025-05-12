'use client'

import { useState, useEffect } from 'react';

function SearchBar({ isInMyIngredients, handleAddIngredient }:
		   { isInMyIngredients: (ingredient: JSON) => boolean,
		   handleAddIngredient: (ingredient: JSON) => void }) {
  const [ingredientData, setIngredientData] = useState<JSON[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<JSON[]>([]);

  const ingredientUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  async function loadIngredientData() {
    const response = await fetch(ingredientUrl);
    if (!response.ok) {
      console.log(`Failed to fetch ingredient list: ${response.status}`);
    }
    const data = await response.json();
    setIngredientData(data["meals"]);
    setSearchResult(data["meals"].filter((x) =>
      !isInMyIngredients(x)
    ));
  }

  //fetch ingredient data on mount
  useEffect(() => {
    loadIngredientData();
  }, []);

  //update filter
  useEffect(() => {
    setSearchResult(ingredientData.filter((x) =>
      x["strIngredient"].toLowerCase().includes(searchText.toLowerCase()) &&
	      !isInMyIngredients(x)
    ));
  }, [searchText]);

  function onAddIngredientClicked(ingredient) {
    handleAddIngredient(ingredient);
    setSearchResult(searchResult.filter((x) =>
		x["idIngredient"] != ingredient["idIngredient"]));
  }

  return (
    <div>
      <div className="input-group" data-bs-toggle="dropdown"
           aria-expanded="false" data-bs-auto-close="outside">
        <i className="bi bi-search input-group-text"/>
	<input type="text" className="form-control" placeholder="Search"
	       area-label="Ingredient search"
	       onChange={(e) => setSearchText(e.target.value)}></input>
      </div>
      <div className="dropdown-menu">
        {searchResult.slice(0, 10).map(ingredient =>
	  <div key={ingredient["idIngredient"]} className="dropdown-item-text">
	    <button className="btn" onClick={() => onAddIngredientClicked(ingredient)}>
	      <i className="bi bi-plus"/>
	    </button>
	    {ingredient["strIngredient"]}
	  </div>
	)}
      </div>
    </div>
  );
}

function IngredientList({ ingredients }: { ingredients: JSON[] }) {
  return (
    <ul className="list-group mt-4">
      {ingredients.map((ingredient) =>
        <li key={ingredient["idIngredient"]} className="list-group-item">
	  {ingredient["strIngredient"]}
	</li>
      )}
    </ul>
  );
}

function Pantry({ myIngredients, setMyIngredients }:
		{ myIngredients: JSON[],
			setMyIngredients: (ingredients: JSON[]) => void}) {

  function addIngredient(ingredient: JSON) : void {
    let newIngredients = new Set(myIngredients);
    newIngredients.add(ingredient);
    setMyIngredients([...newIngredients]);
  }

  function isInMyIngredients(ingredient: JSON) : boolean {
    return myIngredients.includes(ingredient);
  }

  return (
    <div className="card p-4">
      <h4>Your Ingredients</h4>
      <SearchBar isInMyIngredients={ isInMyIngredients } handleAddIngredient={ addIngredient }/>
      <IngredientList ingredients={ myIngredients }/>
    </div>
  );
}

export { Pantry };
