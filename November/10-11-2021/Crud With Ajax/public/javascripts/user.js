"use strict";
$(document).ready(function() {
    // Sorting Text -- Name Gender...
    let sortFieldText;
    // Gender Search...
    let searchGender;
    // Sorting Order 1 or -1
    let fieldDigit;
    // Search Value From TextBox
    let searchby;
    // Pages
    let page;

    function getAllUser(obj) {
        let page
        if (!obj.page) {
            page = 1;
        } else {
            page = obj.page;
        }
        let url = "/api/getUsers/?page=" + page;
        if (obj.sortField) {
            url = url + "&sortField=" + obj.sortField;
            url = url + "&field=" + obj.field;
        }
        if (obj.srchBox || obj.srchGender) {
            if (obj.srchBox) {
                url = url + "&srchBox=" + obj.srchBox;
            }
            if (obj.srchGender) {
                url = url + "&srchGender=" + obj.srchGender;
            }
        }
        if (obj.exportUsers) {
            if (obj.exportUsers == "export") {
                url = url + "&export=" + obj.exportUsers;
            }
        }
        if (obj.emailUrl) {
            url = url + "&emailUrl=" + obj.emailUrl;
            url = url + "&emailVal=" + obj.emailtext;
        }
        $.ajax({
            url: url,
            type: "get",
            success: function({ data, totalUsers, url, fileName }) {
                // Ajax Dowload CSv File
                if (url && fileName) {
                    let appendTag = $('<a />');
                    appendTag.attr('download', fileName);
                    appendTag.attr('href', url);
                    $('body').append(appendTag);
                    appendTag[0].click();
                    $('body').remove(appendTag);
                    return;
                }
                $('.tbl-data').empty();
                for (const user of data) {
                    $('.tbl-data').append("<tr id=" + user._id + "> <td><img src='/images/" + user.image + "' height='50', width='50'/> </td> <td>" + user.fName + user.lName + "</td>  <td>" + user.gender + "</td> <td>" + user.address + "</td> <td> <button class='btn btn-warning  edit-Btn' id=" + user._id + "> Edit </button>&nbsp;<button class='btn btn-info delete-Btn' id=" + user._id + "> Delete </button></td> </tr>");
                }
                $(".pagination").html("");
                var usersCount = Math.ceil(totalUsers / 5);
                for (let i = 0; i < usersCount; i++) {
                    if (page == i + 1) {
                        $(".pagination").append(`<li class="page-item active"><button class="page-link" btnVal="${i+1}">${i+1}</button></li>`);
                    } else {
                        $(".pagination").append(`<li class="page-item"><button class="page-link" btnVal="${i+1}">${i+1}</button></li>`);
                    }
                }
            },
            error: function(error) { console.log(error); }
        });
    };
    $("#form").validate({
        errorClass: 'text-danger',
        rules: {
            fName: { required: true },
            lName: { required: true },
            address: { required: true },
            gender: { required: true },
            interest: { required: true },
            hobbies: { required: true },
            image: { required: true }
        },
        messages: {
            fName: "First Name Required..",
            lName: "Last Name Required..",
            address: "Address Required..",
            gender: "Gender Required...",
            interest: "Interest Required...",
            hobbies: "Hobbies Required...",
            image: "File Required",
        },
        submitHandler: function(form, e) {
            e.preventDefault();
            var valueHobbies = [];
            $(':checkbox:checked').each(function(i) {
                valueHobbies.push($(this).val());
            });
            const formdata = new FormData();
            formdata.append('fName', $("#fName").val());
            formdata.append('lName', $("#lName").val());
            formdata.append('address', $("#address").val());
            formdata.append('gender', $("#gender:checked").val());
            formdata.append('interest', $('#interest').val());
            formdata.append('hobbies', valueHobbies);
            formdata.append('image', $('#image')[0].files[0]);
            $.ajax({
                url: '/',
                method: 'POST',
                data: formdata,
                contentType: false,
                processData: false,
                success: function(value) {
                    if (value.type == "success") {
                        // $('.tbl-data').append("<tr id=" + value.user._id + "> <td><img src='/images/" + value.user.image + "' height='50', width='50'/> </td> <td>" + value.user.fName + value.user.lName + "</td>  <td>" + value.user.gender + "</td> <td>" + value.user.address + "</td> <td> <button class='btn btn-warning  edit-Btn' id=" + value.user._id + "> Edit </button><button class='btn btn-info delete-Btn' id=" + value.user._id + "> Delete </button></td> </tr>");
                        $('#form')[0].reset();
                        $('.span').text(value.message);
                        getAllUser({})
                    } else { $('.spanError').text(value.message); }
                },
                error: function(error) { console.log(error); }
            })
        }
    });
    // Edit Btn 
    $(document).on("click", ".edit-Btn", function() {
        $('.edit-Btn').prop('disabled', true);
        $('.delete-Btn').attr('disabled', true);
        let userid = $(this).attr('id')
        $.ajax({
            url: '/' + userid,
            method: 'GET',
            success: function(res) {
                if (res.type == "success") {
                    $('#fName').val(res.data.fName);
                    $('#lName').val(res.data.lName);
                    $('#address').val(res.data.address);
                    $('input[name= "gender"][value="' + res.data.gender + '"]').prop('checked', true);
                    $('#interest').val(res.data.interest);
                    $("#hobby").find("[value=" + res.data.hobbies.join("], [value=") + "]").prop("checked", true);
                    $('<img class="img" src="/images/' + res.data.image + '" height="50", width="50"/>').insertAfter('#image');
                    $('<button class="btn btn-danger cancal">Cancal</button>').insertAfter('.btns').attr("type", "button");
                    $('#btn').html("Update").data("id", res.data._id).attr("class", "update btn btn-primary").attr("type", "button");
                } else {
                    $('.spanError').text(res.message);
                }
            }
        });
    });
    // cancal Btn-hide Img Remove..
    $(document).on("click", ".cancal", function() {
        $('#form')[0].reset();
        $('.img').remove();
        $('.edit-Btn').attr('disabled', false);
        $('.delete-Btn').attr('disabled', false);
    });
    // Edit User
    $(document).on("click", ".update", function() {
        var valueHobbies = [];
        $(':checkbox:checked').each(function(i) { valueHobbies.push($(this).val()); });
        const formdata = new FormData();
        formdata.append('fName', $("#fName").val());
        formdata.append('lName', $("#lName").val());
        formdata.append('address', $("#address").val());
        formdata.append('gender', $("#gender:checked").val());
        formdata.append('interest', $('#interest').val());
        formdata.append('hobbies', valueHobbies);
        formdata.append('image', $('#image')[0].files[0]);

        let updateUser = $(this).data('id');
        $('.edit-Btn').attr('disabled', false);
        $('.delete-Btn').attr('disabled', false);

        $.ajax({
            url: '/' + updateUser,
            method: 'put',
            processData: false,
            contentType: false,
            data: formdata,
            success: function(value) {
                if (value.type == "success") {
                    $('#' + updateUser).replaceWith("<tr id=" + value.user._id + "> <td><img src='/images/" + value.user.image + "' height='50', width='50'/> </td> <td>" + value.user.fName + value.user.lName + "</td>  <td>" + value.user.gender + "</td> <td>" + value.user.address + "</td> <td> <button class='btn btn-warning  edit-Btn' id=" + value.user._id + "> Edit </button><button class='btn btn-info delete-Btn' id=" + value.user._id + "> Delete </button></td> </tr>");
                    $('#form')[0].reset();
                    $('.img').remove();
                    $('.cancal').hide();
                    $('.span').text(value.message);
                } else { $('.spanError').text(value.message) }
            },
            error: function(error) { console.log(error); }
        });
    });
    // Delete User
    $(document).on("click", ".delete-Btn", function() {
        let userid = $(this).attr('id');
        $.ajax({
            url: '/' + userid,
            method: 'DELETE',
            success: function(res) {
                if (res.type == "success") {
                    $('#' + userid).html("");
                    $('.span').text(res.message);
                    getAllUser({});
                } else { $('.spanError').text(res.message) }
            }
        });
    });
    // Btn-Hide-Remove
    $(document).on("click", ".cancal", function() {
        $('.cancal').hide();
        $('.img').remove();
        $('#btn').data("id", "").attr("class", "btn  btn-primary").attr("type", "submit").html("Submit");
    });
    // Searching
    $(document).on("click", ".searchBtn", function() {
            let serach = $('#srch').val();
            let srchGender = $('#srchGender').val();
            searchGender = srchGender;
            searchby = serach;
            $('.tbl-data').empty();
            getAllUser({ srchBox: serach, srchGender: srchGender, page: page });
        })
        // Sorting
    $(document).on("click", ".sort", function() {
        let serach = $('#srch').val();
        let srchGender = $('#srchGender').val();
        if ($('.sort').attr("sorting") == 1) {
            $('.sort').attr("sorting", -1);
        } else {
            $('.sort').attr("sorting", 1);
        }
        let field = $('.sort').attr("sorting");
        let sortField = $(this).text();
        fieldDigit = field;
        sortFieldText = sortField;
        getAllUser({ sortField: sortField, field: field, page: 1, srchBox: serach, srchGender: srchGender, });
    });
    // Pagenation 
    $(document).on("click", ".page-link", function() {
        var val = $(this).attr("btnVal");
        page = val;
        getAllUser({ page: val, sortField: sortFieldText, field: fieldDigit });
    })

    $(document).on("click", ".clearBtn", function() {
            $('#srch').val("");
            $('#srchGender').val("");
            getAllUser({ page: 1 })
        })
        // Export Data JSON WITH CSV
    $(document).on("click", ".exportBtn", function() {
        let val = $(this).attr("id");
        getAllUser({ exportUsers: val, srchBox: searchby, srchGender: searchGender, field: fieldDigit, sortField: sortFieldText })
    })

    $(document).on("click", ".exportEmailBtn", function() {
        let val = $(this).attr("id");
        let email = prompt("Please Enter Your Email Address")
        getAllUser({ emailUrl: val, emailtext: email, exportUsers: val, srchBox: searchby, srchGender: searchGender, field: fieldDigit, sortField: sortFieldText })
    })
    getAllUser({});
});