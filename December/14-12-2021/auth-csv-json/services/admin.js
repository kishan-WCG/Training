let userModel = require('../model/usersModel');
async function CreateAdmin() {
    let users = await userModel.findOne({ email: "admin@admin.com" });
    if (!users) {
        await userModel.insertMany({
            name: "Admin",
            email: "admin@admin.com",
            mobile: "1234567890",
            password: "123456",
        })
    } else {
        console.log('User Already existing....');
    }
}

CreateAdmin();