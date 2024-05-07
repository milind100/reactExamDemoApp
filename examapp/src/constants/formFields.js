
export const name = {
    name: {
        name: "name",
        placeholder: "name",
        type: 'text',
        errorMessage: 'please Enter name and Only Alphabets',
        initialValue: "",
        inputcategory: "input",
    },
}
export const email = {
    email: {
        name: "email",
        placeholder: "email",
        type: 'email',
        errorMessage: 'Invalid Email',
        initialValue: "",
        inputcategory: "input",
    },
}
export const password = {
    password: {
        name: "password",
        placeholder: "password",
        type: 'password',
        errorMessage: 'Atleast 8 character with one symbol,small,capital letter',
        initialValue: "",
        inputcategory: "password",
    },
}



export const confirmPassword = {
    confirmPassword: {
        name: 'confirmPassword',
        placeholder: "Confirm Password",
        type: 'password',
        errorMessage: 'confirm password must match with password',
        initialValue: "",
        inputcategory: "password",
    },
}
export const role = {
    role: {
        name: 'role',
        placeholder: "Confirm Password",
        type: 'select',
        options: ["Select Role", "teacher", "student"],
        errorMessage: 'please Select Role',
        initialValue: "Select Role",
        inputcategory: "select",
    },
}



export const oldPassword = {
    oldPassword: {
        name: "oldPassword",
        placeholder: "old Password",
        type: 'password',
        errorMessage: 'Atleast 8 character with one symbol,small,capital letter',
        initialValue: "",
        inputcategory: "password",
    },
}

