"use client";

import { useState, useEffect, useRef } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 60);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const drawGrain = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 10;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };
    drawGrain();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --white:   #ffffff;
          --off:     #f8f6f2;
          --border:  #e5e0d8;
          --ink:     #181612;
          --navy:    #1c2540;
          --orange:  #e8590c;
          --orange2: #f07d35;
          --muted:   #8a8070;
          --light:   #fdf5ee;
        }

        body {
          background: var(--white);
          color: var(--ink);
          font-family: 'IBM Plex Mono', monospace;
          overflow: hidden;
          height: 100vh;
        }

        /* ── grain ── */
        .grain {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 100;
          opacity: 0.3; mix-blend-mode: multiply;
        }

        /* ── layout ── */
        .page {
          position: relative;
          height: 100vh;
          display: grid;
          grid-template-columns: 55% 45%;
          overflow: hidden;
        }

        /* ── LEFT ── */
        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem 3.5rem;
          background: var(--white);
          border-right: 1px solid var(--border);
          z-index: 2;
        }

        /* logo */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : -12}px);
          transition: all 0.8s cubic-bezier(0.22,1,0.36,1);
        }

        .logo-icon {
          width: 42px; height: 42px;
          background: var(--orange);
          position: relative;
          clip-path: polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%);
          flex-shrink: 0;
        }

        .logo-icon::after {
          content: 'K';
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          color: #fff;
          padding-bottom: 4px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-name {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 1.35rem;
          letter-spacing: 0.12em;
          color: var(--navy);
          text-transform: uppercase;
        }

        .logo-sub {
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 3px;
        }

        /* hero text */
        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 0;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 1.8rem;
          opacity: ${mounted ? 1 : 0};
          transform: translateX(${mounted ? 0 : -20}px);
          transition: all 0.8s 0.2s cubic-bezier(0.22,1,0.36,1);
        }

        .tag-bar {
          width: 28px; height: 2px;
          background: var(--orange);
        }

        .headline {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: clamp(3rem, 5.5vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: var(--navy);
          margin-bottom: 0.4rem;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 30}px);
          transition: all 1s 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        .headline-accent {
          color: var(--orange);
          font-style: italic;
          font-family: 'Source Serif 4', serif;
          font-weight: 300;
          text-transform: none;
          letter-spacing: -0.01em;
          display: block;
        }

        .divider-stripe {
          width: 60px; height: 4px;
          background: linear-gradient(90deg, var(--orange), var(--orange2));
          margin: 1.5rem 0;
          opacity: ${mounted ? 1 : 0};
          transform: scaleX(${mounted ? 1 : 0});
          transform-origin: left;
          transition: all 0.8s 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .subtext {
          font-size: 0.74rem;
          line-height: 1.9;
          color: var(--muted);
          max-width: 36ch;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 16}px);
          transition: all 0.9s 0.55s cubic-bezier(0.22,1,0.36,1);
        }

        /* email */
        .bottom {
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 20}px);
          transition: all 0.9s 0.65s cubic-bezier(0.22,1,0.36,1);
        }

        .notify-label {
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.8rem;
        }

        .email-row {
          display: flex;
          max-width: 380px;
          border: 1.5px solid var(--border);
          transition: border-color 0.3s;
        }

        .email-row:focus-within { border-color: var(--orange); }

        .email-input {
          flex: 1;
          background: transparent;
          border: none; outline: none;
          padding: 0.8rem 1rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          color: var(--ink);
          letter-spacing: 0.04em;
        }

        .email-input::placeholder { color: var(--muted); }

        .notify-btn {
          background: var(--orange);
          border: none;
          color: #fff;
          font-family: 'Oswald', sans-serif;
          font-weight: 500;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.8rem 1.4rem;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .notify-btn:hover { background: #c44a08; }

        .success-msg {
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--orange);
          padding: 0.8rem 0;
        }

        .links-row {
          display: flex;
          gap: 1.8rem;
          margin-top: 1.5rem;
        }

        .site-link {
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .site-link:hover { color: var(--orange); }

        /* ── RIGHT ── */
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 3rem 2.5rem;
          background: var(--off);
          z-index: 2;
          gap: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        /* diagonal stripe decoration */
        .right::before {
          content: '';
          position: absolute;
          top: -60px; right: -40px;
          width: 180px; height: 180px;
          background: linear-gradient(135deg, var(--orange) 0%, var(--orange2) 100%);
          opacity: 0.08;
          border-radius: 0;
          transform: rotate(20deg);
        }

        .right::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -30px;
          width: 140px; height: 140px;
          background: var(--navy);
          opacity: 0.05;
          border-radius: 0;
          transform: rotate(-15deg);
        }

        /* countdown */
        .section-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
          text-align: center;
          opacity: ${mounted ? 1 : 0};
          transition: opacity 0.6s 0.3s;
        }

        .countdown-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1.5px solid var(--border);
          width: 100%;
          max-width: 360px;
          opacity: ${mounted ? 1 : 0};
          transform: scale(${mounted ? 1 : 0.96});
          transition: all 0.9s 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .count-cell {
          background: var(--white);
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }

        .count-cell:hover { background: var(--light); }

        .count-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--orange);
          transform: scaleX(0);
          transition: transform 0.35s;
          transform-origin: left;
        }

        .count-cell:hover::before { transform: scaleX(1); }

        .count-num {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: clamp(2.8rem, 4.5vw, 4.5rem);
          line-height: 1;
          color: var(--navy);
          font-variant-numeric: tabular-nums;
        }

        .count-lbl {
          font-size: 0.5rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* progress */
        .progress-wrap {
          width: 100%;
          max-width: 360px;
          opacity: ${mounted ? 1 : 0};
          transform: translateY(${mounted ? 0 : 18}px);
          transition: all 0.9s 0.7s cubic-bezier(0.22,1,0.36,1);
        }

        .progress-head {
          display: flex;
          justify-content: space-between;
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }

        .progress-head span:last-child {
          color: var(--orange);
          font-weight: 500;
        }

        .bar-track {
          height: 3px;
          background: var(--border);
          position: relative;
          overflow: hidden;
        }

        .bar-fill {
          position: absolute;
          top: 0; left: 0; height: 100%;
          width: 72%;
          background: linear-gradient(90deg, var(--navy), var(--orange));
          animation: fillIn 1.6s 1s both cubic-bezier(0.22,1,0.36,1);
        }

        @keyframes fillIn {
          from { width: 0; }
          to   { width: 72%; }
        }

        .status-list {
          margin-top: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .status-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.6rem;
          letter-spacing: 0.05em;
          color: var(--muted);
        }

        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot.done    { background: var(--orange2); }
        .dot.active  { background: var(--orange); animation: pulse 1.5s ease-in-out infinite; }
        .dot.pending { background: var(--border); }

        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:0.4; transform:scale(0.6); }
        }

        /* contact strip */
        .contact-strip {
          width: 100%;
          max-width: 360px;
          border-top: 1px solid var(--border);
          padding-top: 1.2rem;
          display: flex;
          gap: 1.5rem;
          opacity: ${mounted ? 1 : 0};
          transition: opacity 0.9s 0.9s;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .contact-key {
          font-size: 0.48rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .contact-val {
          font-size: 0.62rem;
          color: var(--navy);
          letter-spacing: 0.04em;
        }

        /* BG decoration */
        .bg-deco {
          position: fixed; inset: 0;
          z-index: 0; pointer-events: none;
        }

        .bg-blob-1 {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,89,12,0.07) 0%, transparent 65%);
          top: -180px; left: -80px;
        }

        .bg-blob-2 {
          position: absolute;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(28,37,64,0.05) 0%, transparent 65%);
          bottom: -120px; right: 30%;
        }

        @media (max-width: 820px) {
          .page { grid-template-columns: 1fr; grid-template-rows: auto auto; overflow-y: auto; }
          .left { padding: 2rem; border-right: none; border-bottom: 1px solid var(--border); }
          .right { padding: 2rem; }
          body { overflow: auto; }
        }
      `}</style>

      <canvas ref={canvasRef} className="grain" />

      <div className="bg-deco">
        <div className="bg-blob-1" />
        <div className="bg-blob-2" />
      </div>

      <div className="page">

        {/* ── LEFT ── */}
        <div className="left">

          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-icon" />
            <div className="logo-text">
              <span className="logo-name">Kavalakat</span>
              <span className="logo-sub">Factory &amp; Industry</span>
            </div>
          </div>

          {/* Hero */}
          <div className="hero">
            <div className="tag">
              <span className="tag-bar" />
              Something big is on the way
            </div>

            <h1 className="headline">
              We&apos;re
              <span className="headline-accent">almost</span>
              ready.
            </h1>

            <div className="divider-stripe" />

            <p className="subtext">
              Kavalakat is building something new — a stronger, faster digital experience
              for Kerala&apos;s leading steel &amp; construction materials supplier.
              Be the first to know when we launch.
            </p>
          </div>

          {/* Email + links */}
          <div className="bottom">
            <p className="notify-label">Notify me at launch</p>

            {!submitted ? (
              <form className="email-row" onSubmit={handleSubmit}>
                <input
                  className="email-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="notify-btn" type="submit">Notify me</button>
              </form>
            ) : (
              <p className="success-msg">✓ &nbsp;You&apos;re on the list. We&apos;ll be in touch.</p>
            )}

            <div className="links-row">
              <a href="https://kavalakat.com/contact" className="site-link">Contact</a>
              <a href="https://kavalakat.com/product" className="site-link">Products</a>
              <a href="https://kavalakat.com/about" className="site-link">About</a>
            </div>
          </div>

        </div>

        {/* ── RIGHT ── */}
        <div className="right">

          <p className="section-eyebrow">Launching in</p>

          <div className="countdown-grid">
            {[
              { v: pad(timeLeft.days),    l: "Days" },
              { v: pad(timeLeft.hours),   l: "Hours" },
              { v: pad(timeLeft.minutes), l: "Minutes" },
              { v: pad(timeLeft.seconds), l: "Seconds" },
            ].map(({ v, l }) => (
              <div key={l} className="count-cell">
                <span className="count-num">{v}</span>
                <span className="count-lbl">{l}</span>
              </div>
            ))}
          </div>

          <div className="progress-wrap">
            <div className="progress-head">
              <span>Build progress</span>
              <span>72%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" />
            </div>
            <div className="status-list">
              {[
                { label: "Core architecture",    state: "done" },
                { label: "Product catalogue",    state: "done" },
                { label: "Dealer portal",        state: "done" },
                { label: "Final QA & testing",   state: "active" },
                { label: "Public launch",        state: "pending" },
              ].map(({ label, state }) => (
                <div key={label} className="status-row">
                  <span className={`dot ${state}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-strip">
            <div className="contact-item">
              <span className="contact-key">Phone</span>
              <span className="contact-val">0487 244 0380</span>
            </div>
            <div className="contact-item">
              <span className="contact-key">Email</span>
              <span className="contact-val">info@kavalakat.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-key">HQ</span>
              <span className="contact-val">Thrissur, Kerala</span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
