document.addEventListener("DOMContentLoaded", () => {
  // ===== ACTIVE NAVIGATION ITEM =====
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");
    if (
      currentPage === linkPage ||
      (currentPage === "service.html" && linkPage === "service.html") ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // ===== HAMBURGER MENU FUNCTIONALITY =====
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("nav-links");

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinksContainer.classList.toggle("active");
    });
  }

  // ===== BOOK APPOINTMENT + SMOOTH SCROLL =====
  const header = document.querySelector(".header");
  const headerHeight = header?.offsetHeight || 80;
  const consultationForm = document.querySelector(".consultation-form");
  const consultationSection = document.querySelector(".consultation");

  const smoothScroll = (el) => {
    const y =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - 30;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const highlight = (el) => {
    el.style.cssText =
      "transform:scale(1.02);transition:all .4s ease;box-shadow:0 0 30px rgba(168,196,162,.5)";
    setTimeout(() => (el.style.cssText = ""), 800);
  };

  document.querySelectorAll(".Appointment").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (consultationForm) {
        smoothScroll(consultationForm);
        highlight(consultationForm);
      } else if (consultationSection) {
        smoothScroll(consultationSection);
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        smoothScroll(target);
      }
    });
  });
});

// ===== PRELOADER FUNCTIONALITY =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 500); // Slight delay
  }
});

//  ===== SCROLL FUNCTIONALITY =====
// let lastScrollY = window.scrollY;
// const header = document.querySelector('.header');
// const progressFill = document.getElementById('progressFill');
// const progressBar = document.querySelector('.progress-bar');

// window.addEventListener('scroll', () => {
//   const currentScroll = window.scrollY;

//    Header show/hide based on scroll direction
//   if (currentScroll < lastScrollY) {
//     header.classList.add('show');
//     header.classList.remove('hide');
//     if (progressBar) progressBar.style.opacity = '0';
//   } else {
//     header.classList.add('hide');
//     header.classList.remove('show');
//     if (progressBar && currentScroll > 100) progressBar.style.opacity = '1';
//   }

//   lastScrollY = currentScroll;

//    Scroll progress bar fill
//   if (progressFill) {
//     const scrolled = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
//     progressFill.style.width = scrolled + '%';
//   }
// });

// ===== PRELOADER FUNCTIONALITY =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 500); // Slight delay
  }
});

// ===== SCROLL FUNCTIONALITY =====
const header = document.querySelector(".header");
const progressFill = document.getElementById("progressFill");
const progressBar = document.querySelector(".progress-bar");

