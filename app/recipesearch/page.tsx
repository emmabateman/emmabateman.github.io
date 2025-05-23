"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Pantry } from "./components/pantry";
import { ShoppingList } from "./components/shopping_list";
import { RecipeList } from "./components/recipe_list";

import styles from "./styles.module.css";

export default function Page() {
  const [cookies, setCookie, _] = useCookies([
    "my-ingredients",
    "shopping-list",
  ]);

  const [myIngredients, setMyIngredients] = useState<JSON[]>([]);
  const [shoppingItems, setShoppingItems] = useState<string[]>([]);

  useEffect(() => {
    setShoppingItems(cookies["shopping-list"] || []);
  }, []);

  function addToShoppingList(items: string[]) {
    let newShoppingItems = new Set(shoppingItems);
    for (let item of items) {
      newShoppingItems.add(item);
    }
    setShoppingItems([...newShoppingItems]);
    setCookie("shopping-list", [...newShoppingItems]);
  }

  return (
    <div className={styles.page}>
      <div className="col text-start">
        <Pantry
          myIngredients={myIngredients}
          setMyIngredients={setMyIngredients}
          cookies={cookies}
          setCookie={setCookie}
        />
        <ShoppingList items={shoppingItems} />
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
