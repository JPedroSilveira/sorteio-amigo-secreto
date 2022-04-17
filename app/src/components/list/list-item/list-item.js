import "./list-item.css";

function ListItem(props) {
  function handleRemove(e) {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(props.id);
    }
  }

  return (
    <div className="ListItem">
      <div className="Item">{props.children}</div>
      <button onClick={handleRemove} className="Remove">
        <div className="Icon">X</div>
      </button>
    </div>
  );
}

export { ListItem };
