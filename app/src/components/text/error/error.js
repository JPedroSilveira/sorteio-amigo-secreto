import { Objects } from "../../../utils/object.utils";
import "./error.css";

function Error(props) {
  if (Objects.isNotEmpty(props.children)) {
    return (
      <div className={`Error ${props.center ? "Center" : ""}`}>
        <p>{props.children}</p>
      </div>
    );
  }
  return <></>;
}

export { Error };
