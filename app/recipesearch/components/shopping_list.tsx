function ShoppingList({ items } : { items: string[] }) {
  return (
    <div className="card p-4 mt-4"> 
      <h4>Your Shopping List</h4>
      <ul className="list-group">
        {items.map((item) => 
	  <li key={item} className="list-group-item">
	    {item}
	  </li>
	)}
      </ul>
    </div>
  );
}

export { ShoppingList };
