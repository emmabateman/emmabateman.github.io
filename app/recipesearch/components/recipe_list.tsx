'use client'

import { useState, useEffect } from 'react';
import { Recipe, jsonToRecipe } from './recipe';
import { RecipeCard } from './recipe_card';

const resultsPerPage: number = 10;

function RecipeList({ myIngredients, addToShoppingList }:
		    { myIngredients: JSON[], addToShoppingList: (items: string[]) => void }) {
  const [searchText, setSearchText] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="

  async function searchRecipes() {
    const response = await fetch(mealSearchUrl + searchText);
    if (!response.ok) {
      console.log(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      setRecipes(data["meals"].map((r) => jsonToRecipe(r)));
    } else {
      setRecipes([]);
    }
    setPageNumber(0);
  }

  useEffect(() => {
    searchRecipes();
  }, [searchText]);

  return (
    <div className="card p-4">
      <div className="input-group">
        <i className="bi bi-search input-group-text" />
        <input type="text" className="form-control" placeholder="Search for recipe name"
               aria-label="Search for recipe by name"
	       onChange={(e) => setSearchText(e.target.value)}></input>
      </div>
      <ul className="pagination mt-2">
        <li className={`page-item ${pageNumber == 0 ? "disabled": ""}`}>
          <a className="page-link" href="#" aria-label="Previous"
	     onClick={() => setPageNumber(pageNumber - 1)}>
            <i className="bi bi-chevron-left"/>
          </a>
        </li>
        {[...new Array(Math.ceil(recipes.length / resultsPerPage)).keys()].map((page) =>
          <li className={`page-item ${pageNumber == page ? "active": ""}`} key={page}>
 	    <a className="page-link" href="#" aria-label={(page+1).toString()} 
	       onClick={() => setPageNumber(page)}>
	       {page+1}
	    </a>
	  </li>
        )}
        <li className={`page-item
	        ${(pageNumber + 1) * resultsPerPage > recipes.length ? "disabled": ""}`}>
	  <a className="page-link" href="#" aria-label="Previous"
	      onClick={() => setPageNumber(pageNumber + 1)}>
	    <i className="bi bi-chevron-right"/>
 	  </a>
        </li>
      </ul>
      {recipes.slice(pageNumber*resultsPerPage,
		     pageNumber*resultsPerPage + resultsPerPage
		    ).map((recipe) =>
        <RecipeCard key={recipe.id} recipe={recipe} myIngredients={myIngredients}
		    addToShoppingList={addToShoppingList}/>
      )}
    </div>
  );
}

export { RecipeList };
