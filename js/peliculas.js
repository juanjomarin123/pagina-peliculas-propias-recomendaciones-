localStorage.clear();  //limpiamos el local si se desea

const peliculas = localStorage.getItem("peliculasIngresadas") ? JSON.parse(localStorage.getItem("peliculasIngresadas")) : [];
const nombre = document.getElementById("nombre");
const genero = document.getElementById("genero");
const calificacion = document.getElementById("calificacion");
const contenedor = document.getElementById("peliculasCajita");
const filtroGenero = document.getElementById("filtroGenero");
const promedio = document.getElementById("promedio");
const botonAgregar = document.getElementById("Agregar");

mostrarPeliculas();//imprimimos las peliculas al inicio, obviamente si es q hay en el local storage
actualizarFiltroGeneros()//actualizamos los filtros con las peliculas q hayan y sino igualmente se crea una opcion de todos nada mas

botonAgregar.addEventListener("click", () => {
    if(nombre.value == "" || genero.value == ""){//verificamos q no esten vacios los inputs
        alert("todos los campos son obligatorios");
        return;//usar return cancela lo q estamos haciendo y lo regresa al inicio
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

    if (nombreGeneroExistente == true) {
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

function mostrarPeliculas() { //funcion q imprime las peliculas ingresadas
    contenedor.innerHTML = "";//limpiamos donde van las peliculas

    let suma = 0;
    let cantidad = 0;

    peliculas.forEach(pelicula => {
        if (filtroGenero.value == "" || pelicula.genero == filtroGenero.value) {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4";

            const card = document.createElement("div");
            card.className = "card h-100"; //h=height iguala el tamaño de las cartas en altura

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
            calif.textContent = "Calificacion: " + pelicula.calificacion + "!!"; //aqui tambien puedes usar toFixed :D

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
//al dejar un if con una variable dentro sin ninguna comparacion esta solo verifica q la variable exista o por asi decirlo true y lo que sabemos es q 0 se considera false
    if (cantidad) {
        const resultado = suma / cantidad;
        promedio.textContent = "Promedio: " + resultado; // Puedes usar .toFixed(1) si quiero  limitar los decimales
    } else {
        promedio.textContent = "No hay peliculas";
    }
};

function actualizarFiltroGeneros()  {
    filtroGenero.innerHTML = "<option value=''>todos</option>";//limpiamos las opciones del filtro y a la vez creamos la opcion de todos 
    const generos = [];
    
    peliculas.forEach(pelicula => {
        // Verificamos si el género no está en el arreglo 
        if (generos.indexOf(pelicula.genero) == -1){//el -1 es una forma de verificar q algo no esta en un arreglo 
            generos.push(pelicula.genero);
            const option = document.createElement("option");
            option.value = pelicula.genero;
            option.textContent = pelicula.genero;
            filtroGenero.appendChild(option);
        }
    });
};

filtroGenero.addEventListener("change", () => {//en este caso ya q es un select es mejor usar change q verifica si el valor del select cambia, en caso 'click' solo determina el click al select en general,pero igual funcionaria
    mostrarPeliculas();
});


