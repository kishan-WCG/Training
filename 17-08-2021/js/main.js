function validation()
{ 
    var fn = document.getElementById("fname1").value;
    var ln = document.getElementById("lname").value;
    var cn = document.getElementById("num").value;
    var em = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    var rep = document.getElementById("re-password").value;
    
    if(fn == ""){
        document.getElementById("fname2").innerHTML= "First Name Required!";
    }
    if(ln == ""){
        document.getElementById("lname").value = "Last Name Required!";
    }
    if(cn === ""){
        document.getElementById("num").value = "Contact Number Required!" ;
    }
     if(!validateEmail(inputemail)){
        document.getElementById("v3").value = "Enter Valid Email Address!";
    }

}





    
   

