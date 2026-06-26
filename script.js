async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");

  for (const element of elements) {
    const file = element.getAttribute("data-include");
    const response = await fetch(file);
    const html = await response.text();
    element.innerHTML = html;
  }

  initMenu();
  initLinks();
  setActiveMenuItem();
}

function getBasePath() {
  const hostname = window.location.hostname;
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // GitHub Pages project site:
  // https://username.github.io/repository-name/
  if (hostname.endsWith("github.io") && pathParts.length > 0) {
    return "/" + pathParts[0] + "/";
  }

  // Local server or ordinary hosting from domain root:
  // http://localhost:8000/
  // https://example.ru/
  return "/";
}

function initLinks() {
  const basePath = getBasePath();
  const links = document.querySelectorAll("[data-page]");

  links.forEach((link) => {
    link.href = basePath + link.dataset.page;
  });
}

function initMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (!menuToggle || !sidebar) return;

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

function setActiveMenuItem() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll(".side-nav a");

  links.forEach((link) => {
    if (link.href && new URL(link.href).pathname === currentPath) {
      link.classList.add("active");
    }
  });
}

includeHTML();
