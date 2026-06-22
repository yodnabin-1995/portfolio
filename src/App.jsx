import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "timeline", label: "Journey" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", value: 90 },
      { name: "CSS3", value: 85 },
      { name: "JavaScript", value: 80 },
      { name: "React", value: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "NestJS", value: 85 },
      { name: "Node.js", value: 70 },
      { name: "Python", value: 70 },
      { name: "Golang", value: 65 },
    ],
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "PostgreSQL", value: 80 },
      { name: "MongoDB", value: 75 },
      { name: "Git", value: 90 },
      { name: "REST APIs", value: 85 },
    ],
  },
];

const focusAreas = [
  {
    icon: "fas fa-laptop-code",
    title: "Frontend Development",
    description:
      "Building clean, responsive interfaces with React, HTML, CSS, and JavaScript.",
  },
  {
    icon: "fas fa-server",
    title: "Backend Development",
    description:
      "Developing backend services and APIs with NestJS, Node.js, Python, and Golang.",
  },
  {
    icon: "fas fa-database",
    title: "Database Work",
    description:
      "Working with PostgreSQL and MongoDB for reliable data storage and application support.",
  },
];

const highlights = [
  "Software Engineering student at Debre Markos University",
  "Interested in internships, collaboration, and practical full-stack work",
  "Focused on clean UI, maintainable code, and useful digital products",
];

const journey = [
  {
    year: "2023",
    title: "Started Software Engineering",
    description:
      "Began my Software Engineering studies at Debre Markos University.",
  },
  {
    year: "2023",
    title: "Built My First Program",
    description:
      "Created an early programming project and strengthened my software development basics.",
  },
  {
    year: "2024",
    title: "Entered Web Development",
    description:
      "Learned HTML, CSS, and JavaScript and started building web interfaces.",
  },
  {
    year: "2024",
    title: "Expanded to Full Stack",
    description:
      "Worked with React, NestJS, and PostgreSQL-based solutions to build broader applications.",
  },
  {
    year: "2025",
    title: "Advanced Academic Focus",
    description:
      "Continuing as a 4th year student while improving portfolio quality and practical skills.",
  },
];

const statTargets = [
  { label: "Projects Completed", value: 6 },
  { label: "Technologies Learned", value: 12 },
  { label: "Years of Study", value: 4 },
  { label: "Academic Performance", value: 80, suffix: "%" },
];

const contactLinks = [
  {
    icon: "fas fa-envelope",
    label: "awsc0620@gmail.com",
    href: "mailto:awsc0620@gmail.com",
  },
  {
    icon: "fab fa-github",
    label: "github.com/yodnabin-1995",
    href: "https://github.com/yodnabin-1995",
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/biniam-birihanu-95ba9b38b/",
  },
];

const notificationStyles = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const notificationIcons = {
  success: "fas fa-check-circle",
  error: "fas fa-circle-exclamation",
  info: "fas fa-circle-info",
};

const shell = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const sectionSpace = "py-14 sm:py-20 lg:py-24";
const card =
  "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";
const secondaryCard =
  "rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950";
const primaryButton =
  "inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white";
