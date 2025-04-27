const nombreInput = document.getElementById('nombre');
const botonGuardar = document.getElementById('Agregar');

botonGuardar.addEventListener('click', () => {
  let Nombre = nombreInput.value;
    if(Nombre==""){
        alert("Porfavor, ingresa tu nombre.")
    }else{
  localStorage.setItem('Nombre', Nombre);
  window.location.href = "lista.html";
    
}});
