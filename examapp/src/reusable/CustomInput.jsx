import { Fragment, useState } from "react";
import showPassImg from "../assets/svgs/show-password.svg";
import hidePassImg from "../assets/svgs/hide-password.svg";

const CustomInput = (props) => {
  const { inputcategory, options } = props;

  const [showPassword, setShowPass] = useState(false);

  switch (inputcategory) {
    case "select":
      return (
        <select
          {...props}
          style={{
            background: "#f2f2f2",
          }}
        >
          {options.map((option) => {
            return <option key={option}>{option}</option>;
          })}
        </select>
      );

    case "password":
      return (
        <div style={{ position: "relative" }}>
          <input
            {...props}
            type={showPassword ? "text" : "password"}
            style={{ background: "#f2f2f2" }}
          />

          <img
            src={showPassword ? showPassImg : hidePassImg}
            onClick={() => setShowPass(!showPassword)}
            alt=""
            style={{
              position: "absolute",
              top: "25px",
              cursor: "pointer",
              width: "20px",
              right: "8px",
              top: "8px",
            }}
          />
        </div>
      );

    default:
      return <input {...props} style={{ background: "#f2f2f2" }} />;
  }
};

export default CustomInput;

{
  /* <input
type={type}
id={name}
name={name}
className="form-control form-control-lg"
placeholder={placeholder}
value={inputs[name]}
onChange={(e) => handleFormChange(e)}
/> */
}
