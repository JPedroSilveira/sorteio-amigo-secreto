import "./input.css";

function Input(props) {
  return (
    <div className="Input">
      <label for={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} />
    </div>
  );
}

export { Input };
