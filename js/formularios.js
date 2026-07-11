// JS para validar los formularios de contacto y newsletter
document.addEventListener("DOMContentLoaded", () => {
    inicializarFormularioContacto();
    inicializarNewsletter();
});
// Función que inicializa la validación del formulario de contacto
function inicializarFormularioContacto() {
  
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");

    if (!nombre || !correo || !mensaje) {
        return;
    }

    const formulario = nombre.closest("form");
    formulario.setAttribute("novalidate", "novalidate");
    const alerta = document.createElement("div");
    alerta.setAttribute("role", "alert");
    formulario.appendChild(alerta); 

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); 

        //  Validacion de cada campo 
        const nombreValido = validarCampo(nombre, nombre.value.trim().length >= 3, "Ingresa un nombre de al menos 3 caracteres.");
        const correoValido = validarCampo(correo, validarCorreo(correo.value), "Ingresa un correo válido, ejemplo: cliente@email.com.");
        const mensajeValido = validarCampo(mensaje, mensaje.value.trim().length >= 10, "El mensaje debe tener al menos 10 caracteres.");

        //Evaluamos si todos los campos pasaron la prueba
        if (nombreValido && correoValido && mensajeValido) {

            // ENVIAR MENSAJE PARA WHATSAPP 
            // Numero de la tienda de R&R Clothing Store 
            const numeroWhatsApp = "51916408971";
            // mensaje combinando los datos del formulario
            const textoMensaje = `¡Hola R&R Clothing Store!\n\nSoy ${nombre.value.trim()}.\nMi correo es: ${correo.value.trim()}\n\n*Mensaje:*\n${mensaje.value.trim()}`;
            // Codificamos el texto para que los espacios y saltos de línea funcionen 
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
            // Abrimos WhatsApp en una nueva pestaña
            window.open(urlWhatsApp, "_blank");

            // Si todo está bien mostramos alerta de éxito en color verde )
            mostrarAlerta(alerta, "Mensaje Enviado Correctamente. Pronto le contestaremos.", "ok");
            formulario.reset(); 

            [nombre, correo, mensaje].forEach((campo) => campo.classList.remove("is-valid"));
        } else {
            // Si algún campo falló, mostramos alerta de error en rojo)
            mostrarAlerta(alerta, "Revisa los campos marcados antes de enviar el mensaje.", "error");
        }
    });
}

// Función que inicializa la validación del formulario de newsletter
function inicializarNewsletter() {
    const formulariosNewsletter = Array.from(document.querySelectorAll(".newsletter-form"));
    formulariosNewsletter.forEach((formulario) => {
        formulario.setAttribute("novalidate", "novalidate");
                const inputCorreo = formulario.querySelector("input[type='email']");
                const alerta = document.createElement("div");
        alerta.setAttribute("role", "alert");
        formulario.appendChild(alerta);

        // botón Suscribirse
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault(); 

            //Evaluamos si el texto escrito tiene formato de correo
            if (validarCorreo(inputCorreo.value)) {
                
                //ENVIAR CORREO PARA WHATSAPP 
                // Numero de WhatsApp de la tienda
                const numeroWhatsApp = "51916408971";
                //Construimos el mensaje de solicitud de suscripción
                const textoMensaje = `¡Hola R&R Clothing Store!\nQuiero suscribirme para recibir novedades y descuentos.\nMi correo electrónico es: ${inputCorreo.value.trim()}`;
                //Codificamos el mensaje para la URL
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
                //Abrimos WhatsApp en una nueva pestaña
                window.open(urlWhatsApp, "_blank"); 

                // ACCIONES SI EL CORREO ES VÁLIDO:
                inputCorreo.classList.remove("is-invalid"); 
                inputCorreo.classList.add("is-valid");   
                mostrarAlerta(alerta, "Suscripción registrada para recibir novedades de R&R.", "ok");
                formulario.reset(); 

            } else {
                // ACCIONES SI EL CORREO ES INVÁLIDO:
                inputCorreo.classList.remove("is-valid");   
                inputCorreo.classList.add("is-invalid");  
                mostrarAlerta(alerta, "Escribe un correo válido para suscribirte.", "error"); 
            }
        });
    });
}

// validacion de cada campo, colores (verde/rojo) y mensajes de error
function validarCampo(campo, condicion, mensaje) {
    let error = campo.parentElement.querySelector(".js-error");
    if (!error) {
        error = document.createElement("div");
        error.className = "js-error";
        campo.parentElement.appendChild(error);
    }
    if (condicion) {
        campo.classList.remove("is-invalid"); 
        campo.classList.add("is-valid");      
        error.textContent = "";               
        return true; 
    }

    // Si el texto del usuario rompe las reglas
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    error.textContent = mensaje; 
    return false; 
}

// bloque de alerta que sale al final del formulario 
function mostrarAlerta(alerta, mensaje, tipo) {
    alerta.className = `js-alerta js-alerta--${tipo}`;
    alerta.textContent = mensaje;
}

// Verifica que el  texto sea un correo usando sus caracteres especiales y el símbolo (@) y (.)
function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}