let t = 0;
let c = 0;
const array = Array();

function todolist()
{
    array[t] = document.getElementById("txt").value;
    if (array[t] != ""){
        for (i=0; i<array.length; i++){
            c =  array[i];
        }
        localStorage.setItem(t,JSON.stringify(c));
        
        t++;
        document.getElementById("txt").value = "";

    }
}
function reset(){
    localStorage.clear();
    t=0;
}


function load(){
        
    for(i=0; i<localStorage.length; i++){
            var name = localStorage.getItem(i);
            document.getElementById("divtxt")
            .appendChild(document.createElement("h2")).innerText = name;
        }
    }
function del(){
    
}

