import { Error } from "../text/error/error";
import { Attention } from "../text/attention/attention";
import "./input.css";

function Input(props) {
  return (
    <div className="Input">
      <label htmlFor={props.id}>
        {props.label}
        {props.required && <Attention>*</Attention>}
      </label>
      <input {...props} />
      <Error>{props.error}</Error>
    </div>
  );
}

export { Input };
