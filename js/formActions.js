// Validar nombre
const validarInput = (elemento, tipo) => {
    let textoValido = true;

    elemento.addEventListener("input", () => {
        const { msg, valid } = validaTexto(elemento.value, tipo);
        textoValido = valid;

        elemento.setCustomValidity(msg);
        elemento.reportValidity();
    });

    elemento.addEventListener("blur", () => {
        if (!textoValido) {
            elemento.classList.add("invalid");
        } else {
            elemento.classList.remove("invalid");
        }
    });
};

function validaTexto(texto, tipo) {
    if (tipo === "letras") {
        if (texto.length < 2 || texto.length > 50) {
            return {
                msg: "El texto debe tener de 2 a 50 caracteres",
                valid: false,
            };
        }

        if (/\d/.test(texto)) {
            return {
                msg: "No se permiten números",
                valid: false,
            };
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(texto)) {
            return {
                msg: "No se permiten caracteres especiales",
                valid: false,
            };
        }
    } else if (tipo === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
            return {
                msg: "El texto debe ser un correo electrónico válido",
                valid: false,
            };
        }
    }

    return {
        msg: "",
        valid: true,
    };
}

const valueTextArea = (textarea) => {
    const characterCount = document.getElementById("character-count");
    const maxLength = 300;

    textarea.addEventListener("input", updateCharacterCount);

    function updateCharacterCount() {
        let inputText = textarea.value;

        if (inputText.length > maxLength) {
            inputText = inputText.substring(0, maxLength);
            textarea.value = inputText;

            textarea.classList.add("invalid");
        } else {
            textarea.classList.remove("invalid");
        }

        characterCount.textContent = `${inputText.length}/${maxLength}`;
    }

    textarea.addEventListener("blur", () => {
        if (!textarea.value > 1) {
            textarea.classList.add("invalid");
        } else {
            textarea.classList.remove("invalid");
        }
    });

    updateCharacterCount();
};

const sendForm = (form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = {};

        const formElement = e.target;
        let resetElementCount = null;
        let btnSubmit = null;

        for (let element of formElement.elements) {
            if (element.name && element.value) {
                const eNombre = element.name.toLowerCase();
                formData[eNombre] = element.value;

                if (element.name === "Mensaje") {
                    resetElementCount = element;
                }
            }

            if (element.type === "submit") {
                btnSubmit = element;
            }
        }

        const serviceID = "default_service";
        const templateID = "template_70ro9h9";
        const params = formData;

        form.classList.add("send");
        btnSubmit.classList.add("submit");
        btnSubmit.innerHTML =
            "✔<br><br>Gracias por escribirme.<br><br>Me pondre en contacto<br>lo más pronto posible.";

        emailjs
            .send(serviceID, templateID, params)
            .then(() => {
                setTimeout(() => {
                    btnSubmit.innerHTML = "Enviar mensaje";
                    btnSubmit.classList.remove("submit");
                    form.classList.remove("send");
                }, 5000);

                formElement.reset();
                valueTextArea(resetElementCount);
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    });
};

export { validarInput, valueTextArea, sendForm };
