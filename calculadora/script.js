//Agrega los valores a la pantalla
let agregar = (valor)=>{
    document.getElementById("pantalla").value += valor
}
let limpiar = ()=>{
    document.getElementById("pantalla").value = ""
}
let calcular = ()=>{
    document.getElementById("pantalla").value = eval(document.getElementById("pantalla").value)
}
let borrar = ()=>{
    document.getElementById("pantalla").value = document.getElementById("pantalla").value.slice(0, -1)
}
