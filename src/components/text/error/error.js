import "./error.css";

function Error(props) {
  if (props.children) {
    return (
      <div className="Error">
        <p>{props.children}</p>
      </div>
    );
  }
  return <></>;
}

export { Error };
