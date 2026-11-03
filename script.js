document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  // MỞ VÀ ĐÓNG MENU TRÊN ĐIỆN THOẠI
  if (menuToggle && nav) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));

      if (isOpen) {
        nav.style.display = "";
      } else {
        nav.style.display = "flex";
      }
    });

  }

  // ĐIỀU HƯỚNG ĐẾN CÁC PHẦN TRÊN WEBSITE
  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      history.pushState(null, "", targetId);

      // ĐÓNG MENU SAU KHI CHỌN MỤC
      if (nav && menuToggle) {
        nav.style.display = "";
        menuToggle.setAttribute("aria-expanded", "false");
      }

    });

  });

  // ĐÓNG MENU KHI BẤM RA NGOÀI
  document.addEventListener("click", event => {

    if (!nav || !menuToggle) return;

    if (
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      nav.style.display = "";
      menuToggle.setAttribute("aria-expanded", "false");
    }

  });

  // HỖ TRỢ PHÍM ESCAPE
  document.addEventListener("keydown", event => {

    if (event.key === "Escape" && nav && menuToggle) {
      nav.style.display = "";
      menuToggle.setAttribute("aria-expanded", "false");
    }

  });

});
