$(document).ready(function () {
  $("p").click(function () {
    if ($(".class1 > p").parent().is("div")) {
      alert("Parent of p is div");
    }
  });

  $(".class2 button").click(function () {
    var array = [55, 12, 49, 89, 34, 88];
    var newArray = jQuery.map(array, function (val) {
      return val + 5;
    });
    document.getElementById("p1").innerHTML =
      "<b> The new array is: </b>" + JSON.stringify(newArray);
  });

  $(".class3 p").slice(1, 3).css("background-color", "green");

  $(document).ready(function () {
    $(".class4 p")
      .add(document.getElementsByTagName(".class4 span")[0])
      .css("background-color", "yellow");
  });

  $(".contents").click(function () {
    $(".class5").contents().filter("em").wrap("<b/>");
  });

  $("#closest").click(function () {
    $("p")
      .closest(".class6 div")
      .css({ "font-size": "30px", color: "red", border: "6px dashed red" });
  });

  $("#siblings").click(function () {
    $(".r6")
      .siblings()
      .css({ "font-size": "20px", color: "green", border: "3px solid blue" });
  });

  $("#parent").click(function () {
    $("p")
      .parent()
      .css({ "font-size": "10px", color: "orange", border: "1px solid gray" });
  });

  $("#nextuntil").click(function () {
    $(".class7 h1")
      .nextUntil(".class7 h3")
      .css({ color: "blue", border: "3px solid blue" });
  });
});