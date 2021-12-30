// Email Validation ( In Csv Import )
let checkEmail = function(email) {
    let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
};

// Mobile Validation ( In Csv Import )
let checkMobile = function(mobile) {
    let validRegex = /^[0-9]{10}$/;
    return mobile.match(validRegex);
};

module.exports = { checkEmail, checkMobile };