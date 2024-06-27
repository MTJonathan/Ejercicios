let api_key = "ae8621f215a1afb113c9d96a0d3d8822";

document.getElementById("btnBuscar").addEventListener("click", ()=>{
    let pelicula = document.getElementById("txtPelicula").value;
    if(pelicula){
        datosPelicula(pelicula);
    }
    document.getElementById("resultado").innerHTML = "cargando...";
});
datosPelicula = (pelicula)=>{
    fetch(`https://api.themoviedb.org/3/search/movie?query=${pelicula}&api_key=${api_key}`)
    .then(data => data.json())
    .then(data => mostrarDatos(data))
}
mostrarDatos = (data)=>{
    let res = "";
    for(let i = 0; i < data.results.length; i++){
        res += `
        <div class="pelicula">
            <div class="imgPelicula">
                <img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" alt="imagenPelicula">
            </div>
            <div class="descripcion">
                <h2>${data.results[i].title}</h2>
                <p>${data.results[i].overview}</p>
            </div>
        </div>
        `        
    }
    document.getElementById("resultado").innerHTML = res;
}


