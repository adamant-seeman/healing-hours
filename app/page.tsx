"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Quote,
  Send,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const navLinks = ["Home", "About", "Services", "Support Areas", "Resources", "Contact"];

const supportAreas = [
  "Child Counselling",
  "Individual Counselling",
  "Family Counselling",
  "Stress & Anxiety Support",
  "Relationship Counselling",
  "Mental Wellness Support"
];

const testimonials = [
  {
    quote:
      "The sessions felt gentle, focused, and deeply respectful. I finally had space to understand what I was carrying.",
    name: "Client reflection"
  },
  {
    quote:
      "I felt heard without judgment and supported with practical tools I could actually use between sessions.",
    name: "Wellbeing client"
  },
  {
    quote:
      "The Healing Hour brings calm professionalism and warmth together in a way that feels very rare.",
    name: "Family support client"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="watercolor" />
      <FloatingLeaves />
      <Navbar dark={dark} open={open} setDark={setDark} setOpen={setOpen} />
      <Hero />
      <Therapist />
      <SupportAreas />
      <Philosophy />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

function Navbar({
  dark,
  open,
  setDark,
  setOpen
}: {
  dark: boolean;
  open: boolean;
  setDark: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className="glass mx-auto flex max-w-7xl items-center justify-between rounded-[28px] px-4 py-3 sm:px-5"
      >
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-cream ring-1 ring-purple/20">
            <Image src="/reference/logo.jpeg" alt="" fill className="object-cover" sizes="48px" priority />
          </span>
          <span>
            <span className="serif block text-xl font-semibold leading-none text-purple dark:text-beige">
              The Healing Hour
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-sage">Counselling</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition hover:bg-lavender/16 hover:text-purple dark:text-cream/80 dark:hover:text-cream"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-purple/15 bg-white/55 text-purple shadow-sm transition hover:-translate-y-0.5 hover:bg-lavender/20 dark:bg-white/8 dark:text-beige"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen(!open)}
            className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-purple/15 bg-white/55 text-purple shadow-sm lg:hidden dark:bg-white/8 dark:text-beige"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-3 grid max-w-7xl gap-1 rounded-[24px] p-3 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-lavender/18 dark:text-cream/85"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-28">
      <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="max-w-3xl">
        <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple/18 bg-white/50 px-4 py-2 text-sm font-medium text-purple shadow-sm backdrop-blur dark:bg-white/8 dark:text-beige">
          <Sparkles size={16} />
          Premium counselling psychology practice
        </motion.p>
        <motion.h1 variants={fadeUp} className="serif text-6xl font-semibold leading-[0.94] text-purple dark:text-beige sm:text-7xl lg:text-8xl">
          The Healing Hour
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-7 max-w-xl text-xl leading-8 text-ink/72 dark:text-cream/78">
          A safe space to heal, express, and grow.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a href="#contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-purple px-7 py-4 font-semibold text-white shadow-bloom transition hover:-translate-y-1 hover:bg-[#7f6aa8]">
            Book Session <CalendarCheck size={18} />
          </a>
          <a href="#about" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-purple/20 bg-white/55 px-7 py-4 font-semibold text-purple shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-lavender/18 dark:bg-white/8 dark:text-beige">
            Learn More <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        aria-label="Minimal face line art with leaves symbolizing healing growth"
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass relative mx-auto aspect-[0.92] w-full max-w-[560px] overflow-hidden rounded-[36px] p-7"
      >
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 1.4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <HeroIllustration />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 570" className="h-full w-full" role="img" aria-hidden="true">
      <path d="M0 118C77 56 128 70 203 85c73 14 110-46 187-50 62-3 99 25 130 66v469H0Z" fill="#FAF8F5" opacity=".72" />
      <path d="M-8 396c70-64 139-74 210-31 79 49 144 51 202 13 51-33 81-40 122-19v211H-8Z" fill="#E8DED4" opacity=".72" />
      <path d="M318 29c82 6 155 58 200 139v132c-42-38-82-48-129-28-70 30-119-11-112-79 5-52 18-103 41-164Z" fill="#B8A5D6" opacity=".45" />
      <path d="M4 451c83-23 140 4 190 54 48 48 100 62 164 29 46-24 106-23 168 13v28H4Z" fill="#B8A5D6" opacity=".6" />
      <path d="M314 120c-50 31-72 78-66 139 4 43 23 73 57 95 16 10 16 22 1 34l-25 20c-22 18-27 40-14 67" fill="none" stroke="#304E3D" strokeLinecap="round" strokeWidth="4" />
      <path d="M287 118c42 9 70 32 84 69 15 42 42 64 82 67" fill="none" stroke="#304E3D" strokeLinecap="round" strokeWidth="4" />
      <path d="M174 312c28-63 82-111 164-145" fill="none" stroke="#304E3D" strokeLinecap="round" strokeWidth="4" />
      <path d="M193 301c-26-28-47-29-64-3 22 25 43 26 64 3Z" fill="#A8B5A2" stroke="#304E3D" strokeWidth="2" />
      <path d="M237 249c-33-18-53-12-62 18 27 16 48 10 62-18Z" fill="#B8A5D6" stroke="#304E3D" strokeWidth="2" />
      <path d="M282 213c-36-13-55-3-59 27 30 12 50 3 59-27Z" fill="#A8B5A2" stroke="#304E3D" strokeWidth="2" />
      <path d="M332 188c-30-22-51-18-65 11 25 20 47 16 65-11Z" fill="#D6C7B6" stroke="#304E3D" strokeWidth="2" />
      <path d="M366 236c-21-31-42-35-64-12 17 27 39 31 64 12Z" fill="#A8B5A2" stroke="#304E3D" strokeWidth="2" />
      <path d="M222 183c-10 37 1 56 32 58 9-31-2-50-32-58Z" fill="#D6C7B6" stroke="#304E3D" strokeWidth="2" />
      <path d="M279 151c-12 35-2 55 29 60 11-30 1-50-29-60Z" fill="#A8B5A2" stroke="#304E3D" strokeWidth="2" />
      <path d="M154 345c30 34 66 49 108 46" fill="none" stroke="#304E3D" strokeLinecap="round" strokeWidth="4" />
      <path d="M236 425c-8 36-28 68-60 96M257 434c-3 38 8 72 34 102M246 430c-24 28-60 48-108 60M271 424c29 22 64 34 104 34" fill="none" stroke="#A8906E" strokeLinecap="round" strokeWidth="3" />
      <circle cx="157" cy="232" r="7" fill="#D6C7B6" />
      <circle cx="394" cy="161" r="6" fill="#B8A5D6" />
      <circle cx="120" cy="360" r="5" fill="#A8B5A2" />
      <path d="M66 95c44-40 99-57 163-47" fill="none" stroke="#8F7AB8" strokeLinecap="round" strokeWidth="2" opacity=".55" />
      <path d="M74 506c31-17 63-18 96-3" fill="none" stroke="#8F7AB8" strokeLinecap="round" strokeWidth="2" opacity=".55" />
    </svg>
  );
}

function Therapist() {
  return (
    <Section id="about" eyebrow="Meet your therapist" title="Compassionate care with calm clinical depth.">
      <motion.div variants={fadeUp} className="glass grid gap-8 rounded-[32px] p-6 sm:p-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative min-h-80 overflow-hidden rounded-[28px] bg-beige/50">
          <Image src="/reference/letterhead.jpeg" alt="The Healing Hour brand letterhead reference" fill className="object-cover opacity-80" sizes="(min-width: 1024px) 420px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple/55 via-transparent to-cream/20" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="serif text-4xl font-semibold text-purple dark:text-beige sm:text-5xl">Devanshi Singh</p>
          <p className="mt-2 text-xl font-medium text-ink/78 dark:text-cream/78">Counselling Psychologist</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/68 dark:text-cream/72">
            A grounded, confidential space for children, individuals, couples, and families to explore emotions,
            strengthen coping skills, and move toward healthier patterns.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["CBT-informed", "Hypnotherapy-informed", "Compassionate Support"].map((tag) => (
              <span key={tag} className="rounded-full border border-purple/16 bg-white/55 px-4 py-2 text-sm font-semibold text-purple shadow-sm dark:bg-white/8 dark:text-beige">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function SupportAreas() {
  return (
    <Section id="support-areas" eyebrow="Areas of support" title="Care shaped around the conversations that matter.">
      <div id="services" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {supportAreas.map((area, index) => (
          <motion.article
            key={area}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.01 }}
            className="glass group min-h-52 rounded-[28px] p-7 transition"
          >
            <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-lavender/26 text-purple transition group-hover:bg-purple group-hover:text-white dark:text-beige">
              {index % 3 === 0 ? <Brain size={23} /> : index % 3 === 1 ? <HeartHandshake size={23} /> : <Sparkles size={23} />}
            </div>
            <h3 className="serif text-3xl font-semibold text-purple dark:text-beige">{area}</h3>
            <p className="mt-4 leading-7 text-ink/64 dark:text-cream/70">
              Thoughtful counselling support with steady pacing, emotional safety, and practical reflection.
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Philosophy() {
  return (
    <section id="resources" className="px-5 py-20 sm:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7 }}
        variants={fadeUp}
        className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-12"
      >
        <Quote className="mx-auto mb-6 text-sage" size={42} aria-hidden="true" />
        <p className="serif text-4xl font-semibold leading-tight text-purple dark:text-beige sm:text-6xl">
          You don't have to go through everything alone.
        </p>
        <p className="mt-6 text-2xl italic text-ink/62 dark:text-cream/72">Let's work through it together.</p>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Quiet progress, held with care.">
      <div className="grid gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <motion.article key={item.name} variants={fadeUp} className="glass rounded-[28px] p-7">
            <Quote className="mb-8 text-lavender" size={30} aria-hidden="true" />
            <p className="leading-8 text-ink/72 dark:text-cream/76">“{item.quote}”</p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-purple dark:text-beige">
              {item.name}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Begin with one gentle conversation.">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div variants={fadeUp} className="glass rounded-[32px] p-7 sm:p-8">
          <div className="space-y-5">
            <ContactRow icon={<Phone size={20} />} label="Phone" value="8796131623" href="tel:8796131623" />
            <ContactRow icon={<Mail size={20} />} label="Email" value="dishalive22@gmail.com" href="mailto:dishalive22@gmail.com" />
            <ContactRow icon={<MapPin size={20} />} label="Location" value="Ramprastha Greens, Vaishali" />
          </div>
          <div className="mt-9 overflow-hidden rounded-[26px] border border-purple/14">
            <Image src="/reference/therapy-card.jpeg" alt="The Healing Hour therapy card reference" width={900} height={520} className="h-auto w-full object-cover opacity-90" />
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="glass rounded-[32px] p-7 sm:p-8"
          aria-label="Contact form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Phone" name="phone" placeholder="Your phone number" />
          </div>
          <Field label="Email" name="email" placeholder="you@example.com" type="email" className="mt-5" />
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-ink/72 dark:text-cream/78">How can we support you?</span>
            <textarea
              name="message"
              rows={6}
              className="focus-ring w-full resize-none rounded-[24px] border border-purple/14 bg-white/65 px-5 py-4 text-ink shadow-sm outline-none transition placeholder:text-ink/36 focus:border-purple/40 dark:bg-white/8 dark:text-cream dark:placeholder:text-cream/35"
              placeholder="Share a few lines about what you are looking for."
            />
          </label>
          <button type="submit" className="focus-ring mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple px-7 py-4 font-semibold text-white shadow-bloom transition hover:-translate-y-1 hover:bg-[#7f6aa8] sm:w-auto">
            Send Enquiry <Send size={18} />
          </button>
          {sent && (
            <p role="status" className="mt-5 rounded-[20px] bg-sage/18 px-5 py-4 text-sm font-semibold text-ink/72 dark:text-cream/78">
              Thank you. Your enquiry is ready to be connected to a booking workflow or clinic inbox.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className = ""
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-ink/72 dark:text-cream/78">{label}</span>
      <input
        name={name}
        type={type}
        className="focus-ring w-full rounded-full border border-purple/14 bg-white/65 px-5 py-4 text-ink shadow-sm outline-none transition placeholder:text-ink/36 focus:border-purple/40 dark:bg-white/8 dark:text-cream dark:placeholder:text-cream/35"
        placeholder={placeholder}
      />
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-4 rounded-[24px] border border-purple/12 bg-white/50 p-4 shadow-sm dark:bg-white/8">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lavender/22 text-purple dark:text-beige">{icon}</span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-sage">{label}</span>
        <span className="mt-1 block font-semibold text-ink/78 dark:text-cream/82">{value}</span>
      </span>
    </span>
  );

  return href ? (
    <a href={href} className="focus-ring block rounded-[24px]">
      {content}
    </a>
  ) : (
    content
  );
}

function Footer() {
  return (
    <footer className="px-5 pb-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 rounded-[30px] border border-purple/14 bg-beige/55 px-6 py-8 text-center shadow-glass backdrop-blur dark:bg-white/8 sm:flex-row sm:text-left">
        <div>
          <p className="serif text-3xl font-semibold text-purple dark:text-beige">The Healing Hour</p>
          <p className="mt-1 text-sm text-ink/62 dark:text-cream/68">A safe space to heal, express, and grow.</p>
        </div>
        <p className="text-sm text-ink/58 dark:text-cream/62">© 2026 The Healing Hour. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={fadeUp} className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-sage">{eyebrow}</p>
          <h2 className="serif text-4xl font-semibold leading-tight text-purple dark:text-beige sm:text-6xl">{title}</h2>
        </motion.div>
        {children}
      </motion.div>
    </section>
  );
}

function FloatingLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] opacity-70">
      <motion.svg
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 120 220"
        className="absolute left-[3%] top-[33%] h-44 w-24 text-sage/55"
      >
        <path d="M56 204C64 140 51 86 18 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 91C12 82 3 64 15 37c29 10 38 28 27 54ZM60 132c-29-9-38-27-27-54 30 9 39 27 27 54ZM70 88c29-15 48-9 58 18-27 15-46 9-58-18Z" fill="currentColor" opacity=".72" />
      </motion.svg>
      <motion.svg
        animate={{ y: [0, 20, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        viewBox="0 0 120 220"
        className="absolute right-[5%] top-[58%] h-52 w-28 text-lavender/50"
      >
        <path d="M53 203C77 137 76 81 50 35" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M56 77C29 62 25 42 43 18c27 16 31 36 13 59ZM67 125c-32-1-46-15-42-44 32 1 46 15 42 44ZM78 91c33-6 50 6 51 36-31 6-48-6-51-36Z" fill="currentColor" opacity=".74" />
      </motion.svg>
    </div>
  );
}
