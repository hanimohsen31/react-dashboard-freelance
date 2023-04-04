import "./Tab.scss";
import { Link } from "react-router-dom";
export const Tab = (props) => {
  return (
    <div className="Tab">
      <Link to={props.link}>
        <div className="tabIcon">{props.icon}</div>
        <div className="tabLabel">{props.label}</div>
      </Link>
    </div>
  );
};
