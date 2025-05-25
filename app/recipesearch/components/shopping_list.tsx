function ShoppingList({
  items,
  handleRemoveItem,
  handlePurchaseItem,
}: {
  items: string[];
  handleRemoveItem: (string) => void;
  handlePurchaseItem: (string) => void;
}) {
  return (
    <div className="card p-4 mt-4">
      <h4>Your Shopping List</h4>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item">
            {item}{" "}
            <button
              className="btn btn-sm float-end text-danger"
              onClick={() => handleRemoveItem(item)}
            >
              <i className="bi bi-x-lg" />
            </button>{" "}
            <button
              className="btn btn-sm float-end text-success"
              onClick={() => handlePurchaseItem(item)}
            >
              <i className="bi bi-check-lg" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ShoppingList };