// Keep header always visible at top
if (header) {
  header.style.position = "fixed";
  header.style.top = "0";
  header.style.left = "0";
  header.style.right = "0";
  header.style.zIndex = "1000";
  header.classList.add("show");
  header.classList.remove("hide");
}

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Show/hide progress bar based on scroll position
  if (progressBar) {
    if (currentScroll > 100) {
      progressBar.style.opacity = "1";
    } else {
      progressBar.style.opacity = "0";
    }
  }

  // Scroll progress bar fill
  if (progressFill) {
    const scrolled =
      (currentScroll /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressFill.style.width = scrolled + "%";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // WhatsApp Button Functionality
  const whatsappButton = document.querySelector(".whatsapp-float");

  if (whatsappButton) {
    // Add pulse animation every 10 seconds
    setInterval(() => {
      whatsappButton.classList.add("pulse");
      setTimeout(() => {
        whatsappButton.classList.remove("pulse");
      }, 2000);
    }, 10000);

    // Track WhatsApp clicks for analytics
    whatsappButton.addEventListener("click", function () {
      console.log("WhatsApp button clicked");
      // Add your analytics tracking here if needed
    });
  }

  // Phone Call Button Enhanced Functionality
  const phoneButton = document.querySelector(".phone-button");
  const floatingButton = document.querySelector(".floating-contact-button");

  if (phoneButton && floatingButton) {
    // Add click analytics (optional)
    phoneButton.addEventListener("click", function (e) {
      // Track the call button click
      console.log("Phone call initiated");

      // Optional: Send analytics data
      if (typeof gtag !== "undefined") {
        gtag("event", "phone_call", {
          event_category: "contact",
          event_label: "floating_button",
        });
      }

      // Add visual feedback
      phoneButton.style.transform = "scale(0.95)";
      setTimeout(() => {
        phoneButton.style.transform = "";
      }, 150);
    });

    // Show/hide button on scroll (optional)
    let scrollTimeout;
    window.addEventListener("scroll", function () {
      floatingButton.style.opacity = "0.7";
      if (whatsappButton) whatsappButton.style.opacity = "0.7";

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        floatingButton.style.opacity = "1";
        if (whatsappButton) whatsappButton.style.opacity = "1";
      }, 1000);
    });

    // Add vibration feedback on mobile (if supported)
    phoneButton.addEventListener("touchstart", function () {
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
    });

    // Auto-hide after certain time of inactivity (optional)
    let inactivityTimer;
    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      floatingButton.style.display = "block";
      if (whatsappButton) whatsappButton.style.display = "flex";

      // Hide after 30 seconds of inactivity (optional feature)
      // inactivityTimer = setTimeout(() => {
      //     floatingButton.style.display = 'none';
      //     if (whatsappButton) whatsappButton.style.display = 'none';
      // }, 30000);
    }

    // Reset timer on user activity
    ["mousedown", "mousemove", "keypress", "scroll", "touchstart"].forEach(
      (event) => {
        document.addEventListener(event, resetInactivityTimer, true);
      }
    );

    // Initialize
    resetInactivityTimer();
  }
});

// Additional utility functions
function updatePhoneNumber(newNumber) {
  const phoneButton = document.querySelector(".phone-button");
  if (phoneButton) {
    phoneButton.href = `tel:${newNumber}`;
  }
}

function updateWhatsAppNumber(
  newNumber,
  message = "Hello%20I%20would%20like%20to%20know%20more%20about%20your%20services"
) {
  const whatsappButton = document.querySelector(".whatsapp-float");
  if (whatsappButton) {
    whatsappButton.href = `https://wa.me/${newNumber}?text=${message}`;
  }
}

function toggleButtonTheme(theme) {
  const phoneButton = document.querySelector(".phone-button");
  if (phoneButton) {
    phoneButton.className = `phone-button ${theme}`;
  }
}

// Example usage:
// updatePhoneNumber('+911234567890');
// updateWhatsAppNumber('911234567890');
// toggleButtonTheme('hospital-theme'); // or 'emergency-theme'

// Popup functionality
class ConsultationPopup {
  constructor() {
    this.popup = null;
    this.form = null;
    this.isShown = false;
    this.showTimer = null;
    this.init();
  }

  init() {
    // Wait for DOM to load
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.popup = document.getElementById("consultationPopup");
    this.form = document.getElementById("popupConsultationForm");

    if (!this.popup || !this.form) {
      console.error("Popup elements not found");
      return;
    }

    this.bindEvents();
    this.startTimer();
  }

