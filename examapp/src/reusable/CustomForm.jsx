import { useRef, useState } from "react";

import formFieldsValidations from "../utils/formFieldsValidations";
import CustomInput from "./CustomInput";

const CustomForm = ({ formFields, actionOnformSuccess, children }) => {
  const debounceRef = useRef(null);

  let initialInputsObj = {};
  let initialErrorObj = {};

  Object.keys(formFields).forEach((key) => {
    initialInputsObj[key] = formFields[key].initialValue;
    initialErrorObj[key] = false;
  });

  const [inputs, setInputs] = useState(initialInputsObj);
  const [fieldErrors, setFieldErrors] = useState(initialErrorObj);

  const handleFormChange = (e) => {
    clearInterval(debounceRef.current);

    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });

    const type = name;
    const isPerfect = formFieldsValidations(type, value, inputs);

    debounceRef.current = setTimeout(() => {
      setFieldErrors((error) => ({ ...error, [name]: !isPerfect }));
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validating with error messages

    let errors = Object.keys(inputs).map((key) => {
      const type = key;

      const value = inputs[key];
      const isPerfect = formFieldsValidations(type, value, inputs);

      setFieldErrors((error) => ({ ...error, [key]: !isPerfect }));

      return !isPerfect;
    });

    // ----------------------------------------------------------------
    // now check if any error is present or not
    if (errors.some((field) => field === true)) {
      return alert("Please fill form Properly");
    }

    // the form will call the action which it got from top element as success
    return actionOnformSuccess({ ...inputs });
  };

  return (
    <form id="form" onSubmit={(e) => handleSubmit(e)}>
      {Object.keys(formFields).map((field) => {
        const {
          name,
          type,
          placeholder,
          errorMessage,
          inputcategory,
          options,
        } = formFields[field];

        return (
          <div className="col-md-9 m-auto" key={name}>
            <label
              className="form-label"
              htmlFor="name"
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {name}
            </label>

            <CustomInput
              inputcategory={inputcategory}
              options={options}
              type={type}
              id={name}
              name={name}
              className="form-control form-control-md"
              placeholder={placeholder}
              value={inputs[name]}
              onChange={(e) => handleFormChange(e)}
            />

            <label style={{ color: "red" }}>
              {fieldErrors[name] && errorMessage}
            </label>
          </div>
        );
      })}

      {children}
    </form>
  );
};

export default CustomForm;
