import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "./components/Navbar";

// ── Data ───────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

const SOCIAL = [
  { icon: "fab fa-github",    href: "https://github.com/yodnabin-1995",                             label: "GitHub"    },
  { icon: "fab fa-linkedin",  href: "https://www.linkedin.com/in/biniam-birihanu-95ba9b38b/",        label: "LinkedIn"  },
  { icon: "fas fa-envelope",  href: "mailto:awsc0620@gmail.com",                                    label: "Email"     },
  { icon: "fab fa-instagram", href: "https://www.instagram.com/benjamin16333/",                     label: "Instagram" },
  { icon: "fab fa-facebook",  href: "https://web.facebook.com/biniam.birihanu.3",                   label: "Facebook"  },
  { icon: "fab fa-x-twitter", href: "https://x.com/Benj16amin/",                                    label: "X"         },
  { icon: "fab fa-telegram",  href: "https://t.me/Ben16jamin",                                      label: "Telegram"  },
];

const SKILL_GROUPS = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5",       icon: "devicon-html5-plain colored"              },
      { name: "Tailwind CSS",icon: "devicon-tailwindcss-plain colored"        },
      { name: "JavaScript",  icon: "devicon-javascript-plain colored"         },
      { name: "TypeScript",  icon: "devicon-typescript-plain colored"         },
      { name: "React",       icon: "devicon-react-original colored"           },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js",    icon: "devicon-nodejs-plain colored"             },
      { name: "Express.js", icon: "devicon-express-original colored"         },
      { name: "Golang",     icon: "devicon-go-original-wordmark colored"     },
      { name: "MongoDB",    icon: "devicon-mongodb-plain colored"            },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored"         },
      { name: "MySQL",      icon: "devicon-mysql-plain colored"              },
      { name: "NestJS",     icon: "devicon-nestjs-plain colored"             },
    ],
  },
  {
    title: "Others",
    skills: [
      { name: "GitHub",     icon: "devicon-github-original colored"          },
      { name: "GitLab",     icon: "devicon-gitlab-plain colored"             },
      { name: "Git",        icon: "devicon-git-plain colored"                },
      { name: "Docker",     icon: "devicon-docker-plain colored"             },
      { name: "Kubernetes", icon: "devicon-kubernetes-plain colored"         },
    ],
  },
];


const PROJECTS = [
  {
    title: "Besew",
    desc: "A professional job search platform connecting employers and job seekers seamlessly. Besew streamlines the hiring process with powerful search, real-time messaging, and scalable infrastructure built for high-traffic environments.",
    img: "/images/besew.png",
    demo: "https://besewonline.com",
    repo: "https://github.com/yodnabin-1995",
    tags: ["React", "NestJS", "Docker", "Apache Pulsar", "MongoDB"],
  },
  {
    title: "Besew Casting",
    desc: "Ethiopia's premier platform connecting visionary directors with verified actors, models, voice artists, and crew — powered by AI.",
    img: "/images/casting.png",
    demo: "https://cast.besewonline.com/",
    repo: "https://github.com/yodnabin-1995",
    tags: ["React", "NestJS", "Docker", "Apache Pulsar", "MongoDB"],
  },
];


// ── Helpers ────────────────────────────────────────────────────────────────────
const shell = "mx-auto w-full max-w-5xl px-5 sm:px-8";
const sec   = "py-12 sm:py-16";

function Label({ children }) {
  return (
    <span className="inline-block rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
      {children}
    </span>
  );
}

function SectionTitle({ label, title, sub }) {
  return (
    <div className="mb-8 text-center">
      <Label>{label}</Label>
      <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-slate-400">{sub}</p>}
    </div>
  );
}

