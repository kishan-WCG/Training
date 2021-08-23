let t = 0;
const array = Array();

function todolist()
{
    array[t] = document.getElementById("txt").value;
    if (array[t] != ""){
        let c = "<br/>" ;
        for (let i=0; i<array.length; i++){
            c = c + array[i] + "<br>";
        }
        document.getElementById("spantxt").innerHTML = c;
        t++;
        document.getElementById("txt").value = "";

    }
}
