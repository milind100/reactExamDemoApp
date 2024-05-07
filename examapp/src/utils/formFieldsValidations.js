import {
    nameValidate,
    emailValidate,
    passwordValidate,
    confirmPasswordValidation
} from "./regex"



const formFieldsValidations = (type, value, inputs) => {
    // imported name as type 

    switch (type) {
        case "name":
            return nameValidate(value)

        case "email":
            return emailValidate(value)

        case "password":
            return passwordValidate(value)

        case "oldPassword":
            return passwordValidate(value)

        case "confirmPassword":
            return confirmPasswordValidation(value, inputs.password)

        case "role":
            if (value === "Select Role")
                return false
            else
                return true


    }
}

export default formFieldsValidations


