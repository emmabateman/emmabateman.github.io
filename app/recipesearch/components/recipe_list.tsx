"use client";

import { useState, useEffect } from "react";
import { Recipe, jsonToRecipe } from "./recipe";
import { RecipeCard } from "./recipe_card";
import { Pagination } from "./pagination";

const resultsPerPage: number = 10;

function RecipeList({
  myIngredients,
  addToShoppingList,
}: {
  myIngredients: JSON[];
  addToShoppingList: (_: string[]) => void;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [regions, setRegions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filtering, setFiltering] = useState<boolean>(false);

  const mealSearchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const mealFilterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php";
  const regionsUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  const lookupUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  const categoriesUrl =
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

  async function fetchRegions() {
    const response = await fetch(regionsUrl);
    if (!response.ok) {
      console.error(`Failed to fetch regions list: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      setRegions(data["meals"].map((a: JSON) => a["strArea"]));
    }
  }

  async function fetchCategories() {
    const response = await fetch(categoriesUrl);
    if (!response.ok) {
      console.error(`Failed to fetch categories list: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      setCategories(data["meals"].map((c: JSON) => c["strCategory"]));
    }
  }

  useEffect(() => {
    fetchRegions();
    fetchCategories();
  }, []);

  async function lookupRecipe(id: string): Promise<JSON | null> {
    const response = await fetch(lookupUrl + id);
    if (!response.ok) {
      console.error(`Failed to fetch recipe data: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      return data["meals"][0];
    }
    return null;
  }

  async function filterRecipesByRegion() {
    if (regionFilter == "") {
      if (categoryFilter) {
        filterRecipesByCategory();
      } else {
        searchRecipes();
      }
    }

    setFiltering(true);

    //filter already fetched recipes
    const newRecipes = recipes.filter((r: Recipe) => r.region == regionFilter);
    setRecipes(newRecipes.slice());

    //fetch more recipes
    const response = await fetch(mealFilterUrl + "?a=" + regionFilter);
    if (!response.ok) {
      console.error(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      for (const meal of data["meals"]) {
        if (
          meal["strMeal"].toLowerCase().search(searchText.toLowerCase()) >= 0 &&
          !newRecipes.find((r: Recipe) => r.id == meal["idMeal"])
        ) {
          const recipe = await lookupRecipe(meal["idMeal"]);
          if (!categoryFilter || recipe["strCategory"] == categoryFilter) {
            newRecipes.push(jsonToRecipe(recipe));
            setRecipes(newRecipes.slice());
          }
        }
      }
    }

    setFiltering(false);
  }

  async function filterRecipesByCategory() {
    if (categoryFilter == "") {
      if (regionFilter) {
        filterRecipesByRegion();
      } else {
        searchRecipes();
      }
    }

    setFiltering(true);

    //filter already fetched recipes
    const newRecipes = recipes.filter(
      (r: Recipe) => r.category == categoryFilter
    );
    setRecipes(newRecipes.slice());

    //fetch more recipes
    const response = await fetch(mealFilterUrl + "?c=" + categoryFilter);
    if (!response.ok) {
      console.error(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      for (const meal of data["meals"]) {
        if (
          meal["strMeal"].toLowerCase().search(searchText.toLowerCase()) >= 0 &&
          !newRecipes.find((r: Recipe) => r.id == meal["idMeal"])
        ) {
          const recipe = await lookupRecipe(meal["idMeal"]);
          if (!regionFilter || recipe["strArea"] == regionFilter) {
            newRecipes.push(jsonToRecipe(recipe));
            setRecipes(newRecipes.slice());
          }
        }
      }
    }

    setFiltering(false);
  }

  async function searchRecipes() {
    const response = await fetch(mealSearchUrl + searchText);
    if (!response.ok) {
      console.error(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();
    if (data["meals"]) {
      setRecipes(
        data["meals"]
          .filter(
            (r: JSON) =>
              (!regionFilter || r["strArea"] == regionFilter) &&
              (!categoryFilter || r["strCategory"] == categoryFilter)
          )
          .map((r: JSON) => jsonToRecipe(r))
      );
    } else {
      setRecipes([]);
    }
    setPageNumber(0);
  }

  useEffect(() => {
    filterRecipesByCategory();
  }, [categoryFilter]);

  useEffect(() => {
    filterRecipesByRegion();
  }, [regionFilter]);

  useEffect(() => {
    searchRecipes();
  }, [searchText]);

  useEffect(() => {
    if (pageNumber > recipes.length / resultsPerPage) {
      setPageNumber(0);
    }
  }, [recipes]);

  return (
    <div className="card p-4">
      <div className="input-group">
        <i className="bi bi-search input-group-text" />
        <input
          type="text"
          className="form-control"
          placeholder="Search for recipe name"
          aria-label="Search for recipe by name"
          onChange={(e) => setSearchText(e.target.value)}
          disabled={filtering}
        ></input>
        <button
          className="btn btn-outline-primary input-group-text"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-filter" />
        </button>
        <div className="dropdown-menu p-3">
          <label className="form-label" htmlFor="categorySelect">
            Category
          </label>
          <select
            className="form-select"
            disabled={filtering}
            id="categorySelect"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option key="none"></option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label className="form-label mt-4" htmlFor="regionSelect">
            Cuisine
          </label>
          <select
            className="form-select"
            disabled={filtering}
            id="regionSelect"
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option key="none"></option>
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
      <Pagination
        numResults={recipes.length}
        resultsPerPage={resultsPerPage}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      {recipes
        .slice(
          pageNumber * resultsPerPage,
          pageNumber * resultsPerPage + resultsPerPage
        )
        .map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            myIngredients={myIngredients}
            addToShoppingList={addToShoppingList}
          />
        ))}
      <Pagination
        numResults={recipes.length}
        resultsPerPage={resultsPerPage}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export { RecipeList };
