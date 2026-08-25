import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, AtSign } from "lucide-react";

/**
 * MAISON VERA — outfit / ready-to-wear store
 * Visual system matched to reference: dark ink hero w/ radial glow + ghost
 * monogram, cream "about" section with numbered eyebrows, full-bleed
 * lookbook strip, wine CTA band, black footer.
 */

const PRODUCTS = [
  { id: "01", name: "Sculpted Blazer", fabric: "Wool-blend, structured shoulder", price: 248, tone: "a" },
  { id: "02", name: "Silk Slip Dress", fabric: "Bias-cut silk charmeuse", price: 198, tone: "b" },
  { id: "03", name: "Wide-Leg Trouser", fabric: "Tailored wool trouser", price: 165, tone: "c" },
  { id: "04", name: "Draped Midi Skirt", fabric: "Satin-back crepe", price: 142, tone: "d" },
  { id: "05", name: "Cashmere Knit", fabric: "Ribbed cashmere pullover", price: 225, tone: "e" },
  { id: "06", name: "Tailored Trench", fabric: "Cotton gabardine", price: 285, tone: "f" },
];

export default function MaisonVeraSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const rootRef = useRef(null);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  };

  // Gentle fade-up reveal as sections scroll into view.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = rootRef.current
      ? rootRef.current.querySelectorAll(".mv-reveal")
      : [];

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mv-root" ref={rootRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }
        #root, .App {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          text-align: left !important;
          width: 100%;
        }
        .mv-root { width: 100%; min-height: 100vh; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

        .mv-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .mv-reveal.is-visible { opacity: 1; transform: translateY(0); }
        .mv-reveal--1 { transition-delay: 0.06s; }
        .mv-reveal--2 { transition-delay: 0.14s; }
        .mv-reveal--3 { transition-delay: 0.22s; }
        @media (prefers-reduced-motion: reduce) {
          .mv-reveal { transition: none; opacity: 1; transform: none; }
        }

        .mv-root {
          --ink: #17151A;
          --ink-2: #1F1C22;
          --cream: #F1ECE1;
          --gold: #C9A063;
          --wine: #5C2A2E;
          --muted-on-dark: #A69F97;
          --muted-on-light: #726B62;
          --line-dark: rgba(255,255,255,0.12);
          --line-light: rgba(23,21,26,0.12);

          background: var(--cream);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .mv-root * { box-sizing: border-box; margin: 0; padding: 0; }
        .mv-root a { color: inherit; text-decoration: none; }
        .mv-root ul { list-style: none; }
        .mv-root button { font: inherit; cursor: pointer; border: none; background: none; }
        .mv-root :focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        .mv-wrap { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
        .mv-display {
          font-family: 'Anton', sans-serif;
          text-transform: uppercase;
          font-weight: 400;
          letter-spacing: 0.005em;
          line-height: 0.94;
        }
        .mv-eyebrow {
          font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px; font-weight: 600;
        }
        .mv-eyebrow .n { color: var(--gold); font-weight: 700; }

        /* ---------- NAV ---------- */
        .mv-nav {
          position: sticky; top: 0; z-index: 60;
          background: var(--ink); color: var(--cream);
          border-bottom: 1px solid var(--line-dark);
        }
        .mv-nav__row { display: flex; align-items: center; justify-content: space-between; height: 78px; }
        .mv-logo { line-height: 1; }
        .mv-logo .l1 { font-family: 'Anton', sans-serif; font-size: 20px; letter-spacing: 0.03em; text-transform: uppercase; }
        .mv-logo .l2 { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold); margin-top: 3px; }
        .mv-links { display: flex; gap: 30px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; }
        .mv-links a { opacity: 0.85; transition: opacity .2s ease, color .2s ease; }
        .mv-links a:hover { opacity: 1; color: var(--gold); }
        .mv-burger { display: none; color: var(--cream); }
        .mv-mobile { display: none; }
        @media (max-width: 900px) {
          .mv-links { display: none; }
          .mv-burger { display: block; }
          .mv-mobile.is-open {
            display: flex; flex-direction: column; gap: 18px;
            padding: 22px 32px 28px; border-top: 1px solid var(--line-dark);
            font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600;
          }
        }

        /* ---------- HERO ---------- */
        .mv-hero {
          position: relative; background: var(--ink); color: var(--cream);
          padding: 90px 0 120px; overflow: hidden;
        }
        .mv-hero__glow {
          position: absolute; top: -10%; right: -8%; width: 640px; height: 640px;
          background: radial-gradient(circle, rgba(201,160,99,0.22) 0%, rgba(23,21,26,0) 70%);
          pointer-events: none;
        }
        .mv-hero__mono {
          position: absolute; right: 2%; top: 8%;
          font-family: 'Anton', sans-serif; font-size: clamp(160px, 22vw, 340px);
          color: rgba(255,255,255,0.035); letter-spacing: 0.02em; user-select: none;
          pointer-events: none; line-height: 1;
        }
        .mv-hero__inner { position: relative; display: grid; grid-template-columns: 1.4fr 0.8fr; gap: 40px; align-items: end; }
        .mv-h1 { font-size: clamp(52px, 8.4vw, 118px); }
        .mv-h1 .gold { color: var(--gold); }
        .mv-hero__copy p {
          margin-top: 26px; max-width: 46ch; color: var(--muted-on-dark); font-size: 16px; line-height: 1.6;
        }
        .mv-hero__cta { display: flex; align-items: center; gap: 22px; margin-top: 34px; flex-wrap: wrap; }
        .mv-btn {
          font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;
          padding: 16px 26px; background: var(--cream); color: var(--ink);
          display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s ease, color .2s ease, transform .15s ease;
        }
        .mv-btn:hover { background: var(--gold); transform: translateY(-1px); }
        .mv-btn--outline {
          background: transparent; color: var(--cream); padding: 0; font-weight: 600;
          border-bottom: 1px solid var(--line-dark);
        }
        .mv-btn--outline:hover { color: var(--gold); border-color: var(--gold); }
        .mv-btn--dark {
          background: var(--ink); color: var(--cream);
        }
        .mv-btn--dark:hover { background: var(--wine); color: var(--cream); }

        .mv-feature-card {
          background: var(--cream); color: var(--ink);
          padding: 26px 26px 30px; max-width: 260px; justify-self: end;
        }
        .mv-feature-card .mv-eyebrow { color: var(--wine); }
        .mv-feature-card h3 { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: 26px; margin-top: 12px; line-height: 1; }

        .mv-scroll {
          position: absolute; right: 26px; bottom: 40px;
          writing-mode: vertical-rl; font-size: 11px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--muted-on-dark); display: flex;
          align-items: center; gap: 10px;
        }
        .mv-scroll::after { content: ''; width: 1px; height: 50px; background: var(--muted-on-dark); }

        @media (max-width: 900px) {
          .mv-hero__inner { grid-template-columns: 1fr; }
          .mv-feature-card { justify-self: start; margin-top: 26px; }
          .mv-scroll { display: none; }
          .mv-hero__mono { top: auto; bottom: 4%; right: -6%; }
        }

        /* ---------- SECTION generic ---------- */
        .mv-section { padding: 100px 0; }
        .mv-section__head { max-width: 680px; margin-bottom: 48px; }
        .mv-section__head h2 { margin-top: 16px; }
        .mv-section__head p { margin-top: 18px; color: var(--muted-on-light); font-size: 16px; line-height: 1.6; max-width: 56ch; }

        /* ---------- ABOUT (cream) ---------- */
        .mv-about h2 { font-size: clamp(38px, 6vw, 76px); }
        .mv-about h2 .wine { color: var(--wine); }
        .mv-about .mv-eyebrow .n { color: var(--gold); }
        .mv-about .mv-eyebrow span.label { color: var(--wine); }

        /* ---------- SHOP GRID ---------- */
        .mv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        @media (max-width: 900px) { .mv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .mv-grid { grid-template-columns: 1fr; } }

        .mv-card { background: var(--ink); color: var(--cream); position: relative; overflow: hidden; }
        .mv-card__art { height: 300px; position: relative; }
        .mv-card__art--a { background: linear-gradient(160deg, #3A3440 0%, #17151A 100%); }
        .mv-card__art--b { background: linear-gradient(160deg, #6B4148 0%, #17151A 100%); }
        .mv-card__art--c { background: linear-gradient(160deg, #4A4238 0%, #17151A 100%); }
        .mv-card__art--d { background: linear-gradient(160deg, #5C2A2E 0%, #17151A 100%); }
        .mv-card__art--e { background: linear-gradient(160deg, #8A7355 0%, #17151A 100%); }
        .mv-card__art--f { background: linear-gradient(160deg, #2E2C33 0%, #17151A 100%); }
        .mv-card__id {
          position: absolute; top: 14px; left: 14px; font-size: 11px; letter-spacing: 0.1em;
          color: var(--gold); font-weight: 700;
        }
        .mv-card__overlay {
          position: absolute; inset: 0; display: flex; align-items: flex-end;
          padding: 18px; opacity: 0; transition: opacity .25s ease;
          background: linear-gradient(180deg, rgba(23,21,26,0) 40%, rgba(23,21,26,0.85) 100%);
        }
        .mv-card:hover .mv-card__overlay { opacity: 1; }
        .mv-card__overlay span { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
        .mv-card__face { padding: 18px 18px 20px; display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--line-dark); }
        .mv-card__name { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: 17px; letter-spacing: 0.01em; }
        .mv-card__price { font-size: 14px; color: var(--gold); font-weight: 600; }
        .mv-card__fabric { padding: 0 18px 18px; font-size: 12px; color: var(--muted-on-dark); }

        /* ---------- LOOKBOOK (full bleed) ---------- */
        .mv-lookbook { position: relative; background: var(--ink); color: var(--cream); overflow: hidden; }
        .mv-lookbook__label {
          position: absolute; left: 32px; top: 50%; transform: translateY(-50%) rotate(180deg);
          writing-mode: vertical-rl; font-family: 'Anton', sans-serif; font-size: 30px;
          letter-spacing: 0.1em; text-transform: uppercase; z-index: 2; color: var(--cream);
        }
        .mv-lookbook__strip {
          display: grid; grid-template-columns: repeat(3, 1fr); height: 460px;
        }
        .mv-lookbook__panel { position: relative; }
        .mv-lookbook__panel--1 { background: linear-gradient(200deg, #4A3540 0%, #17151A 70%); }
        .mv-lookbook__panel--2 { background: linear-gradient(200deg, #5C2A2E 0%, #17151A 70%); }
        .mv-lookbook__panel--3 { background: linear-gradient(200deg, #6E5A3D 0%, #17151A 70%); }
        .mv-lookbook__caption {
          position: absolute; left: 32px; bottom: 24px; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-on-dark);
        }
        .mv-lookbook__caption b { color: var(--cream); }
        @media (max-width: 700px) {
          .mv-lookbook__strip { grid-template-columns: 1fr; height: auto; }
          .mv-lookbook__panel { height: 220px; }
          .mv-lookbook__label { position: static; writing-mode: horizontal-tb; transform: none; padding: 22px 32px 0; font-size: 22px; }
        }

        /* ---------- CTA (wine) ---------- */
        .mv-cta { background: var(--wine); color: var(--cream); padding: 110px 0; }
        .mv-cta .mv-eyebrow { color: var(--gold); }
        .mv-cta h2 { font-size: clamp(36px, 6vw, 72px); margin-top: 16px; }
        .mv-cta h2 .gold { color: var(--gold); }
        .mv-cta__row { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 30px; margin-top: 34px; }
        .mv-cta p { color: rgba(241,236,225,0.75); max-width: 40ch; font-size: 15px; }

        /* ---------- NEWSLETTER (cream, small) ---------- */
        .mv-news { padding: 70px 0; }
        .mv-news__box { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; border-top: 1px solid var(--line-light); border-bottom: 1px solid var(--line-light); padding: 30px 0; }
        .mv-news h3 { font-family: 'Anton', sans-serif; text-transform: uppercase; font-size: 22px; }
        .mv-form { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
        .mv-form input {
          border: none; border-bottom: 1.5px solid var(--ink); background: transparent;
          font-size: 14px; padding: 8px 4px; outline: none; min-width: 220px; color: var(--ink);
        }
        .mv-joined { font-size: 13px; color: var(--wine); font-weight: 600; }

        /* ---------- FOOTER ---------- */
        .mv-footer { background: var(--ink); color: var(--cream); padding: 64px 0 30px; border-top: 2px solid var(--wine); }
        .mv-footer__grid { display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 30px; }
        .mv-footer .mv-logo .l1 { font-size: 24px; }
        .mv-footer__tag { margin-top: 14px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-on-dark); }
        .mv-footer h4 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px; color: var(--gold); }
        .mv-footer ul li { padding: 6px 0; font-size: 14px; color: var(--muted-on-dark); }
        .mv-footer ul li a:hover { color: var(--cream); }
        .mv-footer__bottom {
          margin-top: 50px; padding-top: 22px; border-top: 1px solid var(--line-dark);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
          font-size: 12px; color: var(--muted-on-dark);
        }
        @media (max-width: 700px) { .mv-footer__grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      {/* NAV */}
      <header className="mv-nav">
        <div className="mv-wrap mv-nav__row">
          <a href="#top" className="mv-logo">
            <div className="l1">MAISON</div>
            <div className="l2">Vera</div>
          </a>
          <nav className="mv-links">
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#lookbook">Lookbook</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="mv-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`mv-mobile ${menuOpen ? "is-open" : ""}`}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#lookbook" onClick={() => setMenuOpen(false)}>Lookbook</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="mv-hero">
        <div className="mv-hero__glow" aria-hidden="true" />
        <div className="mv-hero__mono" aria-hidden="true">MV</div>
        <div className="mv-wrap mv-hero__inner">
          <div className="mv-hero__copy">
            <h1 className="mv-display mv-h1">MAISON<br /><span className="gold">VERA</span></h1>
            <p>
              Contemporary ready-to-wear cut for how you actually move — tailoring
              with give, fabric with weight, nothing that needs a warning label to wear.
            </p>
            <div className="mv-hero__cta">
              <a href="#shop" className="mv-btn">Shop the edit <ArrowUpRight size={14} strokeWidth={2.5} /></a>
              <a href="#lookbook" className="mv-btn mv-btn--outline">See the lookbook</a>
            </div>
          </div>
          <div className="mv-feature-card">
            <span className="mv-eyebrow">Featured</span>
            <h3>The Autumn Edit</h3>
          </div>
        </div>
        <div className="mv-scroll">Scroll</div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mv-wrap mv-section mv-about mv-reveal">
        <span className="mv-eyebrow"><span className="n">01</span> <span className="label">About</span></span>
        <h2 className="mv-display">Clothes made for<br /><span className="wine">movement &amp; mood.</span></h2>
        <p style={{ marginTop: 24, maxWidth: "58ch", color: "var(--muted-on-light)", fontSize: 16, lineHeight: 1.7 }}>
          Maison Vera started as a pattern table in a one-room studio and stayed there
          in spirit — every piece is still fit-tested on real bodies before it's cut for
          the floor. No trend chasing, no disposable seasons. Just clothes built to be
          worn hard and repaired, not replaced.
        </p>
      </section>

      {/* SHOP */}
      <section id="shop" className="mv-wrap mv-section">
        <div className="mv-section__head mv-reveal">
          <span className="mv-eyebrow"><span className="n">02</span> <span style={{ color: "var(--wine)" }}>Shop</span></span>
          <h2 className="mv-display" style={{ fontSize: "clamp(34px, 5vw, 56px)" }}>The current edit.</h2>
          <p>Six pieces, restocked in small runs. Hover a piece to add it to your bag.</p>
        </div>
        <div className="mv-grid mv-reveal mv-reveal--1">
          {PRODUCTS.map((p) => (
            <article className="mv-card" key={p.id}>
              <div className={`mv-card__art mv-card__art--${p.tone}`}>
                <span className="mv-card__id">No. {p.id}</span>
                <div className="mv-card__overlay">
                  <span>Add to bag <ArrowUpRight size={13} strokeWidth={2.5} /></span>
                </div>
              </div>
              <div className="mv-card__face">
                <h3 className="mv-card__name">{p.name}</h3>
                <span className="mv-card__price">${p.price}</span>
              </div>
              <div className="mv-card__fabric">{p.fabric}</div>
            </article>
          ))}
        </div>
      </section>

      {/* LOOKBOOK */}
      <section id="lookbook" className="mv-lookbook mv-reveal">
        <div className="mv-lookbook__label">Lookbook</div>
        <div className="mv-lookbook__strip">
          <div className="mv-lookbook__panel mv-lookbook__panel--1" />
          <div className="mv-lookbook__panel mv-lookbook__panel--2" />
          <div className="mv-lookbook__panel mv-lookbook__panel--3">
            <div className="mv-lookbook__caption"><b>Autumn / Winter</b> — Season 26</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mv-cta mv-reveal">
        <div className="mv-wrap">
          <span className="mv-eyebrow">Connect</span>
          <h2 className="mv-display">LET'S DRESS<br /><span className="gold">SOMETHING BOLD.</span></h2>
          <div className="mv-cta__row">
            <p>For styling requests, wholesale inquiries, and press.</p>
            <a href="#" className="mv-btn">Get in touch <ArrowUpRight size={14} strokeWidth={2.5} /></a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mv-wrap mv-news mv-reveal">
        <div className="mv-news__box">
          <h3>Get first look at new drops.</h3>
          {joined ? (
            <span className="mv-joined">You're on the list.</span>
          ) : (
            <form className="mv-form" onSubmit={handleJoin}>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="mv-btn mv-btn--dark">Join <ArrowUpRight size={14} strokeWidth={2.5} /></button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mv-footer">
        <div className="mv-wrap">
          <div className="mv-footer__grid">
            <div>
              <a href="#top" className="mv-logo"><div className="l1">MAISON</div></a>
              <p className="mv-footer__tag">Ready-to-wear · Styled for life</p>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>
                <li><a href="#shop">New Arrivals</a></li>
                <li><a href="#shop">The Edit</a></li>
                <li><a href="#">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4>Connect</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#lookbook">Lookbook</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Social</h4>
              <ul>
                <li><a href="#"><AtSign size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="mv-footer__bottom">
            <span>© {new Date().getFullYear()} Maison Vera. All rights reserved.</span>
            <span>Designed &amp; cut in-studio.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}