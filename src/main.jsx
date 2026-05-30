import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global scroll-reveal
const REVEAL_SEL = '.reveal, .section-gap .section-header, .section-gap .grid-3, .section-gap .grid-2, .section-gap .card-floating, .section-gap .analytics-grid';

const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.1 }
);

const observeAll = () => document.querySelectorAll(REVEAL_SEL + ':not(.visible)').forEach(el => observer.observe(el));

new MutationObserver(observeAll).observe(document.body, { childList: true, subtree: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
