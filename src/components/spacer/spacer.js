import "./spacer.css";

function HSpacer(props) {
  return (
    <div className="HSpacer" style={{ height: props.height }}>
      <h1>{props.children}</h1>
    </div>
  );
}

function WSpacer(props) {
  return (
    <div className="WSpacer" style={{ width: props.width }}>
      <h1>{props.children}</h1>
    </div>
  );
}

function Spacer(props) {
  return (
    <div
      className="Spacer"
      style={{ width: props.width, height: props.height }}
    >
      <h1>{props.children}</h1>
    </div>
  );
}

export { HSpacer, WSpacer, Spacer };
