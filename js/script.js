// Mobile navigation, theme toggle, project filtering and contact form demo.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Theme preference is saved locally in this browser.
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";

if (themeToggle) {
  const updateThemeLabel = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    themeToggle.textContent = isLight ? "☾ Dark mode" : "☼ Light mode";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };
  updateThemeLabel();
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme === "light";
    if (isLight) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("portfolio-theme", "light");
    }
    updateThemeLabel();
  });
}

// Automatically keep the footer year current.
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Filter project cards on the Projects page.
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");
const emptyState = document.querySelector(".empty-state");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      projectCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyState) emptyState.hidden = visibleCount > 0;
    });
  });
}

// Client-side validation + mailto handoff. This demo does not send/store form data.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    // Replace this placeholder with your public email before using the form.
    const recipient = "replace-with-your-email@example.com";
    if (recipient.includes("replace-with-your-email")) {
      formStatus.textContent = "Form validated. Update the recipient email in js/script.js before using the email action.";
      return;
    }

    const data = new FormData(contactForm);
    const subject = encodeURIComponent(data.get("subject") || "Portfolio contact");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    formStatus.textContent = "Opening your email app. Review the draft and send it there.";
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}
