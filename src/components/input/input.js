import "./input.css";

function Input(props) {
  return (
    <div className="Input">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
    </div>
  );
}

export { Input };
