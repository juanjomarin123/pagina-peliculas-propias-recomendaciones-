const ContenedorPeliculas = document.getElementById("contenedorRecomendaciones");
const ContenedorPaginacion = document.getElementById("contenedorPaginacion");

const ApiKey = "1bf64ba68f574cf1f6615b00d24d1f37";
let PaginaActual = 1;
const MaxPaginas = 20;

obtenerPeliculas(PaginaActual);

function obtenerPeliculas(pagina) {
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=es&page=" + pagina;

  fetch(url)
    .then(peliculitas => peliculitas.json())
    .then(peliculas => {
      mostrarPeliculas(peliculas.results);
      mostrarPaginacion(pagina);
    });
}

function mostrarPeliculas(listaPeliculas) {
  ContenedorPeliculas.innerHTML = "";

  listaPeliculas.forEach(pelicula => {
    const Caja = document.createElement("div");
   Caja.className = "col-12 col-sm-6 col-md-4 mb-4";//esto funciona para q dependiendo del tamaño de la pantalla las cartas sean de a 3,2 o 1.


    const Tarjeta = document.createElement("div");
    Tarjeta.className = "card h-100 bg-dark text-white";
    Tarjeta.style.cursor = "pointer";

    const Imagen = document.createElement("img");
    Imagen.src = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
    Imagen.className = "card-img-top p-2 rounded";
    Tarjeta.appendChild(Imagen);

    const Cuerpo = document.createElement("div");
    Cuerpo.className = "card-body";

    const Titulo = document.createElement("h5");
    Titulo.className = "card-title";
    Titulo.textContent = pelicula.title;
    Cuerpo.appendChild(Titulo);

    Tarjeta.appendChild(Cuerpo);
    Caja.appendChild(Tarjeta);
    ContenedorPeliculas.appendChild(Caja);

    Tarjeta.addEventListener("click", () => {
      mostrarDetallePelicula(pelicula);
    });
  });
}

function mostrarDetallePelicula(pelicula) {
  ContenedorPeliculas.innerHTML = "";

  const Caja = document.createElement("div");
  Caja.className = "d-flex justify-content-center";

  const Tarjeta = document.createElement("div");
  Tarjeta.className = "card text-white bg-dark mb-3";
  Tarjeta.style.maxWidth = "600px";

  const Imagen = document.createElement("img");
  Imagen.src = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
  Imagen.className = "card-img-top p-3";
  Tarjeta.appendChild(Imagen);

  const Cuerpo = document.createElement("div");
  Cuerpo.className = "card-body";

  const Titulo = document.createElement("h4");
  Titulo.className = "card-title";
  Titulo.textContent = pelicula.title;
  Cuerpo.appendChild(Titulo);

  const Descripcion = document.createElement("p");
  Descripcion.className = "card-text";
  Descripcion.textContent = pelicula.overview;
  Cuerpo.appendChild(Descripcion);

  const Puntuacion = document.createElement("p");
  Puntuacion.className = "card-text";
  let voto = pelicula.vote_average
  Puntuacion.textContent = "Puntuación: " + voto.toFixed(1) + " !!!";
  Cuerpo.appendChild(Puntuacion);

  Tarjeta.appendChild(Cuerpo);
  Caja.appendChild(Tarjeta);
  ContenedorPeliculas.appendChild(Caja);

  const BotonVolver = document.createElement("button");
  BotonVolver.className = "btn btn-light mt-3";
  BotonVolver.textContent = "Volver a las recomendaciones";
  BotonVolver.addEventListener("click", () => {
    obtenerPeliculas(PaginaActual);
  });

  ContenedorPeliculas.appendChild(BotonVolver);
}

function mostrarPaginacion(paginaSeleccionada) {
  ContenedorPaginacion.innerHTML = "";

  // Contenedor para los botones de paginación
  const Fila = document.createElement('div');
  Fila.className = "d-flex flex-wrap justify-content-center gap-2 mt-4";

  // Botón Anterior
  const BotonAnterior = document.createElement("button");
  BotonAnterior.textContent = "Anterior";
  BotonAnterior.className = "btn btn-secondary";
  BotonAnterior.addEventListener("click", () => {
    if (paginaSeleccionada > 1) {
      paginaSeleccionada--;
      obtenerPeliculas(paginaSeleccionada);
    }
  });
  Fila.appendChild(BotonAnterior);

  // Botones de Páginas
  for (let i = 1; i <= MaxPaginas; i++) {
    const BotonPagina = document.createElement("button");
    BotonPagina.textContent = i;
    BotonPagina.className = "btn " + (i === paginaSeleccionada ? "btn-light" : "btn-outline-light");
    BotonPagina.addEventListener("click", () => {
      obtenerPeliculas(i);
    });
    Fila.appendChild(BotonPagina);
  }

  // Botón Siguiente
  const BotonSiguiente = document.createElement("button");
  BotonSiguiente.textContent = "Siguiente";
  BotonSiguiente.className = "btn btn-secondary";
  BotonSiguiente.addEventListener("click", () => {
    if (paginaSeleccionada < MaxPaginas) {
      paginaSeleccionada++;
      obtenerPeliculas(paginaSeleccionada);
    }
  });
  Fila.appendChild(BotonSiguiente);

  ContenedorPaginacion.appendChild(Fila);
}
