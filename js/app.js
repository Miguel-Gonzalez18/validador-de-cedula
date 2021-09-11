//Creamos un objeto para guardar lo que el usuario escribe en el input
const datos ={
    cedula: ''
}
document.addEventListener('DOMContentLoaded', e =>{
    //cuando se carga todo el documento tomamos el valor del input y llamamos a la funcion leerdatos
    const inputCedula = document.querySelector('.cedulaInput');
    inputCedula.addEventListener('input', leerDato);

    //escuchamos el evento de envio del formulario
    document.querySelector('.formulario-cedula').addEventListener('submit', e=>{

        //validamos el campo de cedula, que no este vacio y no tenga mas o menos de 11 digitos
        if(inputCedula.value === ""){
            if(document.querySelector('.alertaDiv')){
                return;
            }
            mostrarMensaje(`<i class="far fa-times"></i> Debe ingresar su cédula`, 'advertencia', '.group-input')
            e.preventDefault();
        }
        else if(inputCedula.value.length > 11 || inputCedula.value.length < 11){
            if(document.querySelector('.alertaDiv')){
                e.preventDefault();
                return;
            }
            mostrarMensaje(`<i class="far fa-times"></i> La cédula debe ser de 11 digitos`, 'advertencia', '.group-input')
            e.preventDefault();
        }
        else if(validarCedula(inputCedula.value) === true){
            if(document.querySelector('.alertaDiv')){
                e.preventDefault();
                return;
            }
            mostrarMensaje(`<i class="fad fa-smile-wink"></i> Esta cédula es valida`, 'correcto', '.group-input')
            e.preventDefault()

        }
        else if(validarCedula(inputCedula.value) === false){
            if(document.querySelector('.alertaDiv')){
                e.preventDefault();
                return;
            }
            mostrarMensaje(`<i class="far fa-times"></i> Esta cédula no es valida o no existe, intentelo nuevamente`, 'advertencia', '.group-input')
            e.preventDefault()
        }
        e.preventDefault();
    })
});

function leerDato(e){
    //mientras el usuario escribe guardamos lo que escribe en el objeto
    datos.cedula = e.target.value;

    if(datos.cedula.length > 11){//verificamos que la cedula no sea mayor a 11 digitos
        //si es mayor de 11 digitos mostramos una alerta personalizada
        if(document.querySelector('.alertaDiv')){
            return;
        }
        mostrarMensaje(`<i class="far fa-times"></i> La cédula debe tener al menos 11 digitos`, 'advertencia', '.group-input')
    }
}

//funcion para crear una alerta personalizada
function mostrarMensaje(mensaje, tipo, contenedor){
    const contenedorDiv = document.querySelector(contenedor);
    let nombreClase ='';
    if(tipo === "advertencia"){
        nombreClase = "advertencia";
    }
    if(tipo === "correcto"){
        nombreClase = "correcto";
    }

    const divAlerta = document.createElement('DIV');
    divAlerta.classList.add('alertaDiv');
    contenedorDiv.appendChild(divAlerta);

    const alerta = document.createElement('P');
    alerta.classList.add(nombreClase);
    alerta.innerHTML = mensaje;

    divAlerta.appendChild(alerta);
    setTimeout(()=>{
        divAlerta.remove();
    }, 3000)
}




/* Funcion para validar la cédula :)  

    La parte importante el algoritmo para validar la cedula
*/

function validarCedula(cedulaCompleta){
    if( cedulaCompleta.length === 11){// validamos que la cedula sea de 11 digitos

        const cedula = cedulaCompleta.substring(0,10);// Sustraemos los 10 primeros digito de la cedula

        const digitoVerificador = cedulaCompleta.substring(10, 11); // sustraemos el último digito de la cedula

        const ultimoDigito = parseInt(digitoVerificador); // convertimos el ultimo digito a un numero entero

        const cedulaArray = cedula.split(''); // separamos la cadena de 10 digitos en digitos por separado, y recibimos un arreglo como resultado

        const arrayEscala = [1,2,1,2,1,2,1,2,1,2]; // creamos un arreglo con números constantes

        let cadenaString = ''; //creamos una varible para guardar el resultado de cada multiplicasión de los numeros del arreglo 'cedulaArray' por los numeros del arreglo: 'arrayEscala'
        
        for (let index = 0; index < 10; index++) {
            const result = cedulaArray[index] * arrayEscala[index]; // recorremos los numeros del arreglo 'cedulaArray' y lo multiplicamos por el arreglo 'arrayEscala'
            cadenaString += result; // guardamos la cadena resultante
        }
        let suma = 0; //declaramos una variable para sumar la cadena de numeros por separado
        const resultadoArray=cadenaString.split(''); // separamos la cadena de string en numeros separados del arreglo resultante
        resultadoArray.forEach(numero=>{
            //recorremos el arreglo resultante y sumamos todos sus numeros
            suma+=parseInt(numero);
        });
        // al valor resultante le restamos la decena superior y luego le sumamos 10
        const decenaSuperior = suma - (suma%10) + 10;
        const total = decenaSuperior - suma;

        // por ultimo verificamos que el numero total sea igual a ultimo digito de la cedula que tomamos anteriormente
        if(total === ultimoDigito){
            return true;
        }else{
            return false;
        }
        
    }

}