
const expresiones = {
    nombre:/^[a-zA-ZÁ-ÿ\s]{1,40}$/, // 
    email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //
    numero: /^\d{7,14}$/, //
}

const campos = {
    'form-name': false,
    'form-email': false,
    'form-number': false,
    'form-subject': false,
}

const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')


function validarFormulario(e) {
    switch (e.target.name){
        case "form-name":
            validarCampo (expresiones.nombre, e.target, 'form-name', 'msgName')
        break;
        case "form-email":
            validarCampo (expresiones.email, e.target, 'form-email', 'msgEmail')
            
        break;
        case "form-number":
            validarCampo (expresiones.numero, e.target, 'form-number', 'msgNumber')
        break;
        case "form-subject":
            validarCampo (expresiones.nombre, e.target, 'form-subject', 'msgSubject')
        break;
    }
}


const validarCampo = (expresion, input, campo, icono) => {
    if(expresion.test(input.value)){
        document.getElementById(`${campo}`).classList.remove('form-error')
        document.getElementById(`${campo}`).classList.add('form-correct')
        document.getElementById(`${icono}`).classList.add('bi-check2-circle')
        document.getElementById(`${icono}`).classList.remove('bi-x-lg')
        campos[campo] = true;
    }else{
        document.getElementById(`${campo}`).classList.add('form-error')
        document.getElementById(`${campo}`).classList.remove('form-correct')
        document.getElementById(`${icono}`).classList.add('bi-x-lg')
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos['form-name'] && campos['form-email'] && campos['form-number'] & campos['form-subject']){
        form.reset();
        alert('formulario ingresado con exito')
    }else{
        alert('debes ingresar correctamente')
    }
})