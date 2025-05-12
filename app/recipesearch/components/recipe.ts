interface Ingredient {
  name: string,
  measure: string
}

interface Recipe {
  id: number,
  name: string,
  thumbnailUrl: string,
  category?: string,
  region?: string,
  ingredients?: Ingredient[],
  instructions?: string,
}

function jsonToRecipe(data: JSON) : Recipe {
  let recipe : Recipe = {
    id: data["idMeal"],
    name: data["strMeal"],
    category: data["strCategory"],
    region: data["strArea"],
    ingredients: [],
    instructions: data["strInstructions"],
    thumbnail: data["strMealThumb"]
  }

  for (let i = 1; data[`strIngredient${i}`]; i++) {
    recipe.ingredients.push({
	    name: data[`strIngredient${i}`],
	    measure: data[`strMeasure${i}`]
    });
  }

  return recipe;
}

export { Recipe, jsonToRecipe }
