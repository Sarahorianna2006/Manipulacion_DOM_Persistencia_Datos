//Evento para guardar datos en el Local Storage
document.getElementById('saveButton').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');

    if (!nameInput  || !ageInput){
        console.error('Los elementos del formulario no existen.');
        return;
    }
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);

    if (validarSoloLetras(name) && !isNaN(age) && age >=0 &&  age <= 100) {
        localStorage.setItem('userName', name);
        localStorage.setItem('userAge', age);
        displayData(); 
    } else{
        alert('Por favor, ingresa un nombre válido (solo letras) y una edad entre 0 a 100.');
    }
});

//Función para validar solo el ingreso de letras en el campo de nombre y espacios entre palabras
function validarSoloLetras (cadena){
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(cadena)
}
function obtenerRangoEdad (edad){
    if (edad >= 0 && edad <= 13){
        return 'niño';
    } else if (edad <= 17){
        return 'adolescente';
    } else if (edad <= 69 ){
        return 'adulto';
    } else if (edad <= 100){
        return 'adulto mayor'
    } else{
        return null;
    }
}

//Función para mostrar los datos almacenados
function displayData() {
    const name = localStorage.getItem('userName');
    const age = parseInt(localStorage.getItem('userAge'));
    const outputDiv = document.getElementById('output');
    
    if (name && !isNaN(age)) {
        const rango = obtenerRangoEdad(age);
        if (rango){
            outputDiv.textContent = `Hola ${name}, eres un ${rango} y tienes ${age} años.`;
        } else {
        outputDiv.textContent = 'Edad fuera del rango.';
        }
    }
}

//Al cargar la página, mostrar los datos almacenados
window.onload = displayData;

//Inicializar contador de interacciones en Session Storage
if (!sessionStorage.getItem('interactionCount')) {
    sessionStorage.setItem('interactionCount', 0);
}

//Actualizar contador de interacciones
function updataInteractionCount () {
    let count = parseInt(sessionStorage.getItem('interactionCount'));
    count++;
    sessionStorage.setItem('interactionCount', count);
    console.log(`Interacciones en esta sesión: ${count}`);
}

//Asignar eventos al contador
document.getElementById('saveButton').addEventListener('click', updataInteractionCount);
document.getElementById('clearButton').addEventListener('click', updataInteractionCount);

//Evento para limpiar los datos del Local Storage
document.getElementById('clearButton').addEventListener('click', () => {
    localStorage.clear();
    displayData();
});