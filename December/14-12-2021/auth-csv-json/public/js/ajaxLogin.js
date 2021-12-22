// Login Ajax Call

$(document).on("click", ".login-btn", function() {
    let email = $('#email').val();
    let password = $('#password').val();
    $.ajax({
        url: '/login',
        method: 'post',
        data: { email: email, password: password },
        success: function(res) {
            if (res.type == "error") {
                alert(res.message)
            }
            if (res.type == "success") {
                let Token = res.data.token;
                $(document)[0].cookie = `Token=${Token}`;
                $(location).attr("href", "/user/list");
            }
        }
    });
});