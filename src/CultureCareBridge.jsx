import { useState } from "react";

const API_URL = "https://api.anthropic.com/v1/messages";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F7F3EE;
    --sand: #EDE4D8;
    --sand-dark: #DDD0C0;
    --terracotta: #C4714A;
    --terra-light: #D4896A;
    --terra-pale: #F0DDD3;
    --sage: #7A8C72;
    --sage-pale: #DDE4DA;
    --blush: #C4908A;
    --blush-pale: #F5EAE8;
    --gold: #C8A86A;
    --gold-pale: #F5EDDA;
    --ink: #1E1B18;
    --ink-light: #4A4540;
    --ink-faint: #9A9088;
    --white: #FDFAF7;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--sand);
    color: var(--ink);
    min-height: 100vh;
    background-image:
      radial-gradient(ellipse at 20% 20%, rgba(196,113,74,0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(122,140,114,0.07) 0%, transparent 50%);
  }

  .cc-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 1rem 4rem;
  }

  .cc-app {
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cc-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0 0.5rem;
  }

  .cc-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cc-logo-icon {
    width: 32px; height: 32px;
    background: var(--terracotta);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
  }

  .cc-logo-text {
    font-family: 'Lora', serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--ink);
  }

  .cc-logo-text em { font-style: italic; color: var(--terracotta); }

  .cc-badge {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
    background: var(--white);
    padding: 0.25rem 0.6rem;
    border-radius: 100px;
    border: 1px solid rgba(0,0,0,0.08);
  }

  .cc-hero-card {
    background: var(--terracotta);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    position: relative;
    overflow: hidden;
  }

  .cc-hero-card::after {
    content: '🌉';
    position: absolute;
    right: 1.25rem;
    bottom: -0.75rem;
    font-size: 5.5rem;
    opacity: 0.12;
    line-height: 1;
  }

  .cc-hero-card h1 {
    font-family: 'Lora', serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
    line-height: 1.3;
    margin-bottom: 0.6rem;
  }

  .cc-hero-card h1 em { font-style: italic; }

  .cc-hero-card p {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.78);
    line-height: 1.65;
    max-width: 320px;
  }

  .cc-card {
    background: var(--white);
    border-radius: 18px;
    padding: 1.5rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .cc-card-title {
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 0.2rem;
  }

  .cc-card-hint {
    font-size: 0.74rem;
    color: var(--ink-faint);
    margin-bottom: 0.85rem;
    line-height: 1.5;
  }

  .cc-input {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1.5px solid rgba(0,0,0,0.09);
    border-radius: 12px;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    resize: none;
    line-height: 1.6;
  }

  .cc-input:focus {
    border-color: var(--terracotta);
    background: var(--white);
  }

  .cc-input::placeholder { color: var(--ink-faint); }

  .cc-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.65rem;
  }

  .cc-chip {
    padding: 0.28rem 0.7rem;
    background: var(--cream);
    color: var(--ink-light);
    font-size: 0.72rem;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 100px;
    transition: all 0.18s;
    font-family: 'DM Sans', sans-serif;
  }

  .cc-chip:hover {
    background: var(--terra-pale);
    color: var(--terracotta);
    border-color: rgba(196,113,74,0.2);
  }

  .cc-chip.selected {
    background: var(--terracotta);
    color: white;
    border-color: var(--terracotta);
  }

  .cc-disclaimer {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    padding: 0.85rem 1rem;
    background: var(--gold-pale);
    border-radius: 12px;
    border: 1px solid rgba(200,168,106,0.2);
    font-size: 0.74rem;
    color: var(--ink-light);
    line-height: 1.55;
  }

  .cc-disclaimer-icon { flex-shrink: 0; margin-top: 0.05rem; }

  .cc-btn {
    width: 100%;
    padding: 1rem;
    background: var(--terracotta);
    color: white;
    border: none;
    border-radius: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 18px rgba(196,113,74,0.32);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .cc-btn:hover:not(:disabled) {
    background: var(--terra-light);
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(196,113,74,0.38);
  }

  .cc-btn:disabled {
    background: var(--sand-dark);
    color: var(--ink-faint);
    cursor: not-allowed;
    box-shadow: none;
  }

  .cc-loading-card {
    background: var(--white);
    border-radius: 18px;
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    text-align: center;
  }

  .cc-spinner {
    width: 40px; height: 40px;
    border: 3px solid var(--sand);
    border-top-color: var(--terracotta);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .cc-loading-card p {
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    font-style: italic;
    color: var(--ink-faint);
  }

  .cc-loading-card small {
    font-size: 0.73rem;
    color: var(--ink-faint);
    opacity: 0.7;
  }

  .cc-result {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cc-result-header {
    background: var(--white);
    border-radius: 18px;
    padding: 1.5rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .cc-result-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--terracotta);
    margin-bottom: 0.3rem;
  }

  .cc-result-title {
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.3;
    margin-bottom: 0.65rem;
  }

  .cc-result-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .cc-tag {
    padding: 0.25rem 0.65rem;
    border-radius: 100px;
    font-size: 0.7rem;
    font-weight: 500;
  }

  .cc-tag.terra { background: var(--terra-pale); color: var(--terracotta); }
  .cc-tag.sage  { background: var(--sage-pale);  color: var(--sage); }
  .cc-tag.gold  { background: var(--gold-pale);  color: #8A6830; }

  .cc-section-card {
    background: var(--white);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .cc-section-top {
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.2s;
  }

  .cc-section-top:hover { opacity: 0.85; }

  .cc-section-card.stigma     .cc-section-top { background: var(--blush-pale); }
  .cc-section-card.navigation .cc-section-top { background: var(--sage-pale); }
  .cc-section-card.resources  .cc-section-top { background: var(--gold-pale); }

  .cc-section-icon { font-size: 1rem; }

  .cc-section-name {
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--ink);
    flex: 1;
  }

  .cc-chevron {
    font-size: 0.65rem;
    color: var(--ink-faint);
    transition: transform 0.25s;
  }

  .cc-section-card.open .cc-chevron { transform: rotate(180deg); }

  .cc-section-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.35s ease;
  }

  .cc-section-card.open .cc-section-body { max-height: 1200px; }

  .cc-section-text {
    padding: 1.25rem;
    font-size: 0.86rem;
    color: var(--ink-light);
    line-height: 1.85;
    white-space: pre-wrap;
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .cc-action-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .cc-action-btn {
    padding: 0.85rem 1rem;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    text-align: center;
  }

  .cc-action-btn.primary {
    background: var(--terracotta);
    color: white;
    box-shadow: 0 3px 12px rgba(196,113,74,0.25);
  }
  .cc-action-btn.primary:hover { background: var(--terra-light); }

  .cc-action-btn.outline {
    background: var(--white);
    color: var(--ink-light);
    border: 1.5px solid rgba(0,0,0,0.1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .cc-action-btn.outline:hover { border-color: var(--terracotta); color: var(--terracotta); }

  .cc-start-over {
    width: 100%;
    padding: 0.85rem;
    border-radius: 12px;
    background: var(--white);
    color: var(--ink-faint);
    border: 1.5px solid rgba(0,0,0,0.08);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .cc-start-over:hover { color: var(--ink-light); border-color: rgba(0,0,0,0.15); }

  .cc-error {
    background: var(--white);
    border-radius: 18px;
    padding: 1.25rem;
    border-left: 3px solid var(--blush);
    font-size: 0.84rem;
    color: var(--ink-light);
    line-height: 1.6;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .cc-footer {
    text-align: center;
    padding-top: 0.5rem;
  }

  .cc-footer p {
    font-size: 0.68rem;
    color: var(--ink-faint);
  }

  .cc-footer a { color: var(--terracotta); text-decoration: none; }

  @media (max-width: 400px) {
    .cc-root { padding: 1.25rem 0.75rem 3rem; }
    .cc-hero-card h1 { font-size: 1.3rem; }
  }
`;

const CULTURE_EXAMPLES = [
  "Bosnian", "Mexican", "Chinese", "Nigerian",
  "Indian", "Somali", "Vietnamese", "Haitian",
  "Korean", "Ethiopian", "Filipino", "Puerto Rican",
];

const HEALTH_EXAMPLES = [
  "Type 2 diabetes", "Depression", "Cancer diagnosis",
  "Mental health therapy", "HIV", "Addiction treatment",
  "Alzheimer's disease", "Chemotherapy",
];

const SYSTEM_PROMPT = `You are CultureCare Bridge, a compassionate and deeply informed cultural health navigator. Your purpose is to help people from diverse cultural backgrounds understand health topics through the lens of their own culture and navigate the healthcare system with confidence.

When given a cultural background and a health topic, you respond in exactly three clearly labeled sections:

SECTION 1 — CULTURAL CONTEXT & STIGMA
Explain how this health topic is commonly viewed, discussed, or stigmatized within the specified cultural community. Be honest, respectful, and nuanced. Acknowledge variation within cultures. Do not stereotype but do address real patterns. Acknowledge the historical, religious, or social roots of these views where relevant.

SECTION 2 — NAVIGATING THE HEALTHCARE SYSTEM
Provide 4-5 specific, practical tips for someone from this cultural background navigating the healthcare system around this topic. Address language barriers, cultural communication styles, how to advocate for yourself, how to bring family members into care, and any specific considerations for this culture's relationship with medical authority.

SECTION 3 — COMMUNITY & CULTURAL RESOURCES
Suggest 4-5 types of resources that would be culturally relevant — community organizations, culturally specific support groups, multilingual resources, faith-based support options, and how to find culturally competent providers. Be specific about what to look for rather than inventing specific URLs.

Always write with warmth, dignity, and deep respect. Never be dismissive of cultural beliefs. This information is educational and supportive, not medical advice.`;

export default function CultureCareBridge() {
  const [culture, setCulture] = useState("");
  const [healthTopic, setHealthTopic] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({ stigma: true, navigation: true, resources: true });
  const [copied, setCopied] = useState(false);

  const canSubmit = culture.trim().length > 1 && healthTopic.trim().length > 2;

  const parseResult = (text) => {
    const s1 = text.match(/SECTION 1[^\n]*\n([\s\S]*?)(?=SECTION 2)/i);
    const s2 = text.match(/SECTION 2[^\n]*\n([\s\S]*?)(?=SECTION 3)/i);
    const s3 = text.match(/SECTION 3[^\n]*\n([\s\S]*?)$/i);
    return {
      stigma:     s1 ? s1[1].trim() : text,
      navigation: s2 ? s2[1].trim() : "",
      resources:  s3 ? s3[1].trim() : "",
    };
  };

  const generate = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
       body: JSON.stringify({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 1000,
  messages: [
    { role: "user", content: `${SYSTEM_PROMPT}\n\nCultural background: ${culture}\nHealth topic: ${healthTopic}` }
  ],
}),
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text) throw new Error("No response");
      setResult({ culture, healthTopic, sections: parseResult(text) });
      setOpenSections({ stigma: true, navigation: true, resources: true });
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));

  const copyAll = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `CultureCare Bridge — ${result.culture} · ${result.healthTopic}\n\n` +
      `CULTURAL CONTEXT & STIGMA\n${result.sections.stigma}\n\n` +
      `NAVIGATING THE SYSTEM\n${result.sections.navigation}\n\n` +
      `COMMUNITY RESOURCES\n${result.sections.resources}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setResult(null);
    setError("");
    setCulture("");
    setHealthTopic("");
  };

  const SECTIONS = [
    { key: "stigma",     type: "stigma",     icon: "🌿", title: "Cultural Context & Stigma" },
    { key: "navigation", type: "navigation", icon: "🧭", title: "Navigating the System" },
    { key: "resources",  type: "resources",  icon: "🤝", title: "Community & Resources" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="cc-root">
        <div className="cc-app">

          <div className="cc-topbar">
            <div className="cc-logo">
              <div className="cc-logo-icon">🌉</div>
              <span className="cc-logo-text">CultureCare <em>Bridge</em></span>
            </div>
            <span className="cc-badge">AI · Claude</span>
          </div>

          {!result && !loading && (
            <>
              <div className="cc-hero-card">
                <h1>Healthcare wasn't built<br /><em>for everyone.</em></h1>
                <p>Get personalized cultural context, system navigation tips, and community resources — through the lens of your own background.</p>
              </div>

              <div className="cc-card">
                <p className="cc-card-title">Your cultural background</p>
                <p className="cc-card-hint">Type freely or tap an example.</p>
                <input
                  className="cc-input"
                  placeholder="e.g. Bosnian, Nigerian, Vietnamese..."
                  value={culture}
                  onChange={e => setCulture(e.target.value)}
                />
                <div className="cc-chips">
                  {CULTURE_EXAMPLES.map(c => (
                    <button key={c} className={`cc-chip ${culture === c ? "selected" : ""}`} onClick={() => setCulture(c)}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="cc-card">
                <p className="cc-card-title">Health topic</p>
                <p className="cc-card-hint">A condition, diagnosis, treatment, or mental health topic.</p>
                <textarea
                  className="cc-input"
                  rows={2}
                  placeholder="e.g. Type 2 diabetes, depression, chemotherapy..."
                  value={healthTopic}
                  onChange={e => setHealthTopic(e.target.value)}
                />
                <div className="cc-chips">
                  {HEALTH_EXAMPLES.map(h => (
                    <button key={h} className={`cc-chip ${healthTopic === h ? "selected" : ""}`} onClick={() => setHealthTopic(h)}>{h}</button>
                  ))}
                </div>
              </div>

              <div className="cc-disclaimer">
                <span className="cc-disclaimer-icon">💡</span>
                <span>Cultural and educational context only. Not medical advice. Always consult a qualified healthcare provider.</span>
              </div>

              <button className="cc-btn" disabled={!canSubmit} onClick={generate}>
                Find My Bridge →
              </button>
            </>
          )}

          {loading && (
            <div className="cc-loading-card">
              <div className="cc-spinner" />
              <p>Building your cultural health bridge...</p>
              <small>Tailored for {culture}</small>
            </div>
          )}

          {error && <div className="cc-error">{error}</div>}

          {result && !loading && (
            <div className="cc-result">
              <div className="cc-result-header">
                <p className="cc-result-eyebrow">Your personalized guide</p>
                <h2 className="cc-result-title">{result.healthTopic}</h2>
                <div className="cc-result-tags">
                  <span className="cc-tag terra">{result.culture}</span>
                  <span className="cc-tag sage">Cultural Context</span>
                  <span className="cc-tag gold">Navigation + Resources</span>
                </div>
              </div>

              {SECTIONS.map(({ key, type, icon, title }) =>
                result.sections[key] ? (
                  <div key={key} className={`cc-section-card ${type} ${openSections[key] ? "open" : ""}`}>
                    <div className="cc-section-top" onClick={() => toggle(key)}>
                      <span className="cc-section-icon">{icon}</span>
                      <span className="cc-section-name">{title}</span>
                      <span className="cc-chevron">▼</span>
                    </div>
                    <div className="cc-section-body">
                      <div className="cc-section-text">{result.sections[key]}</div>
                    </div>
                  </div>
                ) : null
              )}

              <div className="cc-action-row">
                <button className="cc-action-btn primary" onClick={generate}>Regenerate ↺</button>
                <button className="cc-action-btn outline" onClick={copyAll}>{copied ? "Copied!" : "Copy All"}</button>
              </div>
              <button className="cc-start-over" onClick={reset}>← Start Over</button>
            </div>
          )}

          <div className="cc-footer">
            <p>Built by <a href="https://eminatoric.github.io" target="_blank" rel="noreferrer">Emina Toric</a> · Not a substitute for medical advice</p>
          </div>

        </div>
      </div>
    </>
  );
}
