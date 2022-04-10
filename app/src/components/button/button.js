import "./button.css";

function Button(props) {
  return (
    <div className="Button">
      <button {...props}>{props.children}</button>
    </div>
  );
}

export { Button };
