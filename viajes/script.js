import {inicio, barcelona, londres, paris, roma } from "./ciudades.js";

//Obtener los elemento del DOM
let enlaces = document.querySelectorAll('a')
let tituloelemento = document.getElementById('titulo')
let subtituloelemento = document.getElementById('subtitulo')
let descripcionelemento = document.getElementById('descripcion')

//Egregar evento click a los enlaces
enlaces.forEach((enlace) => {
    enlace.addEventListener('click', function(){
        //Remover ACTIVO
        enlaces.forEach((enlace) => {
            enlace.classList.remove('active')
        })
        //agregar ACTIVO
        this.classList.add('active')
        //traer informacion
        let contenido = obtener(this.textContent)
        tituloelemento.textContent = contenido.titulo
        subtituloelemento.textContent = contenido.subtitulo
        descripcionelemento.textContent = contenido.descripcion
    })
}) 
//Funcion para traer la informacion correcta
let obtener=(enlace)=>{
    let contenido ={
        "Inicio":inicio,
        "Barcelona":barcelona,
        "Roma":roma,
        "Paris":paris,
        "Londres":londres
    }
    return contenido[enlace];
}

// Activar el primer enlace y simular un clic
let primerEnlace = document.querySelector('a'); // Selecciona el enlace que apunta a "Inicio"
if (primerEnlace) {
    primerEnlace.classList.add('active'); // Marca el enlace como activo
    let contenido = obtener(primerEnlace.textContent);
    tituloelemento.textContent = contenido.titulo;
    subtituloelemento.textContent = contenido.subtitulo;
    descripcionelemento.textContent = contenido.descripcion;
}