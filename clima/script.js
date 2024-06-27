let api_key= "77d3b54b13378f33ea5d2188b390e780";
const difKelvin = 273.15;

document.getElementById("btnBuscar").addEventListener("click", ()=>{
    const ciudad = document.getElementById("buscar").value;
    if(ciudad){
        datosClima(ciudad)
    }   
        document.getElementById("ciudad").innerHTML = " ";
        document.getElementById("temperatura").style="color:red";
        document.getElementById("temperatura").innerHTML ="Ciudad No encontrada";
        document.getElementById("humedad").innerHTML = " ";
        document.getElementById("descripcion").innerHTML =" " ;
    
})
function datosClima(ciudad){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}`)
    .then(data => data.json())
    .then(data =>mostrarDatos(data))
}

let mostrarDatos = (data)=>{
    console.log(data)
    let temp = data.main.temp;
    let hum = data.main.humidity;
    let desc = data.weather[0].description;
    let pais = data.sys.country;
    document.getElementById("ciudad").innerHTML = `${data.name}, ${pais}`;
    document.getElementById("temperatura").style="color:#444444";
    document.getElementById("temperatura").innerHTML ="La temperatura es de: " + (temp-difKelvin).toFixed(2)+"°C";
    document.getElementById("humedad").innerHTML = "La humedad es de: " +hum+"%";
    document.getElementById("descripcion").innerHTML ="Descripción meteorologica: " + desc;
}