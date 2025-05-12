'use client'

import { useState } from 'react'

import { Pantry } from './components/pantry'
import { ShoppingList } from './components/shopping_list'
import { RecipeList } from './components/recipe_list'

import styles from './styles.module.css'

export default function Page() {
  const [myIngredients, setMyIngredients] = useState<JSON[]>([]);
  const [shoppingItems, setShoppingItems] = useState<string[]>([]);

  function addToShoppingList(items: string[]) {
    let newShoppingItems = new Set(shoppingItems);
    for (let item of items) {
      newShoppingItems.add(item);
    }
    setShoppingItems([...newShoppingItems]);
  }

  return (
    <div className={styles.page}>
      <div className="col text-start">
        <Pantry myIngredients={myIngredients} setMyIngredients={setMyIngredients}/>
        <ShoppingList items={shoppingItems}/>
      </div>
      <div className="col">
        <RecipeList myIngredients={myIngredients} addToShoppingList={addToShoppingList}/>
      </div>
    </div>
  );
}
