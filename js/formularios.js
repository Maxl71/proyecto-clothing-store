// Inicia la validación cuando termina de cargar el HTML
document.addEventListener("DOMContentLoaded", () => {
    inicializarFormularioContacto();
    inicializarNewsletter();
});

// Formulario de contacto
function inicializarFormularioContacto() {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");

    // Detiene la función si los campos no existen
    if (!nombre || !correo || !mensaje) return;

    const formulario = nombre.closest("form");
    const alerta = document.createElement("div");

    // Desactiva los mensajes automáticos del navegador
    formulario.setAttribute("novalidate", "novalidate");

    // Crea la alerta general al final del formulario
    alerta.setAttribute("role", "alert");
    formulario.appendChild(alerta);

    // Valida el nombre cuando el usuario sale del campo
    nombre.addEventListener("blur", () => {
        validarCampo(
            nombre,
            nombre.value.trim().length >= 3,"Ingresa un nombre de al menos 3 caracteres."
        );
    });

    // Valida el correo cuando el usuario sale del campo
    correo.addEventListener("blur", () => {
        validarCampo(
            correo,
            validarCorreo(correo.value),"Ingresa un correo válido, ejemplo: cliente@email.com."
        );
    });

    // Valida el mensaje cuando el usuario sale del campo
    mensaje.addEventListener("blur", () => {
        validarCampo(
            mensaje,
            mensaje.value.trim().length >= 10,"El mensaje debe tener al menos 10 caracteres."
        );
    });

    // Vuelve a validar el campo mientras el usuario corrige el error
    formulario.addEventListener("input", (evento) => {
        const campo = evento.target;

        const campoValidado =
            campo.classList.contains("is-invalid") ||
            campo.classList.contains("is-valid");

        if (!campoValidado) return;

        if (campo === nombre) {
            validarCampo(
                nombre,
                nombre.value.trim().length >= 3, "Ingresa un nombre de al menos 3 caracteres."
            );
        }

        if (campo === correo) {
            validarCampo(
                correo,
                validarCorreo(correo.value), "Ingresa un correo válido, ejemplo: cliente@email.com."
            );
        }

        if (campo === mensaje) {
            validarCampo(
                mensaje,
                mensaje.value.trim().length >= 10, "El mensaje debe tener al menos 10 caracteres."
            );
        }
    });

    // Valida todos los campos al presionar Enviar mensaje
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombreValido = validarCampo(
            nombre,
            nombre.value.trim().length >= 3,"Ingresa un nombre de al menos 3 caracteres."
        );

        const correoValido = validarCampo(
            correo,
            validarCorreo(correo.value),"Ingresa un correo válido, ejemplo: cliente@email.com."
        );

        const mensajeValido = validarCampo(
            mensaje,
            mensaje.value.trim().length >= 10,"El mensaje debe tener al menos 10 caracteres."
        );

        // Envía los datos a WhatsApp si todo es válido
        if (nombreValido && correoValido && mensajeValido) {
            const numeroWhatsApp = "51916408971";

            const textoMensaje =
                `¡Hola R&R Clothing Store!\n\n` +
                `Soy ${nombre.value.trim()}.\n` +
                `Mi correo es: ${correo.value.trim()}\n\n` +
                `*Mensaje:*\n${mensaje.value.trim()}`;

            const urlWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;

            window.open(urlWhatsApp, "_blank");

            mostrarAlerta(
                alerta,"Mensaje enviado correctamente. Pronto le contestaremos.","ok"
            );

            formulario.reset();
            limpiarCampos([nombre, correo, mensaje]);
        } else {
            mostrarAlerta(
                alerta,"Revisa los campos marcados antes de enviar el mensaje.", "error"
            );
        }
    });
}

// Formulario de newsletter
function inicializarNewsletter() {
    const formularios = document.querySelectorAll(".newsletter-form");

    formularios.forEach((formulario) => {
        const inputCorreo = formulario.querySelector("input[type='email']");

        if (!inputCorreo) return;

        const alerta = document.createElement("div");

        formulario.setAttribute("novalidate", "novalidate");
        alerta.setAttribute("role", "alert");
        formulario.appendChild(alerta);

        // Valida el correo cuando el usuario sale del campo
        inputCorreo.addEventListener("blur", () => {
            validarCampo(
                inputCorreo,
                validarCorreo(inputCorreo.value), "Escribe un correo electrónico válido."
            );
        });

        // Vuelve a validar mientras el usuario corrige el correo
        inputCorreo.addEventListener("input", () => {
            const campoValidado =
                inputCorreo.classList.contains("is-invalid") ||
                inputCorreo.classList.contains("is-valid");

            if (!campoValidado) return;

            validarCampo(
                inputCorreo,
                validarCorreo(inputCorreo.value),"Escribe un correo electrónico válido."
            );
        });

        // Valida el correo al presionar Suscribirse
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const correoValido = validarCampo(
                inputCorreo,
                validarCorreo(inputCorreo.value),"Escribe un correo electrónico válido."
            );

            if (correoValido) {
                const numeroWhatsApp = "51916408971";

                const textoMensaje =
                    `¡Hola R&R Clothing Store!\n` +
                    `Quiero suscribirme para recibir novedades y descuentos.\n` +
                    `Mi correo electrónico es: ${inputCorreo.value.trim()}`;

                const urlWhatsApp =
                    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;

                window.open(urlWhatsApp, "_blank");

                mostrarAlerta(
                    alerta, "Suscripción registrada para recibir novedades de R&R.","ok"
                );

                formulario.reset();
                limpiarCampos([inputCorreo]);
            } else {
                mostrarAlerta( "Escribe un correo válido para suscribirte.","error"
                );
            }
        });
    });
}

// Coloca el borde verde o rojo y muestra el error del campo
function validarCampo(campo, condicion, mensaje) {
    let error = campo.nextElementSibling;

    // Crea el mensaje de error si todavía no existe
    if (!error || !error.classList.contains("js-error")) {
        error = document.createElement("div");
        error.className = "js-error";
        campo.insertAdjacentElement("afterend", error);
    }

    if (condicion) {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        error.textContent = "";
        return true;
    }

    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    error.textContent = mensaje;
    return false;
}

// Muestra la alerta general durante 5 segundos
function mostrarAlerta(alerta, mensaje, tipo) {
    alerta.className = `js-alerta js-alerta--${tipo}`;
    alerta.textContent = mensaje;

    // Cancela el temporizador anterior si existe
    if (alerta.temporizador) {
        clearTimeout(alerta.temporizador);
    }

    alerta.temporizador = setTimeout(() => {
        alerta.className = "";
        alerta.textContent = "";
    }, 5000);
}

// Limpia los colores y mensajes después de un envío correcto
function limpiarCampos(campos) {
    campos.forEach((campo) => {
        campo.classList.remove("is-valid", "is-invalid");

        const error = campo.nextElementSibling;

        if (error && error.classList.contains("js-error")) {
            error.textContent = "";
        }
    });
}

// Comprueba que el correo tenga texto, arroba y punto
function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}