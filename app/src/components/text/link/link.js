import "./link.css";

function Link(props) {
  return (
    <div className="Link">
      <a href={props.href} target="_self">
        {props.children}
      </a>
    </div>
  );
}

export { Link };
