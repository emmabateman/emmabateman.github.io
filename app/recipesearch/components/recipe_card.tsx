import { Recipe, Ingredient } from './recipe'

function RecipeCard({ recipe, myIngredients, addToShoppingList }:
		    { recipe: Recipe, myIngredients: JSON[],
			    addToShoppingList: (items: string[]) => void }) {
  function numMatchingIngredients() : bool{
    return myIngredients.filter((x) =>
				recipe.ingredients.map((i) => i.name.toLowerCase())
				.includes(x["strIngredient"].toLowerCase()))
			.length;
  }

  function addMissingToShoppingList(ingredients: Ingredient[]) {
    addToShoppingList(ingredients.map((x) => x.name)
		      .filter((x) => !myIngredients.map((i) => 
						       i["strIngredient"].toLowerCase())
						       .includes(x.toLowerCase())))
  }

  return (
    <div className="card mb-4 text-start">
      <div className="row">
        <div className="col-md-4">
	  <div className="container d-flex h-100 w-100 align-items-center">
            <img className="img-fluid" src={ recipe.thumbnail }/>
	  </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
	    <button className="btn btn-light float-end" data-bs-toggle="dropdown">
	      <i className="bi bi-three-dots-vertical"/>
	    </button>
	    <div className="dropdown-menu">
	      <div className="dropdown-item-text btn btn-light"
	           onClick={() => addMissingToShoppingList(recipe.ingredients)}>
	        Add missing ingredients to shopping list
	      </div>
	    </div>
            <h4 className="card-title">{ recipe.name }</h4>
	    <h6 className="card-text">{ recipe.category }</h6>
	    <h6 className="card-text">{ recipe.region }</h6>
	    <p className="card-text">{ recipe.ingredients.map((x) => x.name).join(", ") }</p>
	    <p className="card-text">
	      You have { numMatchingIngredients() } out
	      of { recipe.ingredients.length } ingredients
	    </p>
          </div>
	</div>
      </div>
    </div>
  );
}

export { RecipeCard };
