// ===== PORTFOLIO INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

function initializePortfolio() {
  setupLoading();
  setupNavigation();
  setupTheme();
  setupAnimations();
  setupSkills();
  setupProjects();
  setupContact();
  setupScrollEffects();
  setupVisitorTracking();
  setupPerformanceOptimizations();
}

// ===== LOADING SCREEN =====
function setupLoading() {
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.querySelector(".loader-progress");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.opacity = "0";
          setTimeout(() => {
            loadingScreen.style.display = "none";
          }, 500);
        }
      }, 500);
    }
  }, 100);
}

// ===== NAVIGATION =====
function setupNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const navbar = document.querySelector(".navbar");

  // Debug: Check if elements exist
  console.log('Hamburger:', hamburger);
  console.log('Nav Menu:', navMenu);

  // Mobile menu toggle with direct event handling
  if (hamburger) {
    hamburger.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Hamburger clicked!');
      
      hamburger.classList.toggle("active");
      if (navMenu) {
        navMenu.classList.toggle("active");
        console.log('Menu toggled, active:', navMenu.classList.contains('active'));
      }
      
      // Prevent body scroll when menu is open
      if (navMenu && navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger) hamburger.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== THEME SYSTEM =====
function setupTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply saved theme immediately
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Add click event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // Add transition class for smooth theme change
      document.documentElement.style.transition = "all 0.3s ease";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
      
      // Remove transition after animation completes
      setTimeout(() => {
        document.documentElement.style.transition = "";
      }, 300);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector("#theme-toggle i");
  
  if (themeIcon && themeToggle) {
    // Add rotation animation
    themeToggle.style.transform = "rotate(180deg)";
    
    setTimeout(() => {
      themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
      themeToggle.style.transform = "rotate(0deg)";
    }, 150);
  }
}

