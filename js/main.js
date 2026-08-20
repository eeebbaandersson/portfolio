const projectGrid = document.getElementById('project-grid');

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

 document.addEventListener('DOMContentLoaded',loadProjects);
    
