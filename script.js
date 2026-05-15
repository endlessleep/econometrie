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

    // Handle initial section load from hash
    const initialHash = window.location.hash;
    if (initialHash) {
        const sectionId = initialHash.replace('#', '');
        switchSection(null, sectionId);
    } else {
        // Default to section 1.1 if no hash (or final revision sheet if you prefer)
        // Check which section is currently visible or default to one
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            // If there's an active link in HTML, just let it be, 
            // but usually we want to force a section to show.
        }
    }
});

// Listen for hash changes to handle back/forward buttons
window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId) {
        switchSection(null, sectionId);
    }
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

// Section toggler for single page app feel
function switchSection(event, targetId) {
    // If it's a click event, prevent default and update hash
    if (event) {
        event.preventDefault();
        window.location.hash = targetId;
        return; // hashchange listener will trigger switchSection(null, targetId)
    }

    // Update active class on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's onclick attribute contains the targetId
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(targetId)) {
            link.classList.add('active');
            
            // Also ensure the parent accordion is open
            const accordionItem = link.closest('.accordion-item');
            if (accordionItem) {
                accordionItem.classList.add('active');
            }
        }
    });

    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => {
            target.classList.add('active');
        }, 50); // slight delay for CSS transition if any
    }

    // Close sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth <= 900) {
        sidebar.classList.remove('mobile-open');
    }
}