// ===== SCROLL EFFECTS =====
function setupScrollEffects() {
  // Progress bar
  const progressBar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  // Back to top button
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = "back-to-top";
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-1);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  `;

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== ANIMATIONS =====
function setupAnimations() {
  animateCounters();
  setupScrollAnimations();
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-category, .testimonial-card, .blog-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
}

// ===== SKILLS SECTION =====
function setupSkills() {
  const skillsSection = document.getElementById("skills");
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateSkillBars();
          hasAnimated = true;
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    }, index * 150);
  });
}

// ===== PROJECTS SYSTEM =====
function setupProjects() {
  setupProjectFilters();
  setupProjectModals();
  setupFutureProjects();
}

function setupProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active filter
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.5s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function setupFutureProjects() {
  const futureCards = document.querySelectorAll(".project-card.future");

  futureCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      showNotification(
        `${title} is coming soon! Stay tuned for updates.`,
        "info"
      );
    });

    // Add hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

function setupProjectModals() {
  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("project-modal");
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function openProjectModal(projectId) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");

  const projects = {
    "todo-golang": {
      title: "Todo App with Golang",
      description:
        "RESTful API backend for todo management built with Golang, featuring CRUD operations and clean architecture",
      tech: ["Golang", "REST API", "JSON"],
      features: [
        "CRUD Operations",
        "Clean Architecture",
        "API Endpoints",
        "Task Management",
      ],
      github: "https://github.com/yodnabin-1995/todo-golang",
      demo: "screenshots/todo-golang.png",
    },
    "amazon-clone": {
      title: "Amazon Clone",
      description:
        "E-commerce website clone with shopping cart functionality, product listings, and responsive design",
      tech: ["JavaScript", "HTML5", "CSS3"],
      features: [
        "Product Listings",
        "Shopping Cart",
        "Responsive Design",
        "User Interface",
      ],
      github: "https://github.com/yodnabin-1995/amazon-clone",
      demo: "screenshots/amazon-clone.png",
    },
    "grade-calculator": {
      title: "Student Grade Calculator",
      description:
        "Interactive React web application for GPA calculation with data visualization and progress tracking",
      tech: ["React", "CSS3", "JavaScript"],
      features: [
        "GPA Calculation",
        "Data Visualization",
        "Progress Tracking",
        "Interactive UI",
      ],
      github: "https://github.com/yodnabin-1995/grade-calculator",
      demo: "screenshots/grade-calculator.png",
    },
    "chat-app": {
      title: "Real-Time Chat Application",
      description:
        "Modern messaging platform with file sharing, group chats, real-time messaging using Socket.io and Node.js",
      tech: ["React", "Socket.io", "Node.js"],
      features: [
        "Real-time Messaging",
        "Group Chats",
        "File Sharing",
        "User Authentication",
      ],
      github: "https://github.com/yodnabin-1995/chat-app",
      demo: "screenshots/chat-app.png",
    },
    "cloud-storage": {
      title: "Cloud File Storage System",
      description:
        "Secure cloud storage solution with file synchronization, sharing capabilities, version control, and real-time collaboration",
      tech: ["Golang", "AWS S3", "React"],
      features: [
        "File Upload & Download",
        "Real-time Synchronization",
        "File Sharing & Permissions",
        "Version Control",
        "Secure Authentication",
        "Cloud Storage Integration",
      ],
      github: "https://github.com/yodnabin-1995/cloud-storage",
      demo: "screenshots/cloud_storage.png",
    },
    "ecommerce-platform": {
      title: "E-Commerce Platform",
      description:
        "Full-stack online marketplace with payment integration, inventory management, and real-time notifications",
      tech: ["React", "Node.js", "MongoDB"],
      features: [
        "Payment Integration",
        "Inventory Management",
        "Real-time Notifications",
        "User Authentication",
        "Product Management",
        "Order Processing",
      ],
      github: "https://github.com/yodnabin-1995/ecommerce-platform",
      demo: "screenshots/ecommerce-platform.png",
    },
  };

  const project = projects[projectId];
  if (project) {
    modalBody.innerHTML = `
      <div class="modal-header">
        <h2>${project.title}</h2>
        <div class="project-links-modal">
          ${
            project.github
              ? `<a href="${project.github}" class="btn-primary" target="_blank"><i class="fab fa-github"></i> View Code</a>`
              : ""
          }
          ${
            project.demo
              ? `<button onclick="openScreenshotModal('${project.demo}', '${project.title}')" class="btn-secondary"><i class="fas fa-image"></i> View Screenshot</button>`
              : ""
          }
        </div>
      </div>
      <div class="modal-content-body">
        <p class="project-description">${project.description}</p>
        
        <div class="tech-section">
          <h3><i class="fas fa-code"></i> Technologies Used</h3>
          <div class="tech-tags">
            ${project.tech
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
        
        <div class="features-section">
          <h3><i class="fas fa-star"></i> Key Features</h3>
          <ul class="features-list">
            ${project.features
              .map(
                (feature) => `<li><i class="fas fa-check"></i> ${feature}</li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Add modal animation
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.animation = "modalSlideIn 0.3s ease-out";
  }
}

function closeModal() {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

function openScreenshotModal(imagePath, projectTitle) {
  const modal = document.createElement('div');
  modal.className = 'modal screenshot-modal';
  modal.innerHTML = `
    <div class="modal-content screenshot-content">
      <button class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</button>
      <h3>${projectTitle} - Screenshot</h3>
      <img src="${imagePath}" alt="${projectTitle} Screenshot" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: var(--shadow-lg);">
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  });
}

