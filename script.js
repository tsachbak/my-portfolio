//Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});

//My Tech Skills
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("skillsBtn");
  const skillsPopUp = document.getElementById("skillsPopup");
  const closeBtn = document.getElementById("closePopUp");

  btn.addEventListener("click", () => {
    skillsPopUp.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    skillsPopUp.classList.add("hidden");
  });

  document.addEventListener("click", (event) => {
    const isClickInside =
      skillsPopUp.contains(event.target) || btn.contains(event.target);
    if (!isClickInside) {
      skillsPopUp.classList.add("hidden");
    }
  });
});
