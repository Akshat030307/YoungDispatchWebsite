import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/feature-hero.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import story4 from "@/assets/story-4.jpg";
import { Search, Menu, ArrowUpRight } from "lucide-react";
import { InkTransition, triggerInkTransition } from "@/components/InkTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Young Dispatch — Issue 01" },
      { name: "description", content: "The Young Dispatch is a youth-led magazine covering politics, culture, music, film, fashion, and more — written by young people, for young people." },
      { property: "og:title", content: "The Young Dispatch" },
      { property: "og:description", content: "Written by young people, for young people." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;0,6..96,900;1,6..96,400;1,6..96,700;1,6..96,900&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Home,
});


const SECTIONS = [
  {
    id: "from-the-editor",
    kicker: "From the Editor & the Team",
    name: "From the Editor",
    description: "A message from the editor and the team behind The Young Dispatch.",
  },
  {
    id: "frontline",
    kicker: "Frontline",
    name: "Frontline",
    description: "Politics, IR, economics, global & national affairs.",
  },
  {
    id: "the-view",
    kicker: "The View",
    name: "The View",
    description: "Editorials & articles written by us & other writers.",
  },
  {
    id: "the-scene",
    kicker: "The Scene",
    name: "The Scene",
    description: "Music, fashion, culture & lifestyle.",
  },
  {
    id: "in-conversation",
    kicker: "In Conversation",
    name: "In Conversation",
    description: "Interviews with the people shaping the world.",
  },
  {
    id: "the-cut",
    kicker: "The Cut",
    name: "The Cut",
    description: "Movie, web series & book reviews.",
  },
  {
    id: "youth-lens",
    kicker: "Youth Lens",
    name: "Youth Lens",
    description: "Personal blogs & essays from young voices.",
  },
];

// Placeholder articles per section
const SECTION_ARTICLES: Record<string, { title: string; author: string; tag: string }[]> = {
  "from-the-editor": [
    { title: "Why we started The Young Dispatch — and what we hope it becomes.", author: "The Editors", tag: "Editor's Letter" },
  ],
  frontline: [
    { title: "The youth vote and why it actually matters this time.", author: "Sana Williams", tag: "Politics" },
    { title: "Gen Alpha's first protest: what they're actually marching for.", author: "Dev Kapoor", tag: "National Affairs" },
    { title: "How a trade war became a TikTok trend.", author: "Priya Mehta", tag: "Economics" },
  ],
  "the-view": [
    { title: "The cherry-red lipstick is back. Blame the group chat.", author: "Lila Tran", tag: "Opinion" },
    { title: "Why everyone's writing letters again.", author: "Arjun Nair", tag: "Culture" },
    { title: "What 'cringe' meant in 2014 vs. now.", author: "Zara Ahmed", tag: "Essay" },
  ],
  "the-scene": [
    { title: "The mixtape is back, and it's burning on red vinyl.", author: "Maya Okonkwo", tag: "Music" },
    { title: "The school cafeteria as a runway.", author: "Devon Pierce", tag: "Fashion" },
    { title: "Inside the messy, brilliant economy of the high-school finsta.", author: "Lila Tran", tag: "Internet Culture" },
  ],
  "in-conversation": [
    { title: "The 17-year-old running a magazine from her bedroom.", author: "Staff", tag: "Interview" },
    { title: "Three friends, one camera, a thousand miles.", author: "Staff", tag: "Interview" },
  ],
  "the-cut": [
    { title: "The note-taking app that's actually a diary — a review.", author: "Arjun Nair", tag: "Tech" },
    { title: "A red so loud it counts as a personality: reviewing the season's best.", author: "Priya Mehta", tag: "Books" },
  ],
  "youth-lens": [
    { title: "I quit TikTok for a week. Here's what happened.", author: "Zara Ahmed", tag: "Personal Essay" },
    { title: "First-time voters tell us what scares them.", author: "Various", tag: "Blog" },
    { title: "A pair of cargos that survived prom.", author: "Dev Kapoor", tag: "Personal Essay" },
  ],
};

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`leading-none ${className}`} style={{ fontFamily: "inherit" }}>
      <span className="flex items-baseline gap-[0.35em]">
        <span className="italic text-[color:var(--ink)]" style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 900 }}>
          THE
        </span>
        <span className="not-italic text-[color:var(--brand)]" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "-0.01em" }}>
          YOUNG
        </span>
        <span className="italic text-[color:var(--ink)]" style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 900 }}>
          DISPATCH
        </span>
      </span>
    </Link>
  );
}

