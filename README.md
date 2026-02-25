<div align="center">
  
```
    ╭──────────────╮
    │      ◉       │
    │  ◯       ◯   │
    │      ●       │
    ╰──────────────╯
```

# ✦ Personality Decoder ✦

</div>

<p align="center">
  <em>Write freely. Understand deeply.</em>
</p>

<p align="center">
  A refined, AI-powered personality analysis experience that transforms your self-written text into meaningful insights about who you are.
</p>

---

## Overview

Personality Decoder is a single-page web application designed for self-reflection and personal discovery. Users write freely about themselves, and the application analyzes their writing patterns to reveal personality traits, communication tendencies, strengths, and growth opportunities.

This is not a clinical assessment tool. It is a contemplative experience — designed to feel like a premium self-discovery product that invites introspection and delivers insights with editorial elegance.

---

## Features

### Core Functionality

- **Free-Form Text Analysis** — Write naturally about yourself without constraints or predefined questions
- **AI-Powered Insights** — Powered by Google Gemini for nuanced, context-aware personality interpretation
- **Trait Scoring** — Four key personality dimensions with visual score indicators
- **Communication Style** — Detailed summary of how you express and connect with others
- **Strengths & Growth Areas** — Balanced perspective on capabilities and opportunities

### Design & Experience

- **Dark & Light Modes** — Elegant themes that respect system preferences with manual toggle
- **Responsive Layout** — Seamlessly adapts from mobile to desktop
- **Refined Typography** — Cormorant Garamond for headings, Inter for body text
- **Smooth Animations** — Staggered reveals, score bar fills, and subtle hover states
- **Minimal Interface** — No clutter, no distractions — pure focused experience

---

## Technology

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Styling | Tailwind CSS |
| AI Model | Google Gemini 2.5 Flash |
| Fonts | Google Fonts (Cormorant Garamond, Inter) |
| Architecture | Single-file component, no build required |

---

## Design Philosophy

### Visual Language

The interface draws inspiration from high-end editorial design — think luxury print magazines, psychological journals, and premium wellness brands. Every element has purpose. Every interaction has weight.

**Color Palette (Dark Mode)**

| Token | Value | Purpose |
|-------|-------|---------|
| Background | `#0a0908` | Deep, warm black |
| Surface | `#141311` | Cards and input areas |
| Border | `#2a2723` | Subtle dividers |
| Text Primary | `#f5f2eb` | Main readable content |
| Text Secondary | `#a8a49c` | Supporting information |
| Accent | `#d4af37` | Gold highlights and interactions |

**Color Palette (Light Mode)**

| Token | Value | Purpose |
|-------|-------|---------|
| Background | `#faf9f7` | Warm off-white |
| Surface | `#ffffff` | Clean white cards |
| Border | `#e8e5df` | Soft dividers |
| Text Primary | `#1a1815` | Deep readable text |
| Text Secondary | `#5c5850` | Supporting content |
| Accent | `#b8962e` | Muted gold accents |

### Motion Principles

All animations are deliberately unhurried. Nothing bounces. Nothing scales aggressively. The motion feels editorial — like turning a page in a thoughtful publication.

- Page elements fade in with subtle vertical translation
- Score bars fill smoothly with eased timing
- Cards lift gently on hover
- Theme transitions occur gracefully

---

## Application States

| State | Description |
|-------|-------------|
| Idle | Landing view with textarea ready for input |
| Loading | API call in progress, interface muted |
| Result | Analysis displayed with animated reveal |
| Error | Graceful error state with retry option |

---

## Output Structure

The analysis returns structured insights across five dimensions:

```
Personality Traits (4)
├── Trait Name
├── Score (1-100)
└── Description

Communication Style
└── 2-3 sentence summary

Strengths (3)
└── Key capabilities

Growth Areas (3)
└── Development opportunities

Summary
└── Single elegant sentence
```

---

## Usage

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Active internet connection
- Valid Google Gemini API key

### Setup

1. Open `index.html` in a code editor
2. Locate the `API_KEY` constant near the top of the script
3. Replace `"YOUR_API_KEY"` with your Gemini API key
4. Open `index.html` in a browser

### Running the Application

Simply open the `index.html` file directly in any modern browser. No build process, no server, no dependencies to install.

---

## File Structure

```
/
├── index.html          Single-file application
├── README.md           Documentation
└── PersonalityDecoder.jsx   React component (for integration)
```

---

## Privacy & Ethics

- **No Data Storage** — Text is analyzed in real-time and never persisted
- **No Tracking** — No analytics, cookies, or user tracking
- **Transparent Purpose** — Clearly labeled as reflective, not diagnostic
- **User Control** — All interactions are user-initiated

---

## Disclaimer

This application generates AI-based personality insights from writing patterns. It is designed for personal reflection and entertainment purposes only.

**This is not:**
- A clinical psychological assessment
- A diagnostic or screening tool
- A substitute for professional evaluation
- A basis for decisions about yourself or others

Results should be considered as one perspective among many — a starting point for self-reflection, not a definitive characterization.

---

## Customization

### Changing the AI Model

Update the endpoint URL in the fetch call:

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/YOUR_MODEL:generateContent?key=${API_KEY}`,
  ...
);
```

### Adjusting the Analysis

Modify the `SYSTEM_PROMPT` constant to change:
- Number of traits returned
- Depth of descriptions
- Focus areas (e.g., professional vs. personal)
- Output language and tone

### Theme Customization

Edit the `themes` object to adjust colors:

```javascript
const themes = {
  dark: {
    background: "#0a0908",
    accent: "#d4af37",
    // ... other tokens
  },
  light: {
    background: "#faf9f7",
    accent: "#b8962e",
    // ... other tokens
  }
};
```

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Performance

- **Initial Load** — Under 200KB total (excluding CDN fonts)
- **Time to Interactive** — Under 1 second on modern connections
- **API Response** — Typically 2-4 seconds depending on input length

---

## Acknowledgments

- Typography by Google Fonts
- AI capabilities by Google Gemini
- Styling utilities by Tailwind CSS
- Framework by React

---

<p align="center">
  <sub>Built for thoughtful self-reflection</sub>
</p>

<p align="center">
  <sub>Personality Decoder — 2026</sub>
</p>
