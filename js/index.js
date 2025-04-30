const nombreInput = document.getElementById('nombre');
const botonGuardar = document.getElementById('Agregar');

botonGuardar.addEventListener('click', () => {
  let Nombre = nombreInput.value;
    if(Nombre==""){
        alert("Porfavor, ingresa tu nombre.")
    }else{
  localStorage.setItem('Nombre', Nombre);
  window.location.href = "lista.html";// esto es como  un a con un href que manda a alguna pagina, solo que este lo hace si se cumple la condicion
    
}});
