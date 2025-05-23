//Script for the Portfolio Page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the mobile menu
  setupMenu();
  // Initialize the hire me modal
  setupHireMeModal();
  // Initialize the hire me form
  setupHireMeForm();
  // Initialize the skills modal
  setupSkillsModal();
});

//Menu
function setupMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

//Hire Me Modal
function setupHireMeModal() {
  const hireMeBtn = document.getElementById("hireMeBtn");
  const hireMeModal = document.getElementById("hireMeModal");
  const closeHireMeModal = document.getElementById("closeHireMeModal");
  const formStatus = document.getElementById("formStatus");
  const floatingHireMeBtn = document.getElementById("floatingHireMeBtn");

  if (hireMeBtn && hireMeModal && closeHireMeModal && floatingHireMeBtn) {
    hireMeBtn.addEventListener("click", () => {
      hireMeModal.classList.remove("hidden");

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "";
      }

      const form = document.getElementById("hireMeForm");
      if (form) {
        form.reset();
      }
    });

    floatingHireMeBtn.addEventListener("click", () => {
      hireMeBtn.click();
    });

    closeHireMeModal.addEventListener("click", () => {
      hireMeModal.classList.add("hidden");
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        floatingHireMeBtn.classList.remove("hidden");
      } else {
        floatingHireMeBtn.classList.add("hidden");
      }
    });
  }
}

//Hire Me Form
function setupHireMeForm() {
  const form = document.getElementById("hireMeForm");
  const status = document.getElementById("formStatus");
  const spinner = document.getElementById("spinner");

  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      //show spinner and clear status
      if (spinner) {
        spinner.classList.remove("hidden");
      }
      status.textContent = "";
      status.className = "";

      try {
        const response = await fetch(
          //local server
          //"https://localhost:7111/api/ContactMe",
          //render server
          "https://myportfolioserver-aijq.onrender.com/api/ContactMe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
          }
        );

        if (response.ok) {
          status.textContent = "Message sent successfully!";
          status.className = "mt-2 text-sm text-green-600";
          form.reset();
        } else {
          const err = await response.json();
          status.textContent = `Error: ${err.message}`;
          status.className = "mt-2 text-sm text-red-600";
        }
      } catch (error) {
        status.textContent = `Failed to send message: ${error}`;
        status.className = "mt-2 text-sm text-red-600";
      } finally {
        // Hide spinner
        if (spinner) {
          spinner.classList.add("hidden");
        }
      }
    });
  }
}

//My Tech Skills
function setupSkillsModal() {
  const btn = document.getElementById("skillsBtn");
  const skillsPopUp = document.getElementById("skillsPopup");
  const closeBtn = document.getElementById("closePopUp");

  if (btn && skillsPopUp && closeBtn) {
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
  }
}
