import { Bar } from "../bar";
import "./text.css";

function TextBar(props) {
  return (
    <div className="TextBar">
      <Bar />
      <p>{props.text}</p>
      <Bar />
    </div>
  );
}

export { TextBar };