function openScreenshotModal(imagePath, projectTitle) {
  const modal = document.createElement('div');
  modal.className = 'modal screenshot-modal';
  modal.innerHTML = `
    <div class="modal-content screenshot-content">
      <button class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</button>
      <h3>${projectTitle} - Screenshot</h3>
      <img src="${imagePath}" alt="${projectTitle} Screenshot" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: var(--shadow-lg);">
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== CONTACT SYSTEM =====
function setupContact() {
  const contactForm = document.querySelector(".contact-form");

  contactForm?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Form validation
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (!validateForm(name, email, message)) {
      return;
    }

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Send email using EmailJS
      await emailjs.send("service_p153q0q", "template_t0rjprb", {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Biniam Birhanu",
        reply_to: email,
      });

      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      this.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      showNotification(
        "Failed to send message. Please try again or contact me directly.",
        "error"
      );
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateForm(name, email, message) {
  if (!name) {
    showNotification("Please enter your name", "error");
    return false;
  }

  if (!email || !isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  if (!message || message.length < 10) {
    showNotification(
      "Please enter a message (at least 10 characters)",
      "error"
    );
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${
        type === "success"
          ? "fa-check-circle"
          : type === "error"
          ? "fa-exclamation-circle"
          : "fa-info-circle"
      }"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"
    };
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== BLOG FUNCTIONALITY =====
// Blog and testimonial functions removed as sections were deleted

// ===== VISITOR TRACKING =====
function setupVisitorTracking() {
  // Simple visitor counter (localStorage based)
  let visitorCount = localStorage.getItem("visitorCount") || 0;
  let pageViews = sessionStorage.getItem("pageViews") || 0;

  // Increment counters
  if (!sessionStorage.getItem("visited")) {
    visitorCount++;
    localStorage.setItem("visitorCount", visitorCount);
    sessionStorage.setItem("visited", "true");
  }

  pageViews++;
  sessionStorage.setItem("pageViews", pageViews);

  // Update display
  const visitorCountEl = document.getElementById("visitor-count");
  const pageViewsEl = document.getElementById("page-views");

  if (visitorCountEl) visitorCountEl.textContent = visitorCount;
  if (pageViewsEl) pageViewsEl.textContent = pageViews;
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function setupPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Preload critical resources
  const criticalResources = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = "style";
    document.head.appendChild(link);
  });
}

// ===== RESUME DOWNLOAD =====
function downloadResume() {
  showNotification("Generating resume...", "info");

  // Create a more comprehensive resume
  const resumeData = {
    name: "BINIAM BIRHANU",
    title: "Software Engineering Student",
    contact: {
      email: "hubbenjamin6@gmail.com",
      linkedin: "linkedin.com/in/biniam-birihanu-95ba9b38b/",
      github: "github.com/yodnabin-1995",
    },
    education: {
      degree: "Bachelor of Software Engineering",
      university: "Debre Markos University",
      period: "2023 - Present",
    },
    skills: {
      frontend: ["HTML5", "CSS3", "JavaScript", "React"],
      backend: ["Java", "Node.js", "Python", "Golang"],
      databases: ["MySQL", "MongoDB"],
      tools: ["Git", "REST APIs", "Docker"],
    },
    projects: [
      {
        name: "Todo App with Golang",
        description: "RESTful API with CRUD operations and clean architecture",
        tech: ["Golang", "REST API", "JSON"],
      },
      {
        name: "Amazon Clone",
        description:
          "E-commerce website with shopping cart and responsive design",
        tech: ["JavaScript", "HTML5", "CSS3"],
      },
      {
        name: "Grade Calculator",
        description:
          "React application for GPA calculation with data visualization",
        tech: ["React", "JavaScript", "CSS3"],
      },
      {
        name: "Real-Time Chat App",
        description: "Modern messaging platform with real-time communication",
        tech: ["React", "Socket.io", "Node.js"],
      },
    ],
  };

  // Generate PDF-like content
  generateResumeHTML(resumeData);
}

function generateResumeHTML(data) {
  const resumeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${data.name} - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; margin: -40px -40px 30px -40px; }
        .name { font-size: 2.5em; margin: 0; }
        .title { font-size: 1.2em; margin: 10px 0 0 0; }
        .section { margin: 30px 0; }
        .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
        .contact-info { display: flex; justify-content: space-around; margin: 20px 0; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .project { margin: 15px 0; padding: 15px; border-left: 4px solid #667eea; background: #f8f9fa; }
        .tech-tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
        .tech-tag { background: #667eea; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8em; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="name">${data.name}</h1>
        <p class="title">${data.title}</p>
      </div>
      
      <div class="section">
        <h2>Contact Information</h2>
        <div class="contact-info">
          <div>📧 ${data.contact.email}</div>
          <div>🔗 ${data.contact.linkedin}</div>
          <div>💻 ${data.contact.github}</div>
        </div>
      </div>
      
      <div class="section">
        <h2>Education</h2>
        <p><strong>${data.education.degree}</strong><br>
        ${data.education.university} (${data.education.period})</p>
      </div>
      
      <div class="section">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <div><strong>Frontend:</strong> ${data.skills.frontend.join(
            ", "
          )}</div>
          <div><strong>Backend:</strong> ${data.skills.backend.join(", ")}</div>
          <div><strong>Databases:</strong> ${data.skills.databases.join(
            ", "
          )}</div>
          <div><strong>Tools:</strong> ${data.skills.tools.join(", ")}</div>
        </div>
      </div>
      
      <div class="section">
        <h2>Projects</h2>
        ${data.projects
          .map(
            (project) => `
          <div class="project">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
              ${project.tech
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </body>
    </html>
  `;

  // Create and download the resume
  const blob = new Blob([resumeHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Biniam_Birhanu_Resume.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showNotification("Resume downloaded successfully!", "success");
}

// ===== UTILITY FUNCTIONS =====
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  const themeIcon = document.querySelector("#theme-toggle i");
  if (themeIcon) {
    themeIcon.className = newTheme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
}

function toggleMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  if (hamburger && navMenu) {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
}

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

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== CSS ANIMATIONS =====
const additionalCSS = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
  }
  
  .project-links-modal {
    display: flex;
    gap: 1rem;
  }
  
  .tech-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  
  .tech-tag {
    background: var(--gradient-1);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  .features-list {
    list-style: none;
    padding: 0;
  }
  
  .features-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: var(--surface-color);
    border-radius: 8px;
  }
  
  .features-list i {
    color: var(--primary-color);
  }
  
  .screenshot-content {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 15px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    text-align: center;
  }
  
  .screenshot-content h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  .screenshot-content img {
    border: 2px solid var(--border-color);
    transition: transform 0.3s ease;
  }
  
  .screenshot-content img:hover {
    transform: scale(1.02);
  }
`;

// Add additional CSS to document
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
// ===== RESUME IMAGE GENERATOR =====
function downloadResumeImage() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = 1200;
  canvas.height = 1600;
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Header section
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(50, 50, canvas.width - 100, 200);
  
  // Name
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('BINIAM BIRHANU', canvas.width / 2, 130);
  
  // Title
  ctx.fillStyle = '#6366f1';
  ctx.font = '24px Arial';
  ctx.fillText('Software Engineering Student & Full-Stack Developer', canvas.width / 2, 170);
  
  // Contact info
  ctx.fillStyle = '#374151';
  ctx.font = '18px Arial';
  ctx.fillText('📧 hubbenjamin6@gmail.com | 🔗 linkedin.com/in/biniam-birihanu-95ba9b38b', canvas.width / 2, 210);
  
  // Skills section
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(50, 300, canvas.width - 100, 300);
  
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('TECHNICAL SKILLS', 80, 340);
  
  const skills = [
    'Frontend: HTML5, CSS3, JavaScript, React',
    'Backend: Java, Node.js, Python, Golang',
    'Database: MySQL, MongoDB',
    'Tools: Git, VS Code, IntelliJ IDEA, GitHub'
  ];
  
  ctx.fillStyle = '#374151';
  ctx.font = '20px Arial';
  skills.forEach((skill, index) => {
    ctx.fillText(skill, 80, 380 + (index * 40));
  });
  
  // Projects section
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(50, 650, canvas.width - 100, 400);
  
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('KEY PROJECTS', 80, 690);
  
  const projects = [
    'Todo App with Golang - RESTful API with CRUD operations',
    'Amazon Clone - E-commerce website with shopping cart',
    'Real-Time Chat App - Socket.io messaging platform',
    'Student Grade Calculator - React web application',
    'E-Commerce Platform - Full-stack marketplace',
    'Cloud File Storage System - Secure cloud storage with sync'
  ];
  
  ctx.fillStyle = '#374151';
  ctx.font = '18px Arial';
  projects.forEach((project, index) => {
    ctx.fillText('• ' + project, 80, 730 + (index * 35));
  });
  
  // Education section
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(50, 1100, canvas.width - 100, 150);
  
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('EDUCATION', 80, 1140);
  
  ctx.fillStyle = '#374151';
  ctx.font = '20px Arial';
  ctx.fillText('Bachelor of Software Engineering', 80, 1180);
  ctx.fillText('Debre Markos University | 2023 - Present', 80, 1210);
  
  // Footer
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
  
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Generated from Portfolio Website | github.com/yodnabin-1995', canvas.width / 2, canvas.height - 50);
  
  // Download
  const link = document.createElement('a');
  link.download = 'Biniam_Birhanu_Resume.png';
  link.href = canvas.toDataURL();
  link.click();
  
  showNotification('Resume image downloaded successfully!', 'success');
}

// ===== ENHANCED FEATURES =====

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'k':
        e.preventDefault();
        document.querySelector('#theme-toggle').click();
        break;
      case 'h':
        e.preventDefault();
        document.querySelector('a[href="#home"]').click();
        break;
    }
  }
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Enhanced scroll effects with parallax
function setupParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Auto-save form data
function setupFormAutoSave() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Load saved data
    const savedValue = localStorage.getItem(`form_${input.name}`);
    if (savedValue) input.value = savedValue;
    
    // Save on input
    input.addEventListener('input', () => {
      localStorage.setItem(`form_${input.name}`, input.value);
    });
  });
  
  // Clear saved data on successful submit
  form.addEventListener('submit', () => {
    inputs.forEach(input => {
      localStorage.removeItem(`form_${input.name}`);
    });
  });
}