// ── Skills grid (tabbed + animated) ──────────────────────────────────────────
function SkillsGrid() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const group = SKILL_GROUPS[activeTab];

  return (
    <div ref={ref}>
      {/* Tab bar */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {SKILL_GROUPS.map((g, i) => (
          <button
            key={g.title}
            onClick={() => setActiveTab(i)}
            className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              activeTab === i
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "border border-white/10 bg-white/5 text-slate-400 hover:border-indigo-500/40 hover:text-white"
            }`}
          >
            <i className={
              g.title === "Frontend" ? "fas fa-desktop text-xs" :
              g.title === "Backend"  ? "fas fa-server text-xs"  :
                                       "fas fa-wrench text-xs"
            } />
            {g.title}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              activeTab === i ? "bg-white/20 text-white" : "bg-white/10 text-slate-400"
            }`}>
              {g.skills.length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {group.skills.map((sk, si) => (
          <div
            key={sk.name}
            className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            style={
              on
                ? { animation: `fadeInUp 0.35s ease ${si * 0.07}s both` }
                : { opacity: 0 }
            }
          >
            {/* Glow blob */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
            />
            <i className={`${sk.icon} text-4xl transition-transform duration-300 group-hover:scale-110`} />
            <span className="text-center text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
              {sk.name}
            </span>
          </div>
        ))}
      </div>

      {/* All skills strip */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {SKILL_GROUPS.flatMap((g) => g.skills).map((sk) => (
          <span
            key={sk.name}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400 hover:border-indigo-500/40 hover:text-indigo-300 transition-colors cursor-default"
          >
            <i className={`${sk.icon} text-sm`} />
            {sk.name}
          </span>
        ))}
      </div>
    </div>
  );
}


// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/[0.07]">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-base font-bold text-white">{project.title}</h3>
        <p className="mb-4 text-sm leading-6 text-slate-400 line-clamp-3">{project.desc}</p>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
          >
            <i className="fas fa-external-link-alt text-[10px]" /> Live demo →
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
          >
            <i className="fab fa-github" /> Go to repository
          </a>
        </div>
      </div>
    </div>
  );
}


// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState("about");
  const [form,     setForm]     = useState({ name: "", email: "", message: "" });
  const [sending,  setSending]  = useState(false);
  const [toast,    setToast]    = useState(null);

  // Always dark
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  useEffect(() => { emailjs.init("ckeNV1U1JhCDS4_Yp"); }, []);

  // Active section tracker
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim())                                return setToast({ ok: false, msg: "Please enter your name."           });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))  return setToast({ ok: false, msg: "Please enter a valid email."       });
    if (form.message.trim().length < 10)                  return setToast({ ok: false, msg: "Message needs at least 10 chars." });
    setSending(true);
    try {
      await emailjs.send("service_p153q0q", "template_t0rjprb", {
        from_name:  form.name.trim(),
        from_email: form.email.trim(),
        message:    form.message.trim(),
        to_name:    "Biniam Birhanu",
        reply_to:   form.email.trim(),
      });
      setForm({ name: "", email: "", message: "" });
      setToast({ ok: true, msg: "Message sent!" });
    } catch {
      setToast({ ok: false, msg: "Failed to send. Try again later." });
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="min-h-screen text-white">

      {/* ── Orb background ── */}
      <div className="mesh-bg" aria-hidden>
        <div className="mesh-orb3" />
        <div className="mesh-orb4" />
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div
          role="alert"
          className={`fixed right-4 top-4 z-[999] flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium text-white shadow-xl backdrop-blur-md sm:min-w-[280px] ${
            toast.ok ? "bg-emerald-600/90" : "bg-red-600/90"
          }`}
        >
          <i className={toast.ok ? "fas fa-check-circle" : "fas fa-circle-exclamation"} />
          <span className="flex-1">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <i className="fas fa-times" />
          </button>
        </div>
      )}

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <Navbar active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />


      <main>
        {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
        <section className="pt-10 pb-12">
          <div className={`${shell} py-0`}>
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">

              {/* Left — text */}
              <div className="max-w-xl text-center md:text-left">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                  Hi, I&apos;m
                </p>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Biniam Birhanu
                </h1>
                <p className="mt-3 text-lg font-semibold text-slate-300">
                  Full-Stack Developer
                </p>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  I build secure, scalable, and user-focused systems. Specialising in
                  Golang, Node.js, and NestJS, I turn complex engineering challenges
                  into reliable digital products that deliver smooth user experiences.
                </p>

                {/* CTA buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  <a
                    href="/images/resume.png"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-500"
                  >
                    <i className="fas fa-file-lines" /> View Resume
                  </a>
                  <a
                    href="https://github.com/yodnabin-1995"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    <i className="fab fa-github" /> GitHub
                  </a>
                </div>
              </div>

              {/* Right — code editor card */}
              <div className="shrink-0 w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-indigo-500/10">

                  {/* Editor title bar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors cursor-pointer" />
                      <span className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
                    </div>
                    {/* Fake tab */}
                    <div className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 px-3 py-1">
                      <i className="devicon-typescript-plain colored text-xs" />
                      <span className="text-xs text-slate-300 font-mono">biniam.ts</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-xs">
                      <i className="fas fa-code-branch" />
                      <span className="font-mono">main</span>
                    </div>
                  </div>

                  {/* Code body */}
                  <div className="flex font-mono text-xs leading-6 p-4 overflow-x-auto">
                    {/* Line numbers */}
                    <div className="select-none pr-4 text-right text-slate-600 space-y-0.5 shrink-0">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    {/* Code */}
                    <div className="space-y-0.5 text-slate-300">
                      <div><span className="text-indigo-400">const </span><span className="text-sky-300">developer</span><span className="text-slate-400"> = </span><span className="text-yellow-300">{"{"}</span></div>
                      <div className="pl-4"><span className="text-green-400">name</span><span className="text-slate-500">: </span><span className="text-orange-300">"Biniam Birhanu"</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">role</span><span className="text-slate-500">: </span><span className="text-orange-300">"Full-Stack Developer"</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">location</span><span className="text-slate-500">: </span><span className="text-orange-300">"Ethiopia 🇪🇹"</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">frontend</span><span className="text-slate-500">: </span><span className="text-sky-400">["React"<span className="text-slate-500">,</span> "TypeScript"]</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">backend</span><span className="text-slate-500">: </span><span className="text-sky-400">["NestJS"<span className="text-slate-500">,</span> "Golang"<span className="text-slate-500">,</span> "Node.js"]</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">database</span><span className="text-slate-500">: </span><span className="text-sky-400">["MongoDB"<span className="text-slate-500">,</span> "PostgreSQL"]</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">devops</span><span className="text-slate-500">: </span><span className="text-sky-400">["Docker"<span className="text-slate-500">,</span> "Apache Pulsar"]</span><span className="text-slate-500">,</span></div>
                      <div className="pl-4"><span className="text-green-400">available</span><span className="text-slate-500">: </span><span className="text-indigo-400">true</span><span className="text-slate-500">,</span></div>
                      <div><span className="text-yellow-300">{"}"}</span><span className="text-slate-500">;</span></div>
                      <div className="pt-1 text-slate-600"><span className="text-slate-500">// </span><span className="text-emerald-400/70">open to opportunities ✓</span></div>
                      <div className="flex items-center gap-0.5">
                        <span className="text-slate-600">{">"}</span>
                        <span className="inline-block h-3.5 w-2 bg-indigo-400 ml-1" style={{ animation: "blink 1.1s step-end infinite" }} />
                      </div>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="flex items-center justify-between border-t border-white/10 bg-indigo-600/20 px-4 py-1.5 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><i className="fas fa-check-circle text-emerald-400" /> TypeScript</span>
                      <span>UTF-8</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Ln 12, Col 1</span>
                      <span className="flex items-center gap-1 text-emerald-400"><i className="fas fa-circle text-[8px]" /> Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ═══════════════════════════════════════════════════════════ */}
        <section id="skills" className={sec}>
          <div className={shell}>
            <SectionTitle
              label="Skills"
              title="Skills"
              sub="Check out some of the skills i've been working on:"
            />
            <SkillsGrid />
          </div>
        </section>

        {/* ══ ABOUT ════════════════════════════════════════════════════════════ */}
        <section id="about" className={sec}>
          <div className={shell}>
            <SectionTitle label="About Me" title="Who I Am" sub="A passionate engineer who turns complex problems into elegant, scalable solutions." />

            {/* Top — profile + bio */}
            <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start lg:gap-16 mb-10">

              {/* Left — avatar + quick info */}
              <div className="flex flex-col items-center gap-4">
                <div className="h-40 w-40 overflow-hidden rounded-2xl border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/20">
                  <img
                    src="/images/logo.jpg"
                    alt="Biniam Birhanu"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center 10%" }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-white">Biniam Birhanu</p>
                  <p className="text-xs text-indigo-400 mt-0.5">Full-Stack Developer</p>
                </div>
                {/* Social quick links */}
                <div className="flex gap-2">
                  <a href="https://github.com/yodnabin-1995" target="_blank" rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 transition">
                    <i className="fab fa-github" />
                  </a>
                  <a href="https://www.linkedin.com/in/biniam-birihanu-95ba9b38b/" target="_blank" rel="noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 transition">
                    <i className="fab fa-linkedin" />
                  </a>
                  <a href="mailto:awsc0620@gmail.com"
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 transition">
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>

              {/* Right — bio */}
              <div className="space-y-4 text-base leading-7 text-slate-400">
                <h3 className="text-xl font-bold text-white">
                  Building reliable software, one line at a time.
                </h3>
                <p>
                  I'm a <span className="font-semibold text-white">Full-Stack Developer</span> with
                  hands-on experience building clean, performant, and genuinely useful products —
                  from responsive frontends to robust backend APIs and real-time systems.
                </p>
                <p>
                  On the frontend I work with <span className="text-white">React</span> and{" "}
                  <span className="text-white">TypeScript</span>. On the backend I design APIs
                  with <span className="text-white">NestJS</span>,{" "}
                  <span className="text-white">Node.js</span>, and{" "}
                  <span className="text-white">Golang</span>, backed by{" "}
                  <span className="text-white">PostgreSQL</span>,{" "}
                  <span className="text-white">MongoDB</span>, and{" "}
                  <span className="text-white">MySQL</span>. I also work with event-driven
                  architectures using <span className="text-white">Apache Pulsar</span> and
                  containerise everything with <span className="text-white">Docker</span>.
                </p>
                <p>
                  I'm open to <span className="text-white">internships</span>,{" "}
                  <span className="text-white">freelance</span>, and{" "}
                  <span className="text-white">collaborative</span> opportunities where I
                  can deliver meaningful work and keep growing as an engineer.
                </p>

                {/* Interest tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Clean UI", "REST APIs", "gRPC", "System Design", "Open Source", "Event-Driven", "CI/CD", "Collaboration"].map((t) => (
                    <span key={t} className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                    <i className="fas fa-paper-plane" /> Get in Touch
                  </a>
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20">
                    <i className="fas fa-folder-open" /> View Projects
                  </a>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "2+",  label: "Years of Experience" },
                { value: "10+", label: "Projects Completed"  },
                { value: "5+",  label: "Technologies Mastered" },
                { value: "3+",  label: "Domains Shipped"      },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                  <p className="text-3xl font-extrabold text-indigo-400">{s.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Expertise cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: "fas fa-code",           label: "Frontend",   desc: "React, TypeScript, Tailwind CSS, Next.js"         },
                { icon: "fas fa-server",          label: "Backend",    desc: "Node.js, NestJS, Golang, Express.js, gRPC"        },
                { icon: "fas fa-database",        label: "Databases",  desc: "PostgreSQL, MongoDB, MySQL, Redis"                },
                { icon: "fas fa-cloud",           label: "DevOps",     desc: "Docker, Kubernetes, Git, AWS S3, CI/CD"           },
                { icon: "fas fa-bolt",            label: "APIs",       desc: "REST, gRPC, WebSockets, GraphQL, Apache Pulsar"   },
                { icon: "fas fa-shield-halved",   label: "Security",   desc: "JWT, OAuth2, Rate Limiting, Input Validation"     },
              ].map((card) => (
                <div
                  key={card.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-indigo-500/40 hover:bg-white/[0.07]"
                >
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-indigo-400">
                    <i className={card.icon} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-white">{card.label}</h4>
                    <p className="text-xs leading-5 text-slate-400">{card.desc}</p>
                  </div>
                </div>
                ))}
              </div>
          </div>
        </section>
        <section id="projects" className={sec}>
          <div className={shell}>
            <SectionTitle
              label="Projects"
              title="Projects"
              sub="Below, you'll find an overview of the various projects i've had the privilege to work on thus far:"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════════════════════ */}
        <section id="contact" className={sec}>
          <div className={shell}>
            <SectionTitle
              label="Contact"
              title="Let's connect!"
              sub="Open to new opportunities and collaborations. Interested in working together or have a project in mind? I'm always eager to help create impactful digital experiences."
            />

            <div className="grid gap-6 md:grid-cols-2 md:items-start">

              {/* Left — info */}
              <div className="space-y-4">
                <p className="text-slate-400">
                  Don&apos;t hesitate to reach out for inquiries or potential collaborations.
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Contact me at</p>
                  <a
                    href="mailto:awsc0620@gmail.com"
                    className="text-sm font-semibold text-indigo-400 hover:underline"
                  >
                    awsc0620@gmail.com
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <form
                onSubmit={onSubmit}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8"
              >
                <h3 className="font-bold text-white">Get in touch</h3>
                <p className="text-sm text-slate-400">Send message</p>

                {[
                  { id: "name",  label: "Name",  type: "text",  ph: "Your name"     },
                  { id: "email", label: "Email", type: "email", ph: "your@email.com" },
                ].map((f) => (
                  <label key={f.id} className="grid gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{f.label}</span>
                    <input
                      type={f.type}
                      name={f.id}
                      placeholder={f.ph}
                      value={form[f.id]}
                      onChange={onChange}
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </label>
                ))}

                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or opportunity…"
                    value={form.message}
                    onChange={onChange}
                    required
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
                >
                  {sending ? (
                    <><i className="fas fa-spinner fa-spin" /> Sending…</>
                  ) : (
                    <><i className="fas fa-paper-plane" /> Send message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>


      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/10 bg-black/20 py-8 backdrop-blur-xl">
        <div className={`${shell} flex flex-col items-center justify-between gap-6 sm:flex-row`}>

          {/* Nav links */}
          <nav className="flex gap-6">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm font-medium text-slate-400 transition hover:text-indigo-400"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Social icons — all */}
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-slate-400 transition hover:border-indigo-500/50 hover:text-indigo-400"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>

          <p className="text-xs text-slate-500">
            {new Date().getFullYear()}, Biniam Birhanu. all rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
