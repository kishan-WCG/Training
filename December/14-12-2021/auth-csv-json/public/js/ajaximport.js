// Import User's Ajax Call
$(document).ready(function() {
    socket = io(window.location.origin);
    //Send new tab id to store in session
    socket.on("connect", function() {
        console.log("connected Socket.io")
    });
    socket.on("fileName", (start) => {
        $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary"> ${start.fileDisplay}  being processed </li></ul>`)
        setTimeout(function() { $('#responce').html(""); }, 1000);
        // alert('File is Starting' + data.fileDisplay)
        console.log(start.fileDisplay); // world
        console.log('aaaaaaaaaaaaaa');
    });
    setTimeout(function() {
        socket.on("fileStop", (stop) => {
            $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary"> ${stop.fileDisplay}  being processing completed </li></ul>`)
            setTimeout(function() { $('#responce').html(""); }, 1000);
            // alert('File is Starting' + data.fileDisplay)
            console.log(stop.fileDisplay); // world
            console.log('aaaaaaaaaaaaaa');
        });
    }, 3000);



    // For Files model Data Desiplay Ajax code...
    function fileDisplay() {
        $.ajax({
            url: '/user/filesmodel',
            method: 'GET',
            success: function(res) {
                console.log(res);
                if (res.type == "success") {

                    $('.tblHide').remove()
                    for (const file of res.filesData) {
                        $('.filesTable').append("<tr class='table-info tblHide'> <td>" + file.name + "</td> <td>" + file.totalRecord + "</td> <td>" + file.duplicate + "</td> <td>" + file.invalid + "</td> <td>" + file.totalUpload + "</td><td>" + file.status + "</td>");
                    }
                } else {
                    alert(res.message)
                }
            }
        });
    }
    fileDisplay();
    // SetInterval User ( for 5 Sec Funcation Call ) 
    setInterval(function() {
        fileDisplay();
    }, 5000);

    let fileName = null;
    let fieldobj = {};
    $(document).on('change', '.dbfield', function() {
        let $this = $(this)
            // Adding New Fields  using Jquery Prompt!! ( USE JQUERY PROMPT )
        if ($(this).val() === "add") {
            $.confirm({
                title: 'Prompt!',
                content: '' +
                    '<form class="formName">' +
                    '<div class="form-group">' +
                    '<label>Enter New Fields</label>' +
                    '<input type="text" placeholder="Enter New Fields" class="name form-control" required />' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Submit',
                        btnClass: 'btn-blue',
                        action: function() {
                            var fields = this.$content.find('.name').val();
                            if (!fields) {
                                $.alert('provide a valid name');
                                return false;
                            }
                            $.alert('Your New fields is ' + fields);
                            $.ajax({
                                url: '/user/addfield',
                                method: 'post',
                                data: { fields },
                                success: function(res) {
                                    if (res.type == "success") {
                                        $('.dbfield').append(`<option value='${fields}'>${fields}</option>`);
                                        $this.val(fields).prop("selected", true)
                                    } else {
                                        alert(res.message)
                                    }
                                }
                            })
                        }
                    },
                    cancel: function() {
                        //close
                    },
                },
                onContentReady: function() {
                    // bind to events
                    var jc = this;
                    this.$content.find('form').on('submit', function(e) {
                        // if the user submits the form by pressing enter in the field.
                        e.preventDefault();
                        jc.$$formSubmit.trigger('click'); // reference the button and click it
                    });
                }
            });
            return;
        }
        let previousValue = $(this).attr('name');
        console.log(previousValue);
        $(this).attr('name', $(this).val());
        let current = $(this).val();
        console.log(current);

        // Hide and Show in DB Fiel
        if (previousValue === current) {
            return;
        }
        if (!previousValue && current) {
            fieldobj[current] = true;
            for (const item of Object.keys(fieldobj)) {
                $(`.dbfield option[value=${item}]`).hide();
            }
            return
        }

        if (previousValue && !current) {
            $(`.dbfield option[value=${previousValue}]`).show();
            delete fieldobj[previousValue];
            for (const item of Object.keys(fieldobj)) {
                $(`.dbfield option[value=${item}]`).hide();
            }
            return
        }
        if (previousValue && !current) {
            $(`.dbfield option[value=${previousValue}]`).show();
            delete fieldobj[previousValue];
            fieldobj[current] = true;
            for (const item of Object.keys(fieldobj)) {
                $(`.dbfield option[value=${item}]`).hide();
            }
            return
        }
    });

    // Submit Btn from display CSV File in Table Formate (First Field - Secound Field - DB Field)
    $(document).on("click", "#csvBtn", function(e) {
        e.preventDefault();
        let fieldMap = {}

        // Select value (MAP)
        $(".field").each(function() {
            let checkboxval = $(this).attr('id')
            let dbField = $(`#${checkboxval}-dropdown option:selected`).val();
            fieldMap[dbField] = checkboxval;
        });

        console.log(fieldMap);
        if (Object.values(fieldMap).includes('')) {
            // Erro Message for null Obj DB-Fields
            $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary">Please Select Db-Fields Values </li></ul>`)
            setTimeout(function() { $('#responce').html(""); }, 5000)
            return
        }

        $.ajax({
            url: '/user/csvimport/' + fileName,
            method: 'post',
            data: fieldMap,
            success: function(res) {
                console.log(res);
                if (res.type === "success") {
                    // count Responce Display usign the SetTimeOut Funcation
                    $('#responce').html(`<ul class="list-group">
                                <li class="list-group-item list-group-item-primary"> ${res.message}</li>
                            </ul>`)
                    setTimeout(function() {
                        $('.field').html("");
                        $('#responce').html("");
                    }, 2000);
                } else {
                    $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary">Please Select CSV File  </li></ul>`)
                    setTimeout(function() { $('#responce').html(""); }, 3000);
                }
            }
        })
    });

    // Choose CSV File BTN-Import 
    $(document).on("click", "#btn-import", function(e) {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('file', $('#file')[0].files[0]);
        $.ajax({
            url: '/user/import',
            method: 'post',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.type == "success") {
                    $('.field').html("")
                    fileName = res.fileName
                    let string = '';
                    for (const field of res.dbFields) {
                        string = string + `<option value='${field}'>${field}</option>`
                    }
                    /*
                    let a = "validUser" + res.inValidUsers + " <br> inValidUsers" + res.inValidUsers + " <br> duplicateUser" + res.duplicateUser + " <br>totalUsers" + res.totalUsers
                    alert(a)
                    for (const users of res.importUsers) {
                        $('.tbl').append("<tr class='table-info'> <td>" + users.name + "</td> <td>" + users.email + "</td> <td>" + users.mobile + "</td></tr>");
                    }
                    */
                    //  Display to CSV File in Table Formate....
                    for (let index = 0; index < res.key.length; index++) {
                        $('.csvTbl').append(" <tr id=" + res.csvHeader[index] + " class='field table-info'><td>" + res.key[index] + "</td> <td>" + res.value[index] +
                            "</td> <td>  <select name=''class='dbfield  form-select'id=" + res.csvHeader[index] + "-dropdown  > <option value=''>Select Value</option>  <option value='add'>Add Fields</option> " + string + " </select></td></tr>");
                    }
                } else {
                    $('.field').html(" ")
                    $('#responce').html(`<ul class="list-group"><li class="list-group-item list-group-item-primary">Please Select CSV File... </li></ul>`)
                    setTimeout(function() { $('#responce').html(""); }, 000);
                }
            }
        });
    });
});