// Print-friendly styles
function addPrintStyles() {
  const printStyles = `
    @media print {
      .navbar, .hamburger, .theme-toggle, .scroll-progress,
      .loading-screen, .modal, .back-to-top { display: none !important; }
      
      body { font-size: 12pt; line-height: 1.4; }
      .hero { min-height: auto; padding: 2rem 0; }
      .section { page-break-inside: avoid; }
      .project-card, .skill-category { break-inside: avoid; }
      
      a[href]:after { content: " (" attr(href) ")"; }
      .cta-btn { border: 1px solid #000; }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = printStyles;
  document.head.appendChild(style);
}

// Enhanced analytics
function setupAdvancedAnalytics() {
  // Track time spent on page
  let startTime = Date.now();
  let timeSpent = 0;
  
  window.addEventListener('beforeunload', () => {
    timeSpent = Date.now() - startTime;
    localStorage.setItem('timeSpent', timeSpent);
  });
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    maxScroll = Math.max(maxScroll, scrollPercent);
    localStorage.setItem('maxScroll', maxScroll);
  });
  
  // Track clicks on projects
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      const clicks = JSON.parse(localStorage.getItem('projectClicks') || '{}');
      clicks[index] = (clicks[index] || 0) + 1;
      localStorage.setItem('projectClicks', JSON.stringify(clicks));
    });
  });
}

// Copy to clipboard functionality
function addCopyToClipboard() {
  const email = document.querySelector('.contact-value');
  if (email && email.textContent.includes('@')) {
    email.style.cursor = 'pointer';
    email.title = 'Click to copy email';
    
    email.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email.textContent);
        showNotification('Email copied to clipboard!', 'success');
      } catch (err) {
        showNotification('Failed to copy email', 'error');
      }
    });
  }
}

// Initialize all enhanced features
function initializeEnhancedFeatures() {
  setupParallaxEffects();
  setupFormAutoSave();
  addPrintStyles();
  setupAdvancedAnalytics();
  addCopyToClipboard();
}

// Add to main initialization
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
  initializeEnhancedFeatures();
});