const secondaryButton =
  "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [stats, setStats] = useState(statTargets.map(() => 0));
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    emailjs.init("ckeNV1U1JhCDS4_Yp");
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setActiveSection(entry.target.id);
          if (entry.target.id === "skills") {
            setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(null), 4500);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  useEffect(() => {
    let frameId;
    const start = performance.now();
    const duration = 1200;

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setStats(statTargets.map((item) => Math.floor(item.value * progress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setStats(statTargets.map((item) => item.value));
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setNotification({ type: "error", message: "Please enter your name." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (form.message.trim().length < 10) {
      setNotification({
        type: "error",
        message: "Please enter a message of at least 10 characters.",
      });
      return;
    }

    setSending(true);

    try {
      await emailjs.send("service_p153q0q", "template_t0rjprb", {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: form.message.trim(),
        to_name: "Biniam Birhanu",
        reply_to: form.email.trim(),
      });

      setForm({ name: "", email: "", message: "" });
      setNotification({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setSending(false);
    }
  };

  const downloadResume = () => {
    const skillMarkup = skillGroups
      .map(
        (group) => `
          <div class="skill-block">
            <h3>${group.title}</h3>
            <p>${group.skills.map((skill) => skill.name).join(", ")}</p>
          </div>
        `,
      )
      .join("");

    const strengthsMarkup = focusAreas
      .map(
        (item) => `
          <li>
            <strong>${item.title}:</strong> ${item.description}
          </li>
        `,
      )
      .join("");

    const journeyMarkup = journey
      .map(
        (item) => `
          <div class="timeline-item">
            <div class="timeline-year">${item.year}</div>
            <div>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
          </div>
        `,
      )
      .join("");

    const linksMarkup = contactLinks
      .map(
        (item) => `
          <li><a href="${item.href}">${item.label}</a></li>
        `,
      )
      .join("");

    const resumeHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Biniam Birhanu Resume</title>
          <style>
            * { box-sizing: border-box; }
            body {
              font-family: Arial, Helvetica, sans-serif;
              margin: 0;
              background: #f8fafc;
              color: #0f172a;
              line-height: 1.6;
            }
            .page {
              max-width: 960px;
              margin: 32px auto;
              background: #ffffff;
              border: 1px solid #e2e8f0;
              padding: 40px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              gap: 24px;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 24px;
              margin-bottom: 32px;
            }
            .header h1 {
              margin: 0;
              font-size: 34px;
            }
            .header h2 {
              margin: 8px 0 0;
              font-size: 18px;
              color: #475569;
              font-weight: 600;
            }
            .contact {
              text-align: right;
              font-size: 14px;
            }
            .contact div + div { margin-top: 6px; }
            .section { margin-top: 28px; }
            .section h3 {
              margin: 0 0 12px;
              font-size: 17px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #334155;
            }
            .summary,
            .education,
            .project-note {
              color: #334155;
            }
            .skills-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 16px;
            }
            .skill-block {
              border: 1px solid #e2e8f0;
              padding: 14px 16px;
              background: #f8fafc;
            }
            .skill-block h3 {
              margin: 0 0 6px;
              font-size: 15px;
              color: #0f172a;
              letter-spacing: 0;
              text-transform: none;
            }
            .skill-block p {
              margin: 0;
              color: #475569;
            }
            ul {
              margin: 0;
              padding-left: 20px;
            }
            li + li { margin-top: 8px; }
            .timeline-item {
              display: grid;
              grid-template-columns: 90px 1fr;
              gap: 16px;
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .timeline-item:last-child { border-bottom: 0; }
            .timeline-year {
              font-weight: 700;
              color: #0f172a;
            }
            .timeline-item h4 {
              margin: 0 0 4px;
              font-size: 16px;
            }
            .timeline-item p {
              margin: 0;
              color: #475569;
            }
            a {
              color: #0f172a;
              text-decoration: none;
            }
            @media print {
              body { background: #ffffff; }
              .page {
                margin: 0;
                border: 0;
                max-width: none;
                padding: 0;
              }
            }
            @media (max-width: 700px) {
              .page { padding: 24px; }
              .header {
                display: block;
              }
              .contact {
                text-align: left;
                margin-top: 16px;
              }
              .skills-grid {
                grid-template-columns: 1fr;
              }
              .timeline-item {
                grid-template-columns: 1fr;
                gap: 6px;
              }
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <div>
                <h1>Biniam Birhanu</h1>
                <h2>Software Engineering Student | Junior Full-Stack Developer</h2>
              </div>
              <div class="contact">
                <div>awsc0620@gmail.com</div>
                <div>github.com/yodnabin-1995</div>
                <div>linkedin.com/in/biniam-birihanu-95ba9b38b/</div>
              </div>
            </div>

            <section class="section">
              <h3>Professional Summary</h3>
              <p class="summary">
                Software Engineering student with a growing full-stack development background,
                focused on building clean user interfaces, practical backend services, and
                reliable database-supported applications. Comfortable working with React,
                NestJS, Node.js, PostgreSQL, MongoDB, and REST APIs, with a strong interest
                in continuous learning, collaboration, and real-world product development.
              </p>
            </section>

            <section class="section">
              <h3>Technical Skills</h3>
              <div class="skills-grid">
                ${skillMarkup}
              </div>
            </section>

            <section class="section">
              <h3>Core Strengths</h3>
              <ul>
                ${strengthsMarkup}
                <li><strong>Problem Solving:</strong> Strong interest in practical solutions, maintainable code, and steady skill improvement.</li>
                <li><strong>Collaboration:</strong> Open to internships, teamwork, and opportunities that strengthen real product experience.</li>
              </ul>
            </section>

            <section class="section">
              <h3>Education</h3>
              <p class="education">
                <strong>Bachelor of Software Engineering</strong><br />
                Debre Markos University<br />
                Currently a 4th year student
              </p>
            </section>

            <section class="section">
              <h3>Development Journey</h3>
              ${journeyMarkup}
            </section>

            <section class="section">
              <h3>Selected Highlights</h3>
              <p class="project-note">
                Built academic and portfolio-based projects while improving frontend,
                backend, and database integration skills. Experience includes responsive
                interface development, API-oriented backend work, and database usage with
                PostgreSQL and MongoDB.
              </p>
            </section>

            <section class="section">
              <h3>Links</h3>
              <ul>
                ${linksMarkup}
              </ul>
            </section>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([resumeHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Biniam_Birhanu_Resume.html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setNotification({
      type: "success",
      message: "Resume downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {notification ? (
        <div
          className={`fixed left-4 right-4 top-4 z-[2000] overflow-hidden rounded-2xl text-white shadow-xl sm:left-auto sm:right-4 sm:min-w-[280px] sm:max-w-[420px] ${
            notificationStyles[notification.type] || notificationStyles.info
          }`}
        >
          <div className="flex items-center gap-3 p-4">
            <i
              className={
                notificationIcons[notification.type] || notificationIcons.info
              }
            />
            <span>{notification.message}</span>
            <button
              className="ml-auto bg-transparent text-white"
              aria-label="Close notification"
              onClick={() => setNotification(null)}
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      ) : null}

      <header>
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
          <div
            className={`${shell} flex min-h-[76px] items-center justify-between gap-4`}
          >
            <a
              href="#home"
              className="inline-flex items-center gap-3 font-bold"
              onClick={() => setMenuOpen(false)}
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950">
                B
              </span>
              <span className="hidden text-base sm:inline">Biniam Birhanu</span>
            </a>

            <div className="flex items-center gap-3">
              <button
                className="h-11 w-11 rounded-xl border border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                aria-label="Toggle theme"
                onClick={handleThemeToggle}
              >
                <i
                  className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}
                />
              </button>

              <button
                className="flex h-11 w-11 flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 text-slate-900 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                aria-controls="nav-menu"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <span className="block h-0.5 w-full rounded-full bg-current" />
                <span className="block h-0.5 w-full rounded-full bg-current" />
                <span className="block h-0.5 w-full rounded-full bg-current" />
              </button>

              <ul
                id="nav-menu"
                className={`${
                  menuOpen ? "flex" : "hidden"
                } absolute left-4 right-4 top-full mt-3 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg md:static md:mt-0 md:flex md:flex-row md:items-center md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none dark:border-slate-800 dark:bg-slate-900 md:dark:bg-transparent`}
              >
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        activeSection === item.id
                          ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className={sectionSpace}>
          <div
            className={`${shell} grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Software Engineering Student
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-6xl">
                Junior Full-Stack Developer building clean and practical digital
                experiences.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
                I’m Biniam Birhanu, focused on responsive frontend development,
                backend services, and database-backed applications with a steady
                interest in learning, collaboration, and professional growth.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a href="#contact" className={`${primaryButton} w-full sm:w-auto`}>
                  Contact Me
                </a>
                <button className={`${secondaryButton} w-full sm:w-auto`} onClick={downloadResume}>
                  Download Resume
                </button>
              </div>

              <div className={`${secondaryCard} mt-8 p-4 sm:p-5`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Core Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "React",
                    "NestJS",
                    "Node.js",
                    "PostgreSQL",
                    "MongoDB",
                    "REST APIs",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${card} overflow-hidden`}>
              <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Profile Overview
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <img
                  src="/images/logo.jpg"
                  alt="Biniam Birhanu"
                  className="aspect-[1/1.02] max-h-64 w-full rounded-xl object-cover object-top sm:max-h-80 md:max-h-none"
                />
                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
                  <h2 className="text-2xl font-semibold">Biniam Birhanu</h2>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    Junior Full-Stack Developer
                  </p>

                  <div className="mt-5 space-y-3">
                    {contactLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-3 text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                      >
                        <i className={`${item.icon} w-4`} />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-3">
                    <div className={`${secondaryCard} p-4`}>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Status
                      </p>
                      <p className="mt-1 font-semibold">
                        Open to opportunities
                      </p>
                    </div>
                    <div className={`${secondaryCard} p-4`}>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Focus
                      </p>
                      <p className="mt-1 font-semibold">Frontend & backend</p>
                    </div>
                    <div className={`${secondaryCard} p-4`}>
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Education
                      </p>
                      <p className="mt-1 font-semibold">4th year student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 ${sectionSpace}`}
        >
          <div className={shell}>
            <SectionHeading
              eyebrow="About"
              title="A more focused overview of my background and direction."
              description="I am building a strong foundation in full-stack development with an emphasis on practical learning, clean implementation, and continuous improvement."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className={`${card} p-6 sm:p-8`}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Professional Summary
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  I am a Software Engineering student at Debre Markos University
                  with a strong interest in full-stack development. I enjoy
                  turning ideas into useful products through clean code,
                  responsive layouts, and reliable application structure.
                </p>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  My experience includes frontend development with HTML, CSS,
                  JavaScript, and React, plus backend work with NestJS, Node.js,
                  Python, and Golang. I also work with databases such as
                  PostgreSQL and MongoDB while continuing to improve through
                  hands-on building.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {statTargets.map((item, index) => (
                    <div
                      key={item.label}
                      className={`${secondaryCard} p-4 text-center`}
                    >
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stats[index]}
                        {item.suffix || ""}
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className={`${card} p-6`}>
                  <h3 className="text-xl font-semibold">Key Highlights</h3>
                  <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className={sectionSpace}>
          <div className={shell}>
            <SectionHeading
              eyebrow="Skills"
              title="Core capabilities across frontend, backend, and databases."
              description="These skill areas reflect the technologies I currently use and continue to strengthen through academic and practical work."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <article key={group.title} className={`${card} p-6 sm:p-8`}>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {group.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Capability
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-2 flex items-center justify-between gap-4 text-sm font-semibold">
                          <span>{skill.name}</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {skill.value}%
                          </span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-slate-900 transition-all duration-1000 dark:bg-slate-100"
                            style={{
                              width: skillsVisible ? `${skill.value}%` : "0%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {focusAreas.map((item) => (
                <div
                  key={item.title}
                  className={`${secondaryCard} border-l-4 border-l-slate-900 p-6 dark:border-l-slate-100`}
                >
                  <i
                    className={`${item.icon} text-lg text-slate-700 dark:text-slate-200`}
                  />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="timeline"
          className={`border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 ${sectionSpace}`}
        >
          <div className={`${shell} max-w-5xl`}>
            <SectionHeading
              eyebrow="Journey"
              title="My development path so far."
              description="A simple timeline showing how my interest in software has grown into focused full-stack development work."
            />

            <div className="mt-10 space-y-4">
              {journey.map((item) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className={`${card} grid gap-4 p-5 sm:p-6 md:grid-cols-[100px_1fr] md:p-7`}
                >
                  <div className="inline-flex h-fit items-center justify-center rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={sectionSpace}>
          <div className={shell}>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s connect for internships, collaboration, or project opportunities."
              description="If you have an opportunity, project, or team collaboration in mind, feel free to send a message."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`${card} p-6 sm:p-8`}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Contact Information
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  I’m open to internships, freelance opportunities, and
                  collaboration that helps me keep growing as a developer while
                  contributing meaningful work.
                </p>

                <div className="mt-6 grid gap-3">
                  {contactLinks.map((item) => (
                    <a
                      key={item.label}
                      className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      <i
                        className={`${item.icon} text-slate-700 dark:text-slate-200`}
                      />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <form
                className={`${card} grid gap-4 p-6 sm:p-8`}
                onSubmit={handleSubmit}
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Send a Message
                </h3>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Message</span>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell me about your project or opportunity"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-100"
                  />
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className={`${primaryButton} w-full`}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className={`${shell} flex flex-col items-start justify-between gap-4 md:flex-row md:items-center`}>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Biniam Birhanu
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Software Engineering student focused on frontend, backend, and
              database-supported applications.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
