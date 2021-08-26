$(document).ready(function () {
  initSample();
  $("#example").DataTable({
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
  });
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
   
});
