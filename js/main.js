const projectGrid = document.querySelector('#project-grid');

// Form fields & error msg elements
const contactForm = document.querySelector('#contact-form');
const elName = document.querySelector('#name'); 
const elEmail = document.querySelector('#email');
const elMessage = document.querySelector('#message');

const elNameError = document.querySelector('#name-error')
const elEmailError = document.querySelector('#email-error')
const elMessageError = document.querySelector('#message-error')


async function loadProjects() {
    try {
        const response = await fetch('./projects.json');

        if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
            
        }

        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error("Kunde inte ladda projekten;", error);
        projectGrid.innerHTML = `<p>Det gick inte att ladda projekten just nu.</p>`;
    }   
 }

 function renderProjects(projects) {
    projectGrid.innerHTML = projects.map(project => {

        const tagsHtml = project.tags
        .map(tag => `<li>${tag}</li>`)
        .join('');

       return `
            <article class="project-card">
                <div class="project-image-card">
                    <img src="${project.image}" alt="${project.imageAlt}">
                </div>

                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <ul class="tag-list">
                    ${tagsHtml}
                </ul>

                <a href="${project.link}" class="project-link">Visa projekt</a>
            </article>
        `;
    }).join('');
 }


 function checkName() {
    if (elName.value.trim() === '') {
        elNameError.innerHTML = 'Vänligen fyll i ditt namn';
        return false;
    } else {
         elNameError.innerHTML = '';
         return true;
    }
 }

 function checkEmail() {
    if (elEmail.value.trim() === '') {
        elEmailError.innerHTML = "Vänligen fyll i din mailadress";
        return false;
    } else {
         elEmailError.innerHTML = '';
         return true;
    }
 }

 function checkMessageInput() {
    if (elMessage.value.trim() === '') {
        elMessageError.innerHTML = 'Glöm inte ditt meddelande!';
        return false;
    } else {
        elMessageError.innerHTML = '';
        return true;
    }
 }

 // Event listeners for blur
 elName.addEventListener('blur', checkName, false);
 elEmail.addEventListener('blur', checkEmail, false);
 elMessage.addEventListener('blur', checkMessageInput, false);


 // Formhandling to submit-button
 contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isMessageValid = checkMessageInput();

    let statusMessage = document.querySelector('#form-status');

    if (isNameValid && isEmailValid && isMessageValid) {
        if (!statusMessage) {
            statusMessage = document.createElement('p');
            statusMessage.id = 'form-status';
            statusMessage.className = 'success-message';
            contactForm.appendChild(statusMessage);
        }
        statusMessage.textContent = 'Tack för ditt meddelande! \n Denna funktion är ännu inte helt på plats, så du når mig snabbast via email.';
        
    }
 });

 document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
 });
    
