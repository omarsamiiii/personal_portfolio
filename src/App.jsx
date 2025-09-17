import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Sun, Moon } from "lucide-react";

// ======== Personal Portfolio (Single-File React) ========
// - TailwindCSS classes are used for styling (no setup needed in canvas)
// - Framer Motion adds tasteful animations
// - Lucide icons for crisp SVGs
// - Dark mode with localStorage persistence
// - Sections: Hero, About, Skills, Projects, Contact, Footer
// - Customize the data blocks below and you're ready to deploy

// ---- Customize Me ----
const PROFILE = {
  name: "Omar El‑Masry",
  title: "Senior Software Engineer · Systems & ML",
  location: "Cairo, Egypt",
  bio:
    "Engineer building high‑performance systems (C++/Python), ML‑driven schedulers, and elegant developer tooling. I care about reliability, DX, and delightful UX.",
  resumeUrl: "#", // replace with a real link (e.g., /Omar-Resume.pdf)
  email: "omar@example.com", // used in the contact button
  socials: [
    { label: "GitHub", href: "https://github.com/your-username", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle/", icon: Linkedin },
    { label: "Email", href: "mailto:omar@example.com", icon: Mail },
  ],
};

const SKILLS = [
  {
    group: "Core",
    items: ["C++ (17/20)", "Python", "Tcl", "C#", "SQL", "Linux"],
  },
  {
    group: "Systems & Tools",
    items: ["Concurrency", "Profiling", "gdb/valgrind", "SGE / Slurm", "Docker"],
  },
  {
    group: "ML / Data",
    items: ["XGBoost", "LightGBM", "Pandas", "MLflow", "dbt", "PostgreSQL"],
  },
  { group: "Frontend", items: ["React", "TailwindCSS", "Vite", "shadcn/ui"] },
];

const PROJECTS = [
  {
    name: "Schedule‑Predictor",
    desc:
      "ML pipeline predicting duration & memory of RTL simulations to optimize grid scheduling. Features advanced feature engineering, model tracking, and evaluation dashboards.",
    tags: ["Python", "XGBoost", "PostgreSQL", "MLflow"],
    links: [
      { label: "Repo", href: "https://github.com/your-username/schedule-predictor" },
      { label: "Docs", href: "https://your-site.dev/schedule-predictor" },
    ],
  },
  {
    name: "VRUN (C++ Migration)",
    desc:
      "Modern C++ rewrite of a legacy Tcl run manager: dependency graph, smart‑pointer architecture, robust logging, and cross‑platform process orchestration.",
    tags: ["C++", "Tcl", "Systems", "Concurrency"],
    links: [
      { label: "Repo", href: "https://github.com/your-username/vrun-cpp" },
    ],
  },
  {
    name: "Hobby‑Centric Interiors",
    desc:
      "Design micro‑site showcasing moodboards and project case studies. Clean UI, accessible components, and CMS‑driven content.",
    tags: ["React", "Tailwind", "Content"],
    links: [
      { label: "Live", href: "https://your-username.github.io/hobby-home" },
      { label: "Repo", href: "https://github.com/your-username/hobby-home" },
    ],
  },
];

const CONTACT_NOTE =
  "Looking for collaborations, freelance systems work, or ML consulting. ";

// ---- Helpers ----
const Section = ({ id, title, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium opacity-90">
    {children}
  </span>
);

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, setDark };
}

