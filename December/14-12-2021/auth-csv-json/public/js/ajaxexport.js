// Export User's Ajax Call
$(document).ready(function() {
    $(document).on("click", "#export", function() {
        $.ajax({
            url: '/user/export',
            method: 'get',
            success: function(res) {
                if (res.type == "success") {
                    let appendTag = $('<a />');
                    appendTag.attr('download', res.userCsv);
                    appendTag.attr('href', res.url);
                    $('body').append(appendTag);
                    appendTag[0].click();
                    $('body').remove(appendTag);
                    return;
                } else {
                    $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-danger">Error During the Exports User's  </li></ul>`)
                    setTimeout(function() { $('#responce').html(""); }, 5000);
                }
            }
        });
    });
});