import React, { useState } from 'react';
import './LandingPage.css';

const studios = [
  {
    code: '01',
    title: 'Spatial Systems',
    duration: '8 weeks',
    copy: 'Proportion, grid, and the quiet order of massing. Build a vocabulary of volume before you ever pick a tool.',
  },
  {
    code: '02',
    title: 'Light & Material',
    duration: '6 weeks',
    copy: 'Concrete, timber, glass, and the way daylight cuts a room. Study surfaces the way an architect studies a facade.',
  },
  {
    code: '03',
    title: 'Studio Critique',
    duration: '4 weeks',
    copy: 'Present, defend, and refine. A live atelier where work is judged on clarity of idea, not polish of slides.',
  },
];

const principles = [
  { num: 'I', title: 'Structure first', copy: 'Every course is a load-bearing idea. Ornament comes after the frame is sound.' },
  { num: 'II', title: 'Measured practice', copy: 'Weekly assignments, pinned reviews, and a single finished project you can stand beside.' },
  { num: 'III', title: 'Fewer, better', copy: 'Three studios. No filler modules. Depth over catalogue sprawl.' },
];

const LandingPage = () => {
  const [status, setStatus] = useState('idle');

  const emitEvent = (eventName) => {
    setStatus('sending');
    fetch('http://localhost:8080/producer/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event: eventName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to emit event');
        }
        setStatus('sent');
      })
      .catch((error) => {
        console.error('Error emitting event:', error);
        setStatus('error');
      });
  };

  const handleBuyCourseClick = () => {
    emitEvent('userClick');
  };

  const statusLabel = {
    idle: '',
    sending: 'Registering interest…',
    sent: 'Noted. We will be in touch.',
    error: 'Could not reach the studio desk. Try again.',
  }[status];

  return (
    <div className="lp">
      <a className="lp-skip" href="#enroll">
        Skip to enroll
      </a>

      <header className="lp-nav">
        <a className="lp-mark" href="#top">
          <span className="lp-mark-square" aria-hidden="true" />
          ATELIER
        </a>
        <nav className="lp-links" aria-label="Primary">
          <a href="#studios">Studios</a>
          <a href="#method">Method</a>
          <a href="#enroll">Enroll</a>
        </nav>
        <button type="button" className="lp-nav-cta" onClick={handleBuyCourseClick}>
          Buy a course
        </button>
      </header>

      <main id="top">
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <p className="lp-kicker">Course platform · Est. studio 00</p>
            <h1>
              Form follows
              <em> practice.</em>
            </h1>
            <p className="lp-lede">
              A modern school of making — courses structured like buildings: clear spans, honest materials, and a
              single entrance you actually use.
            </p>
            <div className="lp-hero-actions">
              <button type="button" className="lp-btn-primary" onClick={handleBuyCourseClick}>
                Buy a course
              </button>
              <a className="lp-btn-ghost" href="#studios">
                View the studios
              </a>
            </div>
            {statusLabel ? (
              <p className={`lp-status${status === 'error' ? ' is-error' : ''}`} role="status">
                {statusLabel}
              </p>
            ) : null}
          </div>

          <div className="lp-facade" aria-hidden="true">
            <div className="lp-facade-frame">
              <div className="lp-facade-grid">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className={`lp-window${i % 7 === 0 ? ' is-lit' : ''}`} />
                ))}
              </div>
              <div className="lp-facade-plinth">
                <span>N 40° · W 74°</span>
                <span>Grid 6 × 4</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-metrics" aria-label="Studio facts">
          <div>
            <strong>03</strong>
            <span>Studios in session</span>
          </div>
          <div>
            <strong>18</strong>
            <span>Weeks to a body of work</span>
          </div>
          <div>
            <strong>1:8</strong>
            <span>Mentor to cohort</span>
          </div>
          <div>
            <strong>00</strong>
            <span>Lecture-only tracks</span>
          </div>
        </section>

        <section className="lp-studios" id="studios">
          <div className="lp-section-head">
            <p className="lp-kicker">Programme</p>
            <h2>Three volumes. One campus.</h2>
          </div>
          <ul className="lp-studio-list">
            {studios.map((studio) => (
              <li key={studio.code}>
                <article className="lp-studio">
                  <header>
                    <span className="lp-studio-code">{studio.code}</span>
                    <span className="lp-studio-time">{studio.duration}</span>
                  </header>
                  <h3>{studio.title}</h3>
                  <p>{studio.copy}</p>
                  <button type="button" className="lp-studio-link" onClick={handleBuyCourseClick}>
                    Enroll in this studio
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-method" id="method">
          <div className="lp-method-plan" aria-hidden="true">
            <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="8" width="264" height="184" stroke="currentColor" strokeWidth="1" />
              <rect x="24" y="24" width="120" height="88" stroke="currentColor" strokeWidth="1" />
              <rect x="160" y="24" width="96" height="152" stroke="currentColor" strokeWidth="1" />
              <line x1="24" y1="128" x2="144" y2="128" stroke="currentColor" />
              <line x1="84" y1="128" x2="84" y2="176" stroke="currentColor" />
              <circle cx="84" cy="152" r="10" stroke="currentColor" />
              <text x="32" y="48" fill="currentColor" fontSize="9" letterSpacing="1.4">
                HALL
              </text>
              <text x="172" y="48" fill="currentColor" fontSize="9" letterSpacing="1.4">
                STUDIO
              </text>
            </svg>
          </div>
          <div>
            <p className="lp-kicker">Method</p>
            <h2>A plan you can read at a glance.</h2>
            <ol className="lp-principles">
              {principles.map((item) => (
                <li key={item.num}>
                  <span>{item.num}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lp-enroll" id="enroll">
          <p className="lp-kicker">Enrollment</p>
          <h2>Reserve a seat in the next cohort.</h2>
          <p className="lp-lede">
            One click signals the studio. Same event the insights dashboard already listens for — no extra paperwork on
            this page.
          </p>
          <button type="button" className="lp-btn-primary lp-btn-large" onClick={handleBuyCourseClick}>
            Buy a course
          </button>
        </section>
      </main>

      <footer className="lp-foot">
        <span>Atelier Course Platform</span>
        <span>Port · 3000</span>
      </footer>
    </div>
  );
};

export default LandingPage;