const Header = () => {
  const { dark, setDark } = useDarkMode();
  const nav = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-base sm:text-lg">{PROFILE.name}</a>
        <nav className="hidden sm:flex items-center gap-6">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-sm opacity-80 hover:opacity-100">
              {n.label}
            </a>
          ))}
          <div className="h-5 w-px bg-neutral-300 dark:bg-neutral-700" />
          <button
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-xl border hover:shadow"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="home" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-sm uppercase tracking-[0.25em] mb-3 opacity-60">Portfolio</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
          {PROFILE.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg opacity-90 max-w-prose">{PROFILE.bio}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.resumeUrl}
            className="px-4 py-2 rounded-xl border hover:shadow text-sm"
          >
            Download Résumé
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:shadow text-sm"
          >
            Contact Me
          </a>
          {PROFILE.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="ml-1 inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:shadow text-sm"
            >
              {React.createElement(s.icon, { className: "h-4 w-4" })}
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="md:justify-self-end"
      >
        <div className="aspect-square w-full max-w-sm rounded-3xl border overflow-hidden shadow-sm">
          {/* Placeholder gradient avatar/banner */}
          <div className="h-full w-full bg-gradient-to-br from-indigo-200 via-sky-200 to-emerald-200 dark:from-indigo-900 dark:via-slate-800 dark:to-emerald-900" />
        </div>
        <p className="mt-3 text-sm opacity-70">{PROFILE.location}</p>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <Section id="about" title="About">
    <div className="grid md:grid-cols-3 gap-8">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="md:col-span-2 opacity-90 leading-relaxed"
      >
        I'm a systems‑minded engineer who loves transforming messy real‑world constraints into robust software. Recently I've been migrating
        large Tcl orchestration to modern C++ (smart pointers, thread pools), and building ML predictors to cut compute cost on large simulation grids.
        I enjoy writing clear docs, thoughtful APIs, and small quality‑of‑life tools for teammates.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-neutral-50 dark:bg-neutral-900 border rounded-2xl p-5"
      >
        <h3 className="font-medium mb-3">Highlights</h3>
        <ul className="space-y-2 text-sm opacity-90 list-disc pl-5">
          <li>Led rewrite of mission‑critical Run Manager to C++</li>
          <li>Designed ML pipeline (XGBoost) with MLflow and dashboards</li>
          <li>Built DX tools: log parsers, metrics exporters, perf tracers</li>
        </ul>
      </motion.div>
    </div>
  </Section>
);

const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SKILLS.map((s, i) => (
        <motion.div
          key={s.group}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.03 * i }}
          className="rounded-2xl border p-5 bg-white/60 dark:bg-neutral-900/60"
        >
          <h4 className="font-medium mb-3">{s.group}</h4>
          <div className="flex flex-wrap gap-2">
            {s.items.map((it) => (
              <Tag key={it}>{it}</Tag>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-2 gap-6">
      {PROJECTS.map((p, i) => (
        <motion.article
          key={p.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 * i }}
          className="rounded-2xl border p-5 hover:shadow-sm bg-white/60 dark:bg-neutral-900/60"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-lg tracking-tight">{p.name}</h3>
          </div>
          <p className="mt-2 text-sm opacity-90 leading-relaxed">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {p.links?.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border hover:shadow"
              >
                <ExternalLink className="h-4 w-4" /> {l.label}
              </a>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Contact">
    <div className="grid md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border p-5 bg-white/60 dark:bg-neutral-900/60"
      >
        <h3 className="font-medium">Let's work together</h3>
        <p className="mt-2 text-sm opacity-90 leading-relaxed">{CONTACT_NOTE}</p>
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:shadow text-sm"
        >
          <Mail className="h-4 w-4" /> Email me
        </a>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 0.05 }}
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          const subject = encodeURIComponent(`Portfolio Inquiry from ${data.get("name")}`);
          const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
          window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
        }}
        className="rounded-2xl border p-5 bg-white/60 dark:bg-neutral-900/60"
      >
        <div className="grid gap-4">
          <label className="text-sm">
            Name
            <input name="name" required className="mt-1 w-full rounded-xl border px-3 py-2 bg-transparent" />
          </label>
          <label className="text-sm">
            Email
            <input name="email" type="email" required className="mt-1 w-full rounded-xl border px-3 py-2 bg-transparent" />
          </label>
          <label className="text-sm">
            Message
            <textarea name="message" rows={4} required className="mt-1 w-full rounded-xl border px-3 py-2 bg-transparent" />
          </label>
          <button className="justify-self-start px-4 py-2 rounded-xl border hover:shadow text-sm">Send</button>
        </div>
      </motion.form>
    </div>
  </Section>
);

const Footer = () => (
  <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm opacity-70">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
      <div className="flex items-center gap-3">
        {PROFILE.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm hover:shadow"
          >
            {React.createElement(s.icon, { className: "h-4 w-4" })}
            <span className="hidden sm:inline">{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  // Subtle page reveal
  const reveal = useMemo(() => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25 } }), []);

  return (
    <motion.main {...reveal} className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </motion.main>
  );
}
