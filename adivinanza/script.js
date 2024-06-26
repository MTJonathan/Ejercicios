const numeroAleatorio = Math.round(Math.random()*100+1);
let comprobar = ()=>{
    let numero = document.getElementById("numero").value;
    if(numero <= 0){
        document.getElementById("resuldado").style = "color: red"
        document.getElementById("resuldado").innerHTML = "Ingresa un número entre 1 y 100";
    }else if(numero == numeroAleatorio && numero <= 100){
        document.getElementById("resuldado").style = "color: #2E8F50"
        document.getElementById("resuldado").innerHTML = "Ganaste";
    }else if(numero > numeroAleatorio && numero <= 100){
        document.getElementById("resuldado").style = "color: red"
        document.getElementById("resuldado").innerHTML = "El número es menor. Intenta de nuevo.";
    }else if(numero < numeroAleatorio && numero <= 100){
        document.getElementById("resuldado").style = "color: red"
        document.getElementById("resuldado").innerHTML = "El número es mayor. Intenta de nuevo.";
    }else{
        document.getElementById("resuldado").style = "color: red"
        document.getElementById("resuldado").innerHTML = "Ingresa un número entre 1 y 100";
    }
}
let reset = ()=>{
    location.reload();
}

