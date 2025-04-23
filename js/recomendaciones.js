const ContenedorPeliculas = document.getElementById("contenedorRecomendaciones");
const ContenedorPaginacion = document.getElementById("contenedorPaginacion");

const ApiKey = "1bf64ba68f574cf1f6615b00d24d1f37";//esta api funciona con una llave
let PaginaActual = 1;
const MaxPaginas = 20;

obtenerPeliculas(1);

function obtenerPeliculas(pagina) {
  PaginaActual = pagina; //  Esto guarda la página actual

  const url = "https://api.themoviedb.org/3/movie/popular?api_key=" + ApiKey + "&language=es&page=" + pagina;

  fetch(url)
    .then(peliculitas => peliculitas.json())//convertimos lo q mande la api a un json
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
    Imagen.src = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;//se usa el primer link pq el q nos da la api no es completo sino q toca poner el otro q maneja el tamaño
    Imagen.className = "card-img-top p-2";

    const Cuerpo = document.createElement("div");
    Cuerpo.className = "card-body";

    const Titulo = document.createElement("h5");
    Titulo.className = "card-title";
    Titulo.textContent = pelicula.title;

    // Al final, haces todos los appendChild
    Cuerpo.appendChild(Titulo);
    Tarjeta.appendChild(Imagen);
    Tarjeta.appendChild(Cuerpo);
    Caja.appendChild(Tarjeta);
    ContenedorPeliculas.appendChild(Caja);

    // Agregar el evento para mostrar los detalles de la película
    Tarjeta.addEventListener("click", () => {
      mostrarDetallePelicula(pelicula);
    });
  });
}

function mostrarDetallePelicula(pelicula) {//esta es la funcion q limpia toda la pantalla e imprime solo la pelicula a la q se le dio click
  ContenedorPeliculas.innerHTML = "";
  ContenedorPaginacion.innerHTML = "";

//hacemos lo mismo de arriba pero ahora que solo se mando una sola pelicula y no hay un forEach se hara una sola vez, ademas imprimimos informacion adicional
  const Caja = document.createElement("div");
  Caja.className = "d-flex justify-content-center";

  const Tarjeta = document.createElement("div");
  Tarjeta.className = "card text-white bg-dark mb-3";
  Tarjeta.style.maxWidth = "500px";

  const Imagen = document.createElement("img");
  Imagen.src = "https://image.tmdb.org/t/p/w500" + pelicula.poster_path;
  Imagen.className = "card-img-top p-3";

  const Cuerpo = document.createElement("div");
  Cuerpo.className = "card-body";

  const Titulo = document.createElement("h4");
  Titulo.className = "card-title";
  Titulo.textContent = pelicula.title;

  const Descripcion = document.createElement("p");
  Descripcion.className = "card-text";
  Descripcion.textContent = pelicula.overview;

  const Puntuacion = document.createElement("p");
  Puntuacion.className = "card-text";
  let voto = pelicula.vote_average
  Puntuacion.textContent = "Puntuación: " + voto.toFixed(1) + " !!!";

  Cuerpo.appendChild(Titulo);
  Cuerpo.appendChild(Descripcion);
  Cuerpo.appendChild(Puntuacion);
  Tarjeta.appendChild(Imagen);
  Tarjeta.appendChild(Cuerpo);
  Caja.appendChild(Tarjeta);
  ContenedorPeliculas.appendChild(Caja);
//creamos un boton q nos permita volver a la pagina que estabamos 
  const BotonVolver = document.createElement("button");
  BotonVolver.className = "btn btn-light mt-3";
  BotonVolver.textContent = "Volver a las recomendaciones";
  BotonVolver.addEventListener("click", () => {
    obtenerPeliculas(PaginaActual);//mandamos la pagina en la q estamos para q al volver sigamos en la misma, paginaActual es una variable global asi q la podemos usar en cualquier parte del codigo 
  });

  ContenedorPeliculas.appendChild(BotonVolver);
}

function mostrarPaginacion(paginaSeleccionada) {//esta funcion crea los botones incluyendo los de anterior y siguiente
  ContenedorPaginacion.innerHTML = "";

  // Contenedor para los botones de paginación
  const Fila = document.createElement('div');
  Fila.className = "d-flex flex-wrap justify-content-center gap-2 mt-4";//gap es el espacio entre botones y el wrap es q cuando los botones no quepan vayan hacia abajo

  const BotonAnterior = document.createElement("button");
  BotonAnterior.textContent = "Anterior";
  BotonAnterior.className = "btn btn-secondary";
  BotonAnterior.addEventListener("click", () => {
    if (paginaSeleccionada > 1) {
      paginaSeleccionada--;//resta en 1 la pagina en la q estemos siempre y cuando no sea 1 
      obtenerPeliculas(paginaSeleccionada);
    }
  });

  Fila.appendChild(BotonAnterior);

  for (let i = 1; i <= MaxPaginas; i++) {//este for se usa para no tener q crear uno por uno los botones hasta el maximo de paginas
    const BotonPagina = document.createElement("button");
    BotonPagina.textContent = i;
    BotonPagina.className = "btn " + (i === paginaSeleccionada ? "btn-light" : "btn-outline-light");//cambia el color de la pagina si es que la pagina en la que estamos es la misma 
    BotonPagina.addEventListener("click", () => {
      obtenerPeliculas(i);//cada boton tiene un listener que llamara a la funcion que pide la api, hace la promesa, e imprime todo de nuevo  y le mandamos la i que recibiremos como pagina arriba
    });

    Fila.appendChild(BotonPagina);
  }

  const BotonSiguiente = document.createElement("button");
  BotonSiguiente.textContent = "Siguiente";
  BotonSiguiente.className = "btn btn-secondary";
  BotonSiguiente.addEventListener("click", () => {
    if (paginaSeleccionada < MaxPaginas) {
      paginaSeleccionada++;// lo mismo que la pagina que resta pero suma siempre y cuando no estemos en la ultima pagina
      obtenerPeliculas(paginaSeleccionada);//pagina seleccionada es la que recibio la funcion pero en este caso se le sumara 1 entonces al llamar la api sera una pagina diferente
    }
  });

  Fila.appendChild(BotonSiguiente);//a la fila q es el div q tiene a todos los botones se le estuvieron agregando todos los botones
  ContenedorPaginacion.appendChild(Fila);//se envian todos estos botones  a el div que tenemos en el html para imprimir, q tiene un row para que esten bien organizadas 
}
