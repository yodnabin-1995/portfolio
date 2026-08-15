import { useState, useRef } from "react";

const NAV = [
  { id: "about",    label: "About"    },
  { id: "skills",   label: "Skills"   },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact"  },
];

const shell = "mx-auto w-full max-w-5xl px-5 sm:px-8";

export default function Navbar({ active, menuOpen, setMenuOpen }) {
  const [hovered, setHovered] = useState(null);
  const [ripples, setRipples] = useState({});
  const navRef = useRef(null);

  const triggerRipple = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = Date.now();
    setRipples((prev) => ({ ...prev, [id]: { x, y, key } }));
    setTimeout(() => setRipples((prev) => { const n = { ...prev }; delete n[id]; return n; }), 600);
  };

  return (
    <header>
      <nav className="nav-bar sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className={`${shell} flex h-[68px] items-center justify-between`}>

          {/* Logo */}
          <a href="#" className="nav-logo flex items-center gap-2.5 font-bold text-white">
            <span className="nav-logo-img h-9 w-9 overflow-hidden rounded-xl border border-indigo-500/40">
              <img src="/images/logo.jpg" alt="Biniam Birhanu" className="h-full w-full object-cover" style={{ objectPosition: "center 10%" }} />
            </span>
            <span className="hidden sm:inline text-sm tracking-wide nav-logo-text">Biniam Birhanu</span>
          </a>

          {/* Desktop links */}
          <ul ref={navRef} className="hidden md:flex items-center gap-1">
            {NAV.map((n, i) => (
              <li key={n.id} className="nav-item" style={{ animationDelay: `${i * 0.07}s` }}>
                <a
                  href={`#${n.id}`}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onMouseDown={(e) => triggerRipple(n.id, e)}
                  className={`nav-link relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold overflow-hidden transition-colors duration-200 ${
                    active === n.id
                      ? "nav-link--active text-indigo-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {/* Hover background pill */}
                  <span
                    className={`nav-link-bg absolute inset-0 rounded-xl transition-all duration-300 ${
                      active === n.id
                        ? "bg-indigo-500/20 opacity-100"
                        : hovered === n.id
                        ? "bg-white/10 opacity-100"
                        : "opacity-0"
                    }`}
                  />

                  {/* Ripple */}
                  {ripples[n.id] && (
                    <span
                      className="nav-ripple"
                      style={{ left: ripples[n.id].x, top: ripples[n.id].y }}
                    />
                  )}

                  {/* Label */}
                  <span className="relative z-10">{n.label}</span>

                  {/* Active underline bar */}
                  <span
                    className={`nav-underline absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-indigo-400 transition-all duration-300 ${
                      active === n.id ? "w-4 opacity-100" : hovered === n.id ? "w-3 opacity-50" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            ))}

            {/* Hire me CTA */}
            <li className="nav-item ml-2" style={{ animationDelay: `${NAV.length * 0.07}s` }}>
              <a
                href="#contact"
                className="nav-cta relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white overflow-hidden"
              >
                <span className="nav-cta-shine" />
                <i className="fas fa-bolt text-xs relative z-10" />
                <span className="relative z-10">Hire me</span>
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-slate-300 hover:bg-white/10 md:hidden nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <i className={menuOpen ? "fas fa-times nav-icon-spin" : "fas fa-bars"} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`nav-drawer border-t border-white/10 bg-black/60 px-5 pb-4 pt-2 backdrop-blur-xl md:hidden ${menuOpen ? "nav-drawer--open" : "nav-drawer--closed"}`}>
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setMenuOpen(false)}
              className={`nav-drawer-link block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white ${
                active === n.id ? "text-indigo-400 bg-indigo-500/10" : "text-slate-300"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
