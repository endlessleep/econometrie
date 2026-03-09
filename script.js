document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle
    const toggleBtn = document.getElementById("toggle-sidebar");
    const mobileToggleBtn = document.getElementById("mobile-toggle");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }

    // Accordion
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("active");
        });
    });

    // Derivation toggle
    const deriveBtn = document.getElementById("derive-btn");
    const derivePanel = document.getElementById("derivation-panel");
    if (deriveBtn && derivePanel) {
        deriveBtn.addEventListener("click", () => {
            derivePanel.classList.toggle("active");

            // Toggle text and icon
            if (derivePanel.classList.contains("active")) {
                deriveBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Derivation of MM Estimators';
            } else {
                deriveBtn.innerHTML = '<i class="fas fa-eye"></i> Show Derivation of MM Estimators';
            }
        });
    }
});
