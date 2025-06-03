"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Pantry } from "./components/pantry";
import { ShoppingList } from "./components/shopping_list";
import { RecipeList } from "./components/recipe_list";

import styles from "./styles.module.css";

export default function Page() {
  const [cookies, setCookie,] = useCookies([
    "my-ingredients",
    "shopping-list",
  ]);

  const [myIngredients, setMyIngredients] = useState<JSON[]>([]);
  const [shoppingItems, setShoppingItems] = useState<string[]>([]);
  const [ingredientData, setIngredientData] = useState<JSON[]>([]);

  useEffect(() => {
    setShoppingItems(cookies["shopping-list"] || []);
  }, []);

  function addToShoppingList(items: string[]) {
    const newShoppingItems = new Set(shoppingItems);
    for (const item of items) {
      newShoppingItems.add(item);
    }
    setShoppingItems([...newShoppingItems]);
    setCookie("shopping-list", [...newShoppingItems]);
  }

  function removeFromShoppingList(item: string) {
    const newShoppingItems = new Set(shoppingItems);
    newShoppingItems.delete(item);
    setShoppingItems([...newShoppingItems]);
    setCookie("shopping-list", [...newShoppingItems]);
  }

  function addIngredient(ingredient: JSON): void {
    const newIngredients = new Set(myIngredients);
    newIngredients.add(ingredient);
    setMyIngredients([...newIngredients]);
    setCookie(
      "my-ingredients",
      [...newIngredients].map((ingredient) => ingredient["idIngredient"])
    );
  }

  return (
    <div className={styles.page}>
      <div className="col text-start">
        <Pantry
          myIngredients={myIngredients}
          setMyIngredients={setMyIngredients}
          addIngredient={addIngredient}
          ingredientData={ingredientData}
          setIngredientData={setIngredientData}
          cookies={cookies}
          setCookie={setCookie}
        />
        <ShoppingList
          items={shoppingItems}
          handleRemoveItem={removeFromShoppingList}
          handlePurchaseItem={(item: string) => {
            removeFromShoppingList(item);
            addIngredient(
              ingredientData.find(
                (x) => x["strIngredient"].toLowerCase() == item.toLowerCase()
              )
            );
          }}
        />
      </div>
      <div className="col">
        <RecipeList
          myIngredients={myIngredients}
          addToShoppingList={addToShoppingList}
        />
      </div>
    </div>
  );
}
