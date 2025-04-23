//localStorage.clear();

const peliculas = JSON.parse(localStorage.getItem("peliculasIngresadas")) || [];
const nombre = document.getElementById("nombre");
const genero = document.getElementById("genero");
const calificacion = document.getElementById("calificacion");
const contenedor = document.getElementById("peliculasCajita");
const filtroGenero = document.getElementById("filtro-genero");
const promedio = document.getElementById("promedio");
const botonAgregar = document.getElementById("Agregar");

botonAgregar.addEventListener("click", () => {
    if(nombre.value == "" || genero.value == ""){
        alert("todos los campos son obligatorios");
        return;
    }
    if (calificacion.value < 1 || calificacion.value > 10 || calificacion.value === "") {
        alert("La calificacion debe estar entre 1 y 10");
        return;
    }

    // Verificar si ya existe una pelicula con el mismo nombre y genero 
    let nombreGeneroExistente = false;
    peliculas.forEach(pelicula => {
        if (pelicula.nombre == nombre.value && pelicula.genero == genero.value) {
            nombreGeneroExistente = true;
        }
    });

    if (nombreGeneroExistente) {
        alert("Ya existe una pelicula con este nombre y genero.");
        return;
    }

    // Agregar nueva pelicula al arreglo
    peliculas.push({
        nombre: nombre.value,
        genero: genero.value,
        calificacion: parseFloat(calificacion.value),
    });

    // Guardar las peliculas en localStorage
    localStorage.setItem("peliculasIngresadas", JSON.stringify(peliculas));

    // Limpiar los campos de los inputs
    nombre.value = "";
    genero.value = "";
    calificacion.value = "";

    // Actualizar la lista de peliculas y el filtro de generos
    mostrarPeliculas();
    actualizarFiltroGeneros(); // Actualiza el filtro de generos
});

const mostrarPeliculas = () => {
    contenedor.innerHTML = "";

    let suma = 0;
    let cantidad = 0;

    peliculas.forEach(pelicula => {
        if (filtroGenero.value == "" || pelicula.genero == filtroGenero.value) {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";

            const card = document.createElement("div");
            card.className = "card h-100";

            const body = document.createElement("div");
            body.className = "card-body";

            const titulo = document.createElement("h5");
            titulo.className = "card-title";
            titulo.textContent = pelicula.nombre;

            const generoText = document.createElement("p");
            generoText.className = "card-text";
            generoText.textContent = "Genero: " + pelicula.genero;

            const calif = document.createElement("p");
            calif.className = "card-text";
            calif.textContent = "Calificacion: " + pelicula.calificacion;

            body.appendChild(titulo);
            body.appendChild(generoText);
            body.appendChild(calif);

            card.appendChild(body);
            col.appendChild(card);
            contenedor.appendChild(col);

            suma += pelicula.calificacion;
            cantidad++;
        }
    });
                                    
    if (cantidad) {
        const resultado = suma / cantidad;
        promedio.textContent = "Promedio: " + resultado; // Puedes usar .toFixed(1) si quiero  limitar los decimales
    } else {
        promedio.textContent = "No hay peliculas";
    }
};

const actualizarFiltroGeneros = () => {
    filtroGenero.innerHTML = "<option value=''>Todos</option>"; // Mantiene la opción de "Todos"
    const generos = [];
    
    peliculas.forEach(pelicula => {
        // Verificamos si el género no está en el arreglo 
        if (generos.indexOf(pelicula.genero) == -1) {
            generos.push(pelicula.genero);
            const option = document.createElement("option");
            option.value = pelicula.genero;
            option.textContent = pelicula.genero;
            filtroGenero.appendChild(option);
        }
    });
};

filtroGenero.addEventListener("click", () => {
    mostrarPeliculas();
});

mostrarPeliculas();
