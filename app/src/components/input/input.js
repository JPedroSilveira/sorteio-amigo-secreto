import { Error } from "../text/error/error";
import "./input.css";

function Input(props) {
  return (
    <div className="Input">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props} />
      <Error>{props.error}</Error>
    </div>
  );
}

export { Input };
