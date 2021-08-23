// Variables
const formulario = document.querySelector('#enviar-mail');

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
// https://emailregex.com/ 
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Variables para el campo
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// EventsListeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',inicializando);
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);
    
    btnReset.addEventListener('click',resetearFormulario);
    formulario.addEventListener('submit',enviarEmail);
}

// Function
function inicializando(){
    btnEnviar.disabled = true;  // disabled: desabilita la accion('type') del buttom
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');   
}

function validarFormulario(focusEvent){
    const evento = focusEvent; // es algo que podes llamar siempre de un eventListener tiene mucha información
    //console.log(evento.target.value.length)   // console.log(evento)
   // console.log(evento.target.type === 'email') // Devuelve un boleano de los tipos de inputs correctos puestos
    if(evento.target.value.length > 0){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
            evento.target.classList.remove('border','border-red-500');
            evento.target.classList.add('border','border-green-500');
        }
    }else {
        evento.target.classList.remove('border','border-green-500');
        evento.target.classList.add('border','border-red-500');
         mostrarError('Todos los campos son obligatorios');
        
    }
   validarEmail(evento);
   validarAsunto(evento);
   validarMensaje(evento);
   if(expresionRegular.test(email.value) && asunto.value.length > 5 && mensaje.value.length > 5){
       btnEnviar.disabled = false;
       btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
   }
}

function validarEmail(e){
    if(e.target.type === 'email'){
        if(expresionRegular.test(e.target.value)){
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        } else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('El email es incorrecto,intente nuevamente')
        }
    }
}
function validarAsunto(e){
    if(e.target.type ==='text'){
        const valuacion = e.target.value;

        if(valuacion.length > 5){
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        } else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('Es necesario poner un titulo');
        }
    }
}
function validarMensaje(e){
    if(e.target.type ==='textarea'){
        const valuacion = e.target.value;  // aca estoy agarrando lo que escribio el cliente

        if(valuacion.length > 5){
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        } else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('Es necesario escribir algo en mensaje')
        }
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
       formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();
    const spiner = document.querySelector('#spinner');
    spiner.style.display = 'flex';
    setTimeout(()=>{
        spiner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje fue envado exitosamente';
        parrafo.classList.add('text-center','my-10','bg-green-500','p-2','text-white','font-bold','uppercase');
        formulario.insertBefore(parrafo,spiner);
        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario(e);
        },4000);
    },3000);
}

function resetearFormulario(e){
    e.preventDefault();
    email.classList.remove('border','border-red-500','border-green-500');
    asunto.classList.remove('border','border-red-500','border-green-500');
    mensaje.classList.remove('border','border-red-500','border-green-500');
    const error = document.querySelector('p.error');
    if(error){
        error.remove()
    }
    formulario.reset();
    inicializando();
}