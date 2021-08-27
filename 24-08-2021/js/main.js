$(document).ready(function () {
  ClassicEditor.create(document.querySelector('#Introduction'));

   $.validator.setDefaults({ ignore: ":hidden:not(select)" });
   $.validator.setDefaults({ ignore: ":hidden:not(select)" });

  $(registration).validate({
    
    // aboutme validation
    ignore: "input:hidden:not(input:hidden.required)",
    rules: {
      firstname: {
        required: true,
        minlength: 5,
      },
      Mobile: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        required: true,
      },

      chosen:{
        required: true,
      },
      time:{
        required: true,
      },
      dob:{
        required: true,
      },
      message:{
        chosen: "This field is required."
       
      }
    },
  });
  
  $("select").chosen({ width: "200px" });
  initSample();
  $("#example").DataTable({
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
  });


  
  // ckeditor

 
  //  datepicker
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
  // chosen select city


  var ed = CKEDITOR.replace("editor1");
  ed.on("required", function (evt) {
    $(".introerr").text("This field is required.");
    evt.cancel();
  });


  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    fadeDuration: 2000,
    positionFromTop: 130,
  });
   
});