  bindEvents() {
    // Close button event
    const closeBtn = this.popup.querySelector(".popup-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.closePopup();
      });
    }

    // Close on overlay click
    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) {
        this.closePopup();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isShown) {
        this.closePopup();
      }
    });

    // Form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Prevent body scroll when popup is open
    this.popup.addEventListener("wheel", (e) => {
      e.preventDefault();
    });
  }

  startTimer() {
    // Show popup after 10 seconds
    this.showTimer = setTimeout(() => {
      this.showPopup();
    }, 10000); // 10 seconds
  }

  showPopup() {
    if (this.isShown || !this.popup) return;

    this.isShown = true;
    this.popup.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Focus on first input for accessibility
    setTimeout(() => {
      const firstInput = this.form.querySelector('input[type="text"]');
      if (firstInput) {
        firstInput.focus();
      }
    }, 300);
  }

  closePopup() {
    if (!this.isShown || !this.popup) return;

    this.popup.classList.remove("show");

    setTimeout(() => {
      this.isShown = false;
      document.body.style.overflow = ""; // Restore body scroll
    }, 300);
  }

  handleSubmit() {
    const submitBtn = this.form.querySelector(".popup-submit-btn");
    const formData = new FormData(this.form);

    // Validate required fields
    const requiredFields = this.form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ff4444";
        isValid = false;
      } else {
        field.style.borderColor = "#e5e5e5";
      }
    });

    // Validate email format
    const emailField = this.form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.style.borderColor = "#ff4444";
        isValid = false;
      }
    }

    // Validate phone number (basic validation)
    const phoneField = this.form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phoneField.value)) {
        phoneField.style.borderColor = "#ff4444";
        isValid = false;
      }
    }

    if (!isValid) {
      this.showError("Please fill in all required fields correctly.");
      return;
    }

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.textContent = "";
    submitBtn.disabled = true;

    // Simulate form submission (replace with your actual submission logic)
    this.submitForm(formData)
      .then(() => {
        this.showSuccess();
      })
      .catch(() => {
        this.showError("Something went wrong. Please try again.");
      })
      .finally(() => {
        submitBtn.classList.remove("loading");
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
      });
  }

  async submitForm(formData) {
    // Replace this with your actual form submission logic
    // Example: sending to your server endpoint

    /*
        try {
            const response = await fetch('/submit-consultation', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
        */

    // Simulate API call for demo purposes
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure (90% success rate)
        if (Math.random() > 0.1) {
          console.log(
            "Form submitted successfully:",
            Object.fromEntries(formData)
          );
          resolve({ success: true });
        } else {
          reject(new Error("Simulated server error"));
        }
      }, 2000);
    });
  }

  showSuccess() {
    const formContainer = this.popup.querySelector(".popup-consultation-form");
    formContainer.innerHTML = `
            <div class="popup-success-message">
                <h3>✅ Consultation Booked Successfully!</h3>
                <p>Thank you for your interest. Our dermatology expert will contact you within 24 hours.</p>
                <br>
                <button onclick="consultationPopup.closePopup()" class="popup-submit-btn">Close</button>
            </div>
        `;
  }

  showError(message) {
    // Create or update error message
    let errorMsg = this.form.querySelector(".error-message");
    if (!errorMsg) {
      errorMsg = document.createElement("div");
      errorMsg.className = "error-message";
      errorMsg.style.cssText = `
                background: #ffebee;
                color: #c62828;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 15px;
                font-size: 14px;
                text-align: center;
                border: 1px solid #ffcdd2;
            `;
      this.form.insertBefore(errorMsg, this.form.firstChild);
    }

    errorMsg.textContent = message;

    // Remove error message after 5 seconds
    setTimeout(() => {
      if (errorMsg && errorMsg.parentNode) {
        errorMsg.parentNode.removeChild(errorMsg);
      }
    }, 5000);
  }

  // Public method to manually show popup (useful for testing or button triggers)
  manualShow() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }
    this.showPopup();
  }

  // Public method to reset timer
  resetTimer() {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }
    this.startTimer();
  }
}

// Global function for closing popup (used in HTML)
function closePopup() {
  if (window.consultationPopup) {
    window.consultationPopup.closePopup();
  }
}

// Initialize popup when script loads
window.consultationPopup = new ConsultationPopup();

// Optional: Expose some methods globally for manual control
window.showConsultationPopup = () => {
  if (window.consultationPopup) {
    window.consultationPopup.manualShow();
  }
};

window.resetConsultationTimer = () => {
  if (window.consultationPopup) {
    window.consultationPopup.resetTimer();
  }
};
