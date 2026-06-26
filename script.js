async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");

  for (const element of elements) {
    const file = element.getAttribute("data-include");
    const response = await fetch(file);
    const html = await response.text();
    element.innerHTML = html;
  }

  initMenu();
  setActiveMenuItem();
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
    if (link.pathname === currentPath) {
      link.classList.add("active");
    }
  });
}

includeHTML();