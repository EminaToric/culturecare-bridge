# 🌉 CultureCare Bridge

An AI-powered cultural health navigation tool that helps people from diverse backgrounds understand any health topic through the lens of their own culture; ddressing stigma, navigating the healthcare system, and finding community resources.

**Live Demo:** [View Dashboard](https://culturecare-bridge-jobpuw6p6-eminas-projects-5bdaa24f.vercel.app/)

---

## Why I Built This

Healthcare systems were not built with every culture in mind. Language barriers, cultural stigmas, unfamiliar systems, and the gap between traditional beliefs and Western medicine create real obstacles for millions of people trying to get good care.

This tool came from a personal place. As someone who navigated the American healthcare system as an immigrant, I know firsthand how disorienting it can be when the system does not speak your language, literally or culturally.

CultureCare Bridge uses AI to meet people where they are, in the context of their own background, and give them something practical: understanding, language, and a path forward.

---

## What It Does

You type your cultural background and a health topic. The app generates three things:

**Cultural Context & Stigma** — How this health topic is commonly viewed or stigmatized within your cultural community, including the historical, religious, or social roots of those views.

**Navigating the Healthcare System** — Practical, specific tips for advocating for yourself, communicating across cultural differences, involving family, and working with providers who may not share your background.

**Community & Cultural Resources** — Types of organizations, support groups, multilingual services, and culturally competent providers to look for.

---

## Tech Stack

- **React** with Vite
- **Claude API** (Anthropic) for AI-generated responses
- **CSS-in-JS** — no external frameworks
- Deployed on **Vercel**

---

## Running Locally

```bash
git clone https://github.com/EminaToric/culturecare-bridge.git
cd culturecare-bridge
npm install
```

Create a `.env` file in the root:

```
VITE_ANTHROPIC_KEY=your_anthropic_api_key_here
```

Then run:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## A Note on the API Key

This app calls the Claude API directly from the browser. For a portfolio/demo context this is acceptable. For a production application, API calls should be proxied through a backend to keep the key secure.

---

## Disclaimer

CultureCare Bridge provides cultural and educational context only. It is not a substitute for medical advice. Always consult a qualified healthcare provider for medical decisions.

---

## About

Built by **Emina Toric** — data professional with a background in computer science, human development, and healthcare analytics.

[Portfolio](https://eminatoric.github.io) · [LinkedIn](https://linkedin.com/in/emina-toric-msc) · [GitHub](https://github.com/EminaToric)
