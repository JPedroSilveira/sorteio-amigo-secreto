import "./text.css";

function Text(props) {
  return (
    <div className="Text">
      <p>{props.children}</p>
    </div>
  );
}

export { Text };
