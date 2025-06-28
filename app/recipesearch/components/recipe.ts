interface Ingredient {
  name: string;
  measure: string;
}

interface Recipe {
  id: number;
  name: string;
  thumbnailUrl: string;
  sourceUrl?: string;
  category?: string;
  region?: string;
  ingredients?: Ingredient[];
  instructions?: string;
}

function jsonToRecipe(data: JSON): Recipe {
  const recipe: Recipe = {
    id: data["idMeal"],
    name: data["strMeal"],
    category: data["strCategory"] || "",
    region: data["strArea"] || "",
    ingredients: [],
    instructions: data["strInstructions"] || "",
    thumbnailUrl: data["strMealThumb"],
    sourceUrl: data["strSource"] || data["strYoutube"],
  };

  for (let i = 1; data[`strIngredient${i}`]; i++) {
    recipe.ingredients.push({
      name: data[`strIngredient${i}`],
      measure: data[`strMeasure${i}`],
    });
  }

  return recipe;
}

export type { Recipe, Ingredient };
export { jsonToRecipe };