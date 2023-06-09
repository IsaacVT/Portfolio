import { navActions } from "./navBar.js";
import { changeTheme } from "./temas.js";
import { validarInput, valueTextArea, sendForm } from "./formActions.js";
import { cerrarModal, mostrarImagenModal } from "./modal.js";
import { printBoxes } from "./miniBoxes.js";
import { printBlocksExperience } from "./experience.js";

// Navbar
navActions();
changeTheme();

// Skills
printBoxes(document.getElementById("skills-box"), "skills");
printBoxes(document.getElementById("hobbies-box"), "hobbies");

// Experiencia
printBlocksExperience(document.getElementById("xp"));

const evidenceElements = document.querySelectorAll(".experience__evidence");
evidenceElements.forEach((evidenceElement) => {
    const imgElements = evidenceElement.querySelectorAll("img");
    imgElements.forEach((imgE) => {
        imgE.addEventListener("click", () => {
            mostrarImagenModal(imgE);
        });
    });

    const spanElement = evidenceElement.querySelector("span");
    spanElement.addEventListener("click", () => {
        cerrarModal();
    });
});

// Formulario
validarInput(document.getElementById("nombre"), "letras");
validarInput(document.getElementById("email"), "email");
validarInput(document.getElementById("asunto"), "letras");
valueTextArea(document.getElementById("mensaje"));
sendForm(document.getElementById("formulario"));