function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`leading-none ${className}`} style={{ fontFamily: "inherit" }}>
      <span className="flex flex-col leading-[0.95]">
        <span className="italic text-white" style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 900 }}>
          THE
        </span>
        <span className="not-italic text-[color:var(--brand)]" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "-0.01em" }}>
          YOUNG
        </span>
        <span className="italic text-white" style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontWeight: 900 }}>
          DISPATCH
        </span>
      </span>
    </Link>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <InkTransition />

      {/* ── Utility bar ── */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Issue 01 · Volume 1</span>
        </div>
      </div>

      {/* ── Masthead ── */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-8">

          {/* Left — Logo */}
          <div className="flex items-center gap-3">
            <button aria-label="Menu" className="md:hidden"><Menu className="h-6 w-6" /></button>
            <Logo className="text-3xl sm:text-4xl md:text-5xl" />
          </div>

          {/* Right — tagline + newsletter + search */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--brand)]">Written by the young.</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">For anyone paying attention.</span>
            </div>
            <a
              href="#newsletter"
              className="hidden sm:inline-flex items-center gap-2 bg-[color:var(--brand)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:opacity-90 transition-opacity"
            >
              Newsletter
            </a>
            <button aria-label="Search"><Search className="h-5 w-5" /></button>
          </div>

        </div>

        {/* Section nav — the 7 dispatch sections */}
        <nav className="border-t border-border bg-[color:var(--ink)]">
          <ul className="mx-auto flex max-w-[1400px] items-center gap-8 overflow-x-auto px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  className="whitespace-nowrap hover:text-[color:var(--brand)] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    triggerInkTransition(s.name, s.id);
                  }}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ── Breaking marquee ── */}
      <div className="border-b border-border bg-[color:var(--brand)] py-2 text-white">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee text-[12px] font-bold uppercase tracking-[0.25em]">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex shrink-0">
                {[
                  "Issue 01 out now — read the editor's letter",
                  "Frontline: the youth vote in 2025",
                  "The Scene: red vinyl is having a moment",
                  "In Conversation: the 17-year-old running her own mag",
                  "Youth Lens: I quit TikTok for a week",
                  "Submit your pitch — link in bio",
                ].map((t, j) => (
                  <span key={j} className="px-8">
                    {t} <span className="opacity-60">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO / Cover ── */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <a href="#" className="group block">
              <img
                src={heroImg}
                alt="Five Gen Z friends in colourful streetwear on a rooftop at golden hour"
                width={1280}
                height={1600}
                className="aspect-[4/5] w-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <span className="mb-4 inline-block w-fit bg-[color:var(--brand)] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-white">
              The Cover · Issue 01
            </span>
            <h1 className="font-serif text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">
              The teenagers{" "}
              <span className="text-[color:var(--brand)]">rewriting</span> the
              rules of cool — one rooftop at a time.
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-muted-foreground">
              Five friends, one borrowed rooftop, and a wardrobe stitched
              together from their group chat. Inside the new face of youth style.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>By Maya Okonkwo</span>
              <span>·</span>
              <span>12 min read</span>
            </div>
            <a
              href="#"
              className="mt-8 inline-flex w-fit items-center gap-2 border border-[color:var(--ink)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[color:var(--ink)] hover:text-white"
            >
              Read the cover story <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FROM THE EDITOR ── */}
      <section id="from-the-editor" className="border-b border-border bg-[color:var(--ink)] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-16">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--brand)]">
            From the Editor &amp; the Team
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-4xl font-black leading-tight sm:text-5xl">
                Why we started The Young Dispatch — and what we hope it becomes.
              </h2>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-white/70">
                We started this because we were tired of reading about ourselves written by people who weren't us. The Young Dispatch is a space for young writers, thinkers, creators and troublemakers to say what they actually mean — loudly, clearly, and without waiting for permission.
              </p>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-white/70">
                Issue 01 is just the beginning. Every section you'll find here — from Frontline to Youth Lens — is a bet that young people have something worth saying, and that the world is better when it listens.
              </p>
              <div className="mt-8 flex items-center gap-4 text-[12px] uppercase tracking-[0.2em] text-white/50">
                <span>The Editors</span>
                <span>·</span>
                <span>Issue 01</span>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 border border-white/40 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.25em] text-white hover:border-white hover:bg-white hover:text-[color:var(--ink)]"
              >
                Read the full letter <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-col justify-center gap-6 lg:col-span-5">
              <blockquote className="border-l-2 border-[color:var(--brand)] pl-6 font-serif text-2xl italic leading-snug text-white/90">
                "We're not the future of culture. We{" "}
                <span className="not-italic text-[color:var(--brand)]">are</span>{" "}
                the culture — you're just late to the group chat."
              </blockquote>
              <p className="pl-6 text-[11px] uppercase tracking-[0.3em] text-white/50">
                — Editor's Letter, Issue 01
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRONTLINE ── */}
      <section id="frontline" className="border-b border-border">
        <SectionHeader kicker="Frontline" title="Politics, IR, economics & global affairs" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-12 px-4 pb-16 md:grid-cols-3">
          <StoryCard
            image={story3}
            kicker="Politics"
            title="The youth vote and why it actually matters this time."
            author="Sana Williams"
          />
          <StoryCard
            image={story2}
            kicker="National Affairs"
            title="Gen Alpha's first protest: what they're actually marching for."
            author="Dev Kapoor"
          />
          <StoryCard
            image={story1}
            kicker="Economics"
            title="How a trade war became a TikTok trend."
            author="Priya Mehta"
          />
        </div>
      </section>

      {/* ── THE VIEW ── */}
      <section id="the-view" className="border-b border-border">
        <SectionHeader kicker="The View" title="Editorials & essays by us and our writers" />
        <div className="mx-auto max-w-[1400px] px-4 pb-16">
          {/* Featured editorial */}
          <div className="grid grid-cols-1 gap-8 border-b border-border pb-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <img
                src={story1}
                alt="The View featured editorial"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">Opinion</span>
              <h3 className="mt-3 font-serif text-3xl font-black leading-tight sm:text-4xl">
                What 'cringe' meant in 2014 vs. now — and why that shift matters.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The word has done a full 180. Once a weapon, now almost a term of endearment. Tracing how a generation reclaimed its most embarrassing label.
              </p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">By Zara Ahmed · 8 min read</p>
              <a href="#" className="mt-6 inline-flex w-fit items-center gap-2 border border-[color:var(--ink)] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[color:var(--ink)] hover:text-white">
                Read essay <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          {/* More editorials */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-12 md:grid-cols-2">
            {SECTION_ARTICLES["the-view"].slice(0, 2).map((a) => (
              <article key={a.title} className="group border-b border-border pb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">{a.tag}</span>
                <h4 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:text-[color:var(--brand)] md:text-2xl">
                  <a href="#">{a.title}</a>
                </h4>
                <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">By {a.author}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SCENE ── */}
      <section id="the-scene" className="border-b border-border">
        <SectionHeader kicker="The Scene" title="Music, fashion, culture & lifestyle" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-12 px-4 pb-16 md:grid-cols-3">
          <StoryCard
            image={story4}
            kicker="Music"
            title="The mixtape is back, and it's burning on red vinyl."
            author="Maya Okonkwo"
          />
          <StoryCard
            image={story1}
            kicker="Fashion"
            title="The school cafeteria as a runway."
            author="Devon Pierce"
          />
          <StoryCard
            image={story2}
            kicker="Internet Culture"
            title="Inside the messy, brilliant economy of the high-school finsta."
            author="Lila Tran"
          />
        </div>
      </section>

      {/* ── IN CONVERSATION ── */}
      <section id="in-conversation" className="border-b border-border bg-[#fafaf5]">
        <SectionHeader kicker="In Conversation" title="Interviews with people shaping the world" />
        <div className="mx-auto max-w-[1400px] px-4 pb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Interview 1 */}
            <article className="group grid grid-cols-[auto_1fr] gap-6 border-b border-border pb-8 md:border-b-0 md:pb-0">
              <div className="h-24 w-24 shrink-0 overflow-hidden bg-[color:var(--brand)]/10">
                <img src={story3} alt="Interview" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">Interview</span>
                <h3 className="mt-1 font-serif text-xl font-bold leading-snug group-hover:text-[color:var(--brand)]">
                  <a href="#">The 17-year-old running a magazine from her bedroom.</a>
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">By Staff · 10 min read</p>
              </div>
            </article>
            {/* Interview 2 */}
            <article className="group grid grid-cols-[auto_1fr] gap-6">
              <div className="h-24 w-24 shrink-0 overflow-hidden bg-[color:var(--brand)]/10">
                <img src={story2} alt="Interview" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">Interview</span>
                <h3 className="mt-1 font-serif text-xl font-bold leading-snug group-hover:text-[color:var(--brand)]">
                  <a href="#">Three friends, one camera, a thousand miles.</a>
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">By Staff · 7 min read</p>
              </div>
            </article>
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 border border-[color:var(--ink)] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.25em] hover:bg-[color:var(--ink)] hover:text-white">
              All interviews <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── THE CUT ── */}
      <section id="the-cut" className="border-b border-border">
        <SectionHeader kicker="The Cut" title="Movies, web series & book reviews" />
        <div className="mx-auto max-w-[1400px] px-4 pb-16">
          <ol className="divide-y divide-border">
            {[
              { title: "Adolescence (Netflix, 2025) — a review", tag: "Web Series", rating: "9/10", author: "Priya Mehta" },
              { title: "The Anxious Generation — what the book gets right (and wrong)", tag: "Book", rating: "7/10", author: "Arjun Nair" },
              { title: "I Saw the TV Glow — the horror film that understands teenagers", tag: "Film", rating: "10/10", author: "Zara Ahmed" },
              { title: "A red so loud it counts as a personality: the season's best reads", tag: "Books", rating: "8/10", author: "Dev Kapoor" },
            ].map((item, i) => (
              <li key={i} className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-5">
                <span className="font-display text-3xl text-[color:var(--brand)] md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <a href="#" className="font-serif text-lg font-bold group-hover:text-[color:var(--brand)] md:text-xl">
                    {item.title}
                  </a>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.tag} · By {item.author}
                  </p>
                </div>
                <span className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--brand)] sm:block">
                  {item.rating}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── YOUTH LENS ── */}
      <section id="youth-lens" className="border-b border-border">
        <SectionHeader kicker="Youth Lens" title="Personal blogs & essays from young voices" />
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-12 px-4 pb-16 md:grid-cols-3">
          <StoryCard
            image={story2}
            kicker="Personal Essay"
            title="I quit TikTok for a week. Here's what happened."
            author="Zara Ahmed"
          />
          <StoryCard
            image={story3}
            kicker="Blog"
            title="First-time voters tell us what scares them."
            author="Various"
          />
          <StoryCard
            image={story1}
            kicker="Personal Essay"
            title="A pair of cargos that survived prom."
            author="Dev Kapoor"
          />
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="border-b border-border bg-[color:var(--brand)] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
              The Dispatch, in your inbox
            </span>
            <h2 className="mt-3 font-serif text-4xl font-black leading-tight sm:text-5xl">
              Every Friday. No filler. All signal.
            </h2>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-center gap-3">
            <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
              Your email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                type="email"
                placeholder="you@school.edu"
                className="flex-1 border-2 border-white bg-transparent px-4 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="border-2 border-white bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)] hover:bg-transparent hover:text-white"
              >
                Subscribe
              </button>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
              Free. Unsubscribe whenever. We won't be weird about it.
            </p>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[color:var(--ink)] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
            <div>
              <FooterLogo className="text-3xl md:text-4xl" />
              <p className="mt-4 max-w-sm text-sm text-white/60">
                A magazine for the loudest, brightest, most online generation alive. Made by young people, for young people.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-[12px] uppercase tracking-[0.2em] sm:grid-cols-3">
              <div>
                <h4 className="mb-3 font-bold text-[color:var(--brand)]">Sections</h4>
                <ul className="space-y-2 text-white/70">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="hover:text-white">{s.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-bold text-[color:var(--brand)]">About</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#about" className="hover:text-white">About Us</a></li>
                  <li><a href="#vision" className="hover:text-white">Our Vision</a></li>
                  <li><a href="#" className="hover:text-white">Pitch Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-bold text-[color:var(--brand)]">Follow</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">TikTok</a></li>
                  <li><a href="#" className="hover:text-white">YouTube</a></li>
                  <li><a href="#" className="hover:text-white">Substack</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-[11px] uppercase tracking-[0.25em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} The Young Dispatch</span>
            <span>Printed loudly on the internet.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--brand)]">{kicker}</span>
          <h2 className="mt-2 font-serif text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{title}</h2>
        </div>
        <a href="#" className="text-[12px] font-bold uppercase tracking-[0.25em] hover:text-[color:var(--brand)]">
          View all →
        </a>
      </div>
    </div>
  );
}

function StoryCard({
  image, kicker, title, author,
}: { image: string; kicker: string; title: string; author: string }) {
  return (
    <article className="group flex flex-col">
      <a href="#" className="overflow-hidden">
        <img
          src={image}
          alt={title}
          width={1024}
          height={1280}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </a>
      <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--brand)]">{kicker}</span>
      <h3 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:text-[color:var(--brand)] md:text-2xl">
        <a href="#">{title}</a>
      </h3>
      <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">By {author}</p>
    </article>
  );
}