import "./text-area.css";

function TextArea(props) {
  return (
    <div className="TextArea">
      <label htmlFor={props.id}>{props.label}</label>
      <textarea {...props}>{props.children}</textarea>
    </div>
  );
}

export { TextArea };
