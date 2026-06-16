import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const foundations = [
  {
    title: "Mobile-first platform shell",
    description: "Ready for a premium matrimonial experience built around family-friendly flows.",
    icon: Sparkles
  },
  {
    title: "Server-enforced matching rules",
    description: "Prepared for explainable Mool and Gotra prohibition checks in later milestones.",
    icon: ShieldCheck
  },
  {
    title: "Respectful community design",
    description: "Grounded for Maithil Brahmin families across India, Nepal, and the diaspora.",
    icon: HeartHandshake
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container flex min-h-screen flex-col justify-center gap-10 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Milestone 0 foundation
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {foundations.map((item) => (
            <article key={item.title} className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm">
              <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
