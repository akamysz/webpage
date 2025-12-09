/**
 * Main JavaScript File
 * Personal Portfolio Website
 *
 * Features:
 * - Smooth scroll navigation
 * - Navbar scroll effects
 * - Scroll animations
 * - Form validation and submission
 * - Back to top button
 * - Dynamic active navigation
 * - Quote fetching from API
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavbar();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initActiveNavigation();
  fetchInspirationalQuote();
});

/**
 * Navbar scroll effect
 * Adds 'scrolled' class when user scrolls down
 */
function initNavbar() {
  const navbar = document.getElementById("mainNav");
  const scrollThreshold = 100;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // Initial check
  handleScroll();

  // Add scroll listener with throttling for performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

/**
 * Scroll animations using Intersection Observer
 * Animates elements with 'animate-on-scroll' class when they enter viewport
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for multiple elements
        setTimeout(() => {
          entry.target.classList.add("animated");
        }, index * 100);

        // Stop observing once animated
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });
}

/**
 * Contact form validation and submission
 * Includes real-time validation and simulated form submission
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn?.querySelector(".btn-text");
  const btnLoading = submitBtn?.querySelector(".btn-loading");
  const formSuccess = document.getElementById("formSuccess");
  const sendAnother = document.getElementById("sendAnother");

  if (!form) return;

  // Real-time validation on input
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        validateField(input);
      }
    });
  });

  // Form submission handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      // Simulate API call (replace with actual API endpoint)
      await simulateFormSubmission(new FormData(form));

      // Show success message
      form.classList.add("d-none");
      formSuccess.classList.remove("d-none");

      // Reset form
      form.reset();
      inputs.forEach((input) => {
        input.classList.remove("is-valid", "is-invalid");
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setLoadingState(false);
    }
  });

  // Send another message button
  if (sendAnother) {
    sendAnother.addEventListener("click", () => {
      formSuccess.classList.add("d-none");
      form.classList.remove("d-none");
    });
  }

  // Helper function to set loading state
  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.classList.add("d-none");
      btnLoading.classList.remove("d-none");
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove("d-none");
      btnLoading.classList.add("d-none");
    }
  }
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Remove previous validation classes
  field.classList.remove("is-valid", "is-invalid");

  // Check required
  if (field.required && !value) {
    isValid = false;
  }

  // Check minlength
  if (field.minLength > 0 && value.length < field.minLength) {
    isValid = false;
  }

  // Check email format
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
    }
  }

  // Add appropriate class
  if (value) {
    field.classList.add(isValid ? "is-valid" : "is-invalid");
  }

  return isValid;
}

/**
 * Simulate form submission with delay
 * Replace this with actual API call in production
 * @param {FormData} formData - The form data to submit
 * @returns {Promise} - Resolves after simulated delay
 */
function simulateFormSubmission(formData) {
  return new Promise((resolve) => {
    // Log form data for debugging
    console.log("Form submission data:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Simulate network delay
    setTimeout(resolve, 1500);
  });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  const showThreshold = 400;

  // Show/hide button based on scroll position
  const toggleButton = () => {
    if (window.scrollY > showThreshold) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  // Initial check
  toggleButton();

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toggleButton();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // Skip if it's just '#'
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed navbar
        const navbarHeight =
          document.getElementById("mainNav")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Dynamic active navigation state
 * Updates nav links based on scroll position
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/**
 * Fetch inspirational quote from API
 * Demonstrates API integration
 */
async function fetchInspirationalQuote() {
  const downloadResumeBtn = document.getElementById("downloadResume");

  if (!downloadResumeBtn) return;

  // Add click handler with API call
  downloadResumeBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      // Fetch a random programming quote
      const response = await fetch("https://api.github.com/zen");

      if (response.ok) {
        const quote = await response.text();

        // Show quote in an alert (could be a modal in production)
        showNotification(`GitHub Zen: "${quote}"`, "info");

        // In a real application, this would trigger a file download
        console.log("Resume download triggered");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      showNotification("Resume download starting...", "success");
    }
  });
}

/**
 * Show a notification toast
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="bi ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    padding: "16px 24px",
    backgroundColor: getNotificationColor(type),
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    zIndex: "9999",
    opacity: "0",
    transform: "translateX(100%)",
    transition: "all 0.3s ease",
    maxWidth: "350px",
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  });

  // Remove after delay
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

/**
 * Get icon class for notification type
 * @param {string} type - The notification type
 * @returns {string} - The Bootstrap icon class
 */
function getNotificationIcon(type) {
  const icons = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    info: "bi-info-circle-fill",
    warning: "bi-exclamation-triangle-fill",
  };
  return icons[type] || icons.info;
}

/**
 * Get background color for notification type
 * @param {string} type - The notification type
 * @returns {string} - The color value
 */
function getNotificationColor(type) {
  const colors = {
    success: "#198754",
    error: "#dc3545",
    info: "#1a1a2e",
    warning: "#ffc107",
  };
  return colors[type] || colors.info;
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility function to throttle function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Log that JavaScript is loaded
console.log("Portfolio website initialized successfully!");
