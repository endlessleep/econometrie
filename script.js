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
});

// Derivation toggle function for specific IDs
function toggleDerivation(id) {
    const panel = document.getElementById(id);
    if (!panel) return;

    panel.classList.toggle("active");

    // Find the button right before the panel to toggle its text/icon
    const btn = panel.previousElementSibling;
    if (btn && btn.classList.contains('action-btn')) {
        const isShowing = panel.classList.contains("active");

        // Extract the target text part after "Show/Hide Derivation of"
        const textParts = btn.innerHTML.split("Derivation");
        const suffix = textParts.length > 1 ? textParts[1] : "";

        if (isShowing) {
            btn.innerHTML = `<i class="fas fa-eye-slash"></i> Hide Derivation${suffix}`;
        } else {
            btn.innerHTML = `<i class="fas fa-eye"></i> Show/Hide Derivation${suffix}`;
        }
    }
}
