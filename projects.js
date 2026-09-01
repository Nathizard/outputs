// Los proyectos se leen de arriba hacia abajo: el primero es el más reciente.
const projects = [
  {
    title: "My portfolio",
    description: "My first personal website",
    tags: ["HTML", "CSS", "GITHUB"],
    color: "coral",
    art: "portfolio",
    url: "index.html",
  },
  {
    title: "Coming soon",
    description: "A new project is on the way",
    tags: ["IN DEVELOPMENT"],
    color: "blue",
    art: "coming",
    comingSoon: true,
  },
  {
    title: "Coming soon",
    description: "A new project is on the way",
    tags: ["IN DEVELOPMENT"],
    color: "yellow",
    art: "coming",
    comingSoon: true,
  },
];

function createArt(type) {
  const art = {
    portfolio: '<div class="project-art art-notes"><span>✦</span><span>PORTFOLIO</span><span>✦</span></div>',
    coming: '<div class="project-art art-notes"><span>✦</span><span>COMING SOON</span><span>✦</span></div>',
  };

  return art[type];
}

function createProjectCard(project, index, isFullLink = false) {
  const tags = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  const number = String(index + 1).padStart(2, "0");
  const card = `
    <article class="project-card ${project.color} ${project.comingSoon ? "is-coming-soon" : ""}">
      <div class="project-number">${number}</div>
      ${createArt(project.art)}
      <div class="project-info">
        <div><h3>${project.title}</h3><p>${project.description}</p></div>
        ${project.comingSoon ? '<span class="project-link-icon" aria-hidden="true">○</span>' : isFullLink ? '<span class="project-link-icon">↗</span>' : `<a href="${project.url}" aria-label="Ver proyecto ${project.title}">↗</a>`}
      </div>
      <div class="tags">${tags}</div>
    </article>
  `;

  if (isFullLink && !project.comingSoon) {
    return `<a class="project-card-link" href="${project.url}" aria-label="Ver proyecto ${project.title}">${card}</a>`;
  }

  return card;
}

document.querySelectorAll("[data-project-list]").forEach((container) => {
  const list = container.dataset.projectList === "recent" ? projects.slice(0, 3) : projects;
  container.innerHTML = list.map((project, index) => createProjectCard(project, index, true)).join("");
});

// Oculta la barra al bajar y la muestra de nuevo al subir.
const header = document.querySelector(".header");
let previousScrollPosition = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentScrollPosition = window.scrollY;
    const isScrollingDown = currentScrollPosition > previousScrollPosition;

    if (isScrollingDown && currentScrollPosition > 80) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    previousScrollPosition = currentScrollPosition;
  },
  { passive: true },
);
