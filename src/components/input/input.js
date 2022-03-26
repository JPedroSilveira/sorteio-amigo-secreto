import "./input.css";

function Input(props) {
  return (
    <div className="Input">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export { Input };
