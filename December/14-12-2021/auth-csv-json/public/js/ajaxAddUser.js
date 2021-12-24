// Add User's Ajax Call
$(document).ready(function() {

    // All Users Display

    /*
    $.ajax({
        url: '/user/getAllUser',
        method: 'get',
        success: function(res) {

            for (const users of res.allUser) {
                $('.tbl').append("<tr class='table-info'> <td>" + users.name + "</td> <td>" + users.email + "</td> <td>" + users.mobile + "</td></tr>");
            }
        }
    });
    */

    // Form Validation
    $("#addform").validate({
        rules: {
            name: { required: true },
            email: { required: true },
            mobile: { required: true },
            password: { required: true },
        },
        messages: {
            name: "Name Required..",
            email: "Email is  Required..",
            mobile: "mobile is  Required..",
            password: "password is  Required...",
        },
        submitHandler: function(form, e) {
            let name = $('#name').val();
            let email = $('#email').val();
            let mobile = $('#mobile').val();
            let password = $('#password').val();
            // User created Ajax Call
            $.ajax({
                url: '/user/list',
                method: 'post',
                data: { name: name, email: email, mobile: mobile, password: password },
                success: function(res) {
                    if (res.type == "success") {
                        $('.tbl').append("<tr class='table-info'> <td>" + res.users.name + "</td> <td>" + res.users.email + "</td> <td>" + res.users.mobile + "</td></tr>");
                        $('#addform')[0].reset();
                    } else {
                        $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary">Error During the Exports User's${res.message}  </li></ul>`)
                        setTimeout(function() { $('#responce').html(""); }, 5000);
                    }
                },
            });
        }
    });
});