// Logout Ajax Call
$(document).ready(function() {
    $(document).on("click", "#logout", function() {
        console.log('aaaaaaaaa')
        $.ajax({
            url: '/api/logout',
            method: 'get',
            success: function(res) {
                console.log(res)
                $(location).attr("href", "/login");
            }
        });
    });
});