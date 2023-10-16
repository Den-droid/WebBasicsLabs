const fullnameRegex = /^\p{Lu}{1}\p{L}{1,} \p{Lu}{1}[.]{1}\p{Lu}{1}[.]{1}$/gmu;
const idCardRegex = /^\p{Lu}{2} №[0-9]{5,}$/gmu;
const facultyRegex = /^\p{Lu}{3,}$/gmu;
const phoneNumberRegex =
    /^[(]?[0-9]{3}[)]?\-?\ ?[0-9]{3}\-?\ ?[0-9]{2}\-?\ ?[0-9]{2}$/;

function validateUsername(username) {
    if (username.trim().length < 6
        || username.indexOf(" ") !== -1) {
        return false;
    }

    return true;
}

function validatePassword(password) {
    if (password.length < 6) {
        return false;
    }

    return true;
}

function validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword)
        return false;

    return true;
}

function validateIdCard(idCard) {
    return idCard.match(idCardRegex);
}

function validatePhoneNumber(phoneNumber) {
    return phoneNumber.match(phoneNumberRegex);
}

function validateFaculty(faculty) {
    return faculty.match(facultyRegex);
}

function validateFullname(fullName) {
    return fullName.match(fullnameRegex);
}

function validateBirthday(birthday) {
    return birthday !== '';
}

function validateUserinfo(fullname, faculty, idCard, phoneNumber, birthday, errorDiv) {
    if (!validateFullname(fullname)) {
        errorDiv.textContent = "Wrong Fullname Format!";
        return false;
    }

    if (!validateFaculty(faculty)) {
        errorDiv.textContent = "Wrong Faculty Format!";
        return false;
    }

    if (!validateIdCard(idCard)) {
        errorDiv.textContent = "Wrong Id Card Format!";
        return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        errorDiv.textContent = "Wrong Phone Number Format!";
        return false;
    }

    if (!validateBirthday(birthday)) {
        errorDiv.textContent = "Enter birthday!";
        return false;
    }

    return true;
}

function validateSignup(username, password, confirmPassword, fullname, faculty,
                        idCard, phoneNumber, birthday, errorDiv) {
    if (!validateUsername(username)) {
        errorDiv.textContent = "Wrong Username Format! There must be " +
            "at least 6 symbols and no spaces!";
        return false;
    }

    if (!validatePassword(password)) {
        errorDiv.textContent = "Wrong Password Format! There must be " +
            "at least 6 symbols!";
        return false;
    }

    if (!validateConfirmPassword(password, confirmPassword)) {
        errorDiv.textContent = "Password and confirm password do not match!";
        return false;
    }

    if (!validateFullname(fullname)) {
        errorDiv.textContent = "Wrong Fullname Format!";
        return false;
    }

    if (!validateFaculty(faculty)) {
        errorDiv.textContent = "Wrong Faculty Format!";
        return false;
    }

    if (!validateIdCard(idCard)) {
        errorDiv.textContent = "Wrong Id Card Format!";
        return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        errorDiv.textContent = "Wrong Phone Number Format!";
        return false;
    }

    if (!validateBirthday(birthday)) {
        errorDiv.textContent = "Enter birthday!";
        return false;
    }

    return true;
}

function validateLogin(username, password) {
    if (!validateUsername(username)) {
        return false;
    }

    if (!validatePassword(password)) {
        return false;
    }

    return true;
}