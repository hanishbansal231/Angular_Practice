export const isEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    // Use the test() method on the emailRegex to check if the email matches the pattern
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    // Regular expression pattern for validating passwords
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    
    // Use the test() method on the passwordRegex to check if the password matches the pattern
    return passwordRegex.test(password);
}
