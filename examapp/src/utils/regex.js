

export const nameValidate = (name) => {
    const regex = /[A-Za-z]+/
    return regex.test(name)
}


export const emailValidate = (email) => {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/
    return regex.test(email)
}


export const passwordValidate = (password) => {
    const regex = /(?=.*[a-z])(?=.*[A-Z]).{8,}/
    return regex.test(password)
}

export const confirmPasswordValidation = (confirmPassword, password) => {

    if (password === confirmPassword) {
        return true
    }
    return false
}