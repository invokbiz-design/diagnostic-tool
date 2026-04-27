import { useState } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:#f7f8fa;overflow-x:hidden;}
.app{font-family:'DM Sans',sans-serif;background:#f7f8fa;min-height:100vh;color:#111827;}

/* ── INTRO ── */
.intro{display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:56px 24px 48px;text-align:center;}
.intro-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#D9501E;margin-bottom:24px;}
.intro-line{width:20px;height:1.5px;background:#D9501E;opacity:.5;}
.intro-title{font-family:'Sora',sans-serif;font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1.1;color:#0f1d38;max-width:520px;margin-bottom:14px;letter-spacing:-.03em;}
.intro-title em{font-style:italic;color:#D9501E;}
.intro-sub{font-size:14px;color:#6b7280;max-width:440px;line-height:1.75;margin-bottom:40px;}
.area-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;width:100%;max-width:640px;margin-bottom:40px;}
.area-pill{background:white;border:1px solid #e8eaed;border-radius:12px;padding:14px 8px;text-align:center;}
.area-icon{font-size:18px;margin-bottom:6px;}
.area-pill-name{font-family:'Sora',sans-serif;font-size:10px;font-weight:600;color:#0f1d38;line-height:1.35;}
.intro-form{display:flex;flex-direction:column;gap:11px;width:100%;max-width:400px;}
.field-wrap{position:relative;width:100%;}
.field{width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid #e8eaed;background:white;font-size:14px;font-family:'DM Sans',sans-serif;color:#0f1d38;outline:none;transition:border-color .18s;}
.field:focus{border-color:#D9501E;}
.field.error{border-color:#ef4444;}
.field-err{font-size:11px;color:#ef4444;margin-top:3px;text-align:left;padding-left:2px;}
.btn-start{background:#D9501E;color:white;border:none;border-radius:10px;padding:14px;font-size:14px;font-family:'Sora',sans-serif;font-weight:700;cursor:pointer;width:100%;transition:background .15s;letter-spacing:-.01em;}
.btn-start:hover{background:#C04418;}
.intro-note{font-size:11.5px;color:#9ca3af;}
.privacy-note{display:flex;align-items:flex-start;gap:8px;background:rgba(15,29,56,.04);border:1px solid rgba(15,29,56,.07);border-radius:10px;padding:12px 14px;text-align:left;}
.privacy-icon{font-size:13px;flex-shrink:0;margin-top:1px;}
.privacy-text{font-size:11px;color:#6b7280;line-height:1.6;}
.privacy-text strong{color:#0f1d38;font-weight:600;}

/* ── LAYOUT ── */
.layout{display:grid;grid-template-columns:220px 1fr;min-height:100vh;}
.sidebar{background:#0f1d38;padding:28px 18px;display:flex;flex-direction:column;}
.sb-brand{display:flex;align-items:center;gap:10px;margin-bottom:36px;}
.sb-brand-box{width:32px;height:32px;background:rgba(217,80,30,.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
.sb-brand-name{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;color:white;}
.sb-section{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:10px;}
.sb-items{display:flex;flex-direction:column;gap:2px;flex:1;}
.sb-item{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;cursor:pointer;transition:background .12s;}
.sb-item.active{background:rgba(217,80,30,.15);}
.sb-item.done{opacity:.65;}
.sb-item.locked{opacity:.3;cursor:default;}
.sb-num{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;}
.sb-num.active{background:#D9501E;color:white;}
.sb-num.done{background:rgba(255,255,255,.12);color:rgba(255,255,255,.5);font-size:9px;}
.sb-num.locked{background:rgba(255,255,255,.06);color:rgba(255,255,255,.25);}
.sb-lbl{font-size:11.5px;color:rgba(255,255,255,.8);line-height:1.3;}
.sb-footer{margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,.07);}
.sb-prog-lbl{font-size:10.5px;color:rgba(255,255,255,.3);margin-bottom:7px;}
.sb-prog-track{height:3px;background:rgba(255,255,255,.08);border-radius:2px;}
.sb-prog-fill{height:3px;background:#D9501E;border-radius:2px;transition:width .3s;}
.sb-user{margin-top:12px;padding:9px 11px;background:rgba(255,255,255,.05);border-radius:8px;border:1px solid rgba(255,255,255,.07);}
.sb-user-name{font-family:'Sora',sans-serif;font-size:11.5px;font-weight:600;color:white;margin-bottom:2px;}
.sb-user-co{font-size:10.5px;color:rgba(255,255,255,.35);}

/* ── MAIN ── */
.main{padding:36px 40px;overflow-y:auto;background:#f7f8fa;}
.area-header{margin-bottom:28px;}
.area-chip{display:inline-flex;align-items:center;gap:7px;padding:5px 13px;border-radius:20px;font-size:11px;font-weight:600;margin-bottom:14px;border:1px solid;font-family:'Sora',sans-serif;}
.area-title{font-family:'Sora',sans-serif;font-size:24px;font-weight:800;color:#0f1d38;margin-bottom:7px;letter-spacing:-.02em;}
.area-desc{font-size:13px;color:#6b7280;line-height:1.65;}
.section-divider{display:flex;align-items:center;gap:10px;margin:24px 0 16px;}
.div-label{font-family:'Sora',sans-serif;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;}
.div-line{flex:1;height:1px;background:#e8eaed;}
.mat-label{color:#0f1d38;}
.pot-label{color:#D9501E;}
.q-list{display:flex;flex-direction:column;gap:12px;margin-bottom:28px;}
.q-card{background:white;border:1px solid #e8eaed;border-radius:12px;padding:16px 18px;}
.q-card.pot{border-left:3px solid #D9501E;}
.q-meta{font-family:'Sora',sans-serif;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#9ca3af;margin-bottom:5px;}
.q-text{font-size:13.5px;color:#0f1d38;line-height:1.6;margin-bottom:13px;}
.q-scale{display:flex;gap:5px;}
.q-btn{flex:1;height:36px;border-radius:8px;border:1.5px solid #e8eaed;background:white;cursor:pointer;font-size:13px;font-weight:600;color:#9ca3af;font-family:'Sora',sans-serif;transition:all .12s;}
.q-btn:hover{border-color:#0f1d38;color:#0f1d38;}
.q-btn.sel-m{background:#0f1d38;border-color:#0f1d38;color:white;}
.q-btn.sel-p{background:#D9501E;border-color:#D9501E;color:white;}
.scale-hints{display:flex;justify-content:space-between;margin-top:4px;}
.scale-hint{font-size:9.5px;color:#9ca3af;}
.area-actions{display:flex;justify-content:space-between;align-items:center;padding-top:8px;flex-wrap:wrap;gap:12px;}
.q-count{font-size:13px;color:#6b7280;}
.q-count strong{color:#0f1d38;font-weight:600;}
.btn-row{display:flex;gap:8px;}
.btn-back{background:white;color:#374151;border:1.5px solid #e8eaed;border-radius:9px;padding:10px 18px;font-size:13px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;}
.btn-back:hover{background:#f0ece6;}
.btn-next{background:#D9501E;color:white;border:none;border-radius:9px;padding:11px 24px;font-size:13px;font-family:'Sora',sans-serif;font-weight:700;cursor:pointer;transition:background .12s;letter-spacing:-.01em;}
.btn-next:hover{background:#C04418;}
.btn-next:disabled{opacity:.35;cursor:default;}

/* ── MOBILE SIDEBAR TOGGLE ── */
.mob-header{display:none;background:#0f1d38;padding:14px 20px;align-items:center;justify-content:space-between;}
.mob-logo{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;color:white;}
.mob-prog{font-size:11px;color:rgba(255,255,255,.4);}

/* ── GATE ── */
.gate{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:48px 24px;text-align:center;}
.gate-icon{width:60px;height:60px;background:rgba(217,80,30,.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 20px;}
.gate-title{font-family:'Sora',sans-serif;font-size:clamp(22px,3vw,30px);font-weight:800;color:#0f1d38;margin-bottom:10px;letter-spacing:-.025em;}
.gate-sub{font-size:14px;color:#6b7280;max-width:400px;margin:0 auto 28px;line-height:1.7;}
.gate-form{display:flex;flex-direction:column;gap:11px;width:100%;max-width:400px;}
.gate-what{display:flex;flex-direction:column;gap:6px;background:white;border:1px solid #e8eaed;border-radius:12px;padding:16px 18px;margin-bottom:4px;text-align:left;}
.gate-what-title{font-family:'Sora',sans-serif;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#D9501E;margin-bottom:6px;}
.gate-what-item{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:#374151;line-height:1.5;}
.gate-what-item::before{content:'✓';color:#D9501E;font-weight:700;flex-shrink:0;font-size:11px;margin-top:2px;}
.gate-confirm{background:white;border:1px solid #e8eaed;border-radius:12px;padding:16px 18px;text-align:left;}
.gate-confirm-title{font-family:'Sora',sans-serif;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#D9501E;margin-bottom:10px;}
.gate-confirm-row{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #f3f4f6;}
.gate-confirm-row:last-child{border-bottom:none;}
.gate-confirm-icon{font-size:13px;width:20px;text-align:center;flex-shrink:0;}
.gate-confirm-val{font-size:13px;color:#0f1d38;font-weight:500;}

/* ── RESULTS ── */
.results-wrap{padding:32px 24px;max-width:900px;margin:0 auto;width:100%;}
.r-eyebrow{font-family:'Sora',sans-serif;font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#D9501E;margin-bottom:12px;display:flex;align-items:center;gap:7px;}
.r-eyebrow::before{content:'';width:18px;height:2px;background:#D9501E;display:inline-block;flex-shrink:0;}
.r-title{font-family:'Sora',sans-serif;font-size:clamp(24px,4vw,36px);font-weight:800;color:#0f1d38;margin-bottom:6px;letter-spacing:-.025em;}
.r-sub{font-size:13px;color:#6b7280;margin-bottom:28px;line-height:1.6;}
.sum-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
.sum-card{background:white;border:1px solid #e8eaed;border-radius:14px;padding:18px 20px;}
.sum-lbl{font-family:'Sora',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;}
.sum-big{font-family:'Sora',sans-serif;font-size:clamp(36px,5vw,52px);font-weight:800;color:#0f1d38;line-height:1;letter-spacing:-.03em;}
.sum-unit{font-size:11.5px;color:#9ca3af;margin-top:4px;}
.sum-stage{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;margin-top:8px;}
.two-up{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.panel{background:white;border:1px solid #e8eaed;border-radius:14px;padding:20px 22px;}
.panel-title{font-family:'Sora',sans-serif;font-size:12.5px;font-weight:700;color:#0f1d38;margin-bottom:3px;}
.panel-sub{font-size:11px;color:#9ca3af;margin-bottom:16px;}
.pi-rows{display:flex;flex-direction:column;gap:12px;}
.pi-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;flex-wrap:wrap;gap:4px;}
.pi-name{font-size:12px;color:#374151;}
.pi-vals{display:flex;gap:8px;font-size:11px;}
.pi-m{color:#9ca3af;}
.pi-p{font-weight:600;}
.pi-track{height:9px;background:#f3f0eb;border-radius:5px;position:relative;overflow:hidden;}
.pi-bar-m{position:absolute;top:0;left:0;height:9px;border-radius:5px;opacity:.2;transition:width .6s ease;}
.pi-bar-p{position:absolute;top:1.5px;left:0;height:6px;border-radius:3px;transition:width .7s ease .1s;}
.quadrant-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
.report-panel{background:white;border:1px solid #e8eaed;border-radius:14px;padding:24px;margin-bottom:24px;}
.rp-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;flex-wrap:wrap;gap:10px;}
.rp-title{font-family:'Sora',sans-serif;font-size:18px;font-weight:800;color:#0f1d38;letter-spacing:-.02em;}
.rp-badge{font-family:'Sora',sans-serif;font-size:10.5px;font-weight:600;color:#9ca3af;background:#f7f8fa;border:1px solid #e8eaed;border-radius:6px;padding:4px 10px;white-space:nowrap;}
.rp-body{font-size:13.5px;color:#374151;line-height:1.85;white-space:pre-wrap;}
.rp-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:40px 0;}
.spinner{width:26px;height:26px;border:2.5px solid #e8eaed;border-top-color:#D9501E;border-radius:50%;animation:spin .8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.rp-loading-txt{font-size:13px;color:#9ca3af;}
.r-actions{display:flex;gap:12px;flex-wrap:wrap;}
.btn-ghost{background:transparent;border:1.5px solid #e8eaed;color:#374151;border-radius:9px;padding:11px 20px;font-size:13px;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;transition:background .12s;}
.btn-ghost:hover{background:#f0ece6;}
.btn-cta{background:#D9501E;color:white;border:none;border-radius:9px;padding:11px 26px;font-size:13px;font-family:'Sora',sans-serif;font-weight:700;cursor:pointer;transition:background .12s;letter-spacing:-.01em;}
.btn-cta:hover{background:#C04418;}

/* ════════════════════════════════
   RESPONSIVE BREAKPOINTS
════════════════════════════════ */
@media(max-width:900px){
  .two-up{grid-template-columns:1fr;}
  .quadrant-grid{grid-template-columns:repeat(3,1fr);}
  .sum-row{grid-template-columns:repeat(3,1fr);}
}
@media(max-width:768px){
  .layout{grid-template-columns:1fr;}
  .sidebar{display:none;}
  .mob-header{display:flex;}
  .main{padding:24px 20px;}
  .area-title{font-size:20px;}
  .q-text{font-size:13px;}
  .q-scale{gap:4px;}
  .q-btn{font-size:12px;}
  .results-wrap{padding:24px 16px;}
  .sum-row{grid-template-columns:1fr 1fr;gap:10px;}
  .sum-card:last-child{grid-column:1/-1;}
  .quadrant-grid{grid-template-columns:repeat(2,1fr);}
  .r-actions{justify-content:stretch;}
  .btn-ghost,.btn-cta{flex:1;text-align:center;}
}
@media(max-width:480px){
  .intro{padding:40px 16px 40px;}
  .area-grid{grid-template-columns:repeat(3,1fr);}
  .area-pill:nth-child(4),.area-pill:nth-child(5){grid-column:auto;}
  .sum-row{grid-template-columns:1fr;}
  .sum-card:last-child{grid-column:auto;}
  .two-up{grid-template-columns:1fr;}
  .quadrant-grid{grid-template-columns:1fr 1fr;}
  .results-wrap{padding:20px 14px;}
  .report-panel{padding:18px 16px;}
  .rp-body{font-size:13px;}
  .r-title{font-size:24px;}
  .intro-title{font-size:28px;}
  .section-divider{flex-wrap:wrap;gap:6px;}
  .section-divider span:last-child{display:none;}
  .gate{padding:36px 16px;}
}
@media(max-width:360px){
  .q-btn{font-size:11px;height:32px;}
  .area-grid{grid-template-columns:repeat(2,1fr);}
  .btn-next,.btn-start{font-size:13px;}
  .quadrant-grid{grid-template-columns:1fr;}
}
`;

const AREAS = [
  { id:"ta",  label:"Talent Acquisition & Hiring", icon:"🎯", color:"#D9501E", bg:"#FDE8DC", border:"#f4b89a", text:"#C04418", short:"Talent Acq.", desc:"Sourcing, screening, interviewing, and hiring workflows, tools, and metrics." },
  { id:"ops", label:"HR Operations & Payroll",      icon:"⚙️", color:"#0f1d38", bg:"#e8eaed", border:"#c4c8cf", text:"#0f1d38", short:"HR Ops",      desc:"Transactional HR, payroll accuracy, compliance, and employee self-service." },
  { id:"pm",  label:"Performance Management",       icon:"📈", color:"#D9501E", bg:"#FDE8DC", border:"#f4b89a", text:"#C04418", short:"Performance",  desc:"Goal-setting, feedback cycles, performance calibration, and decisions." },
  { id:"ld",  label:"Learning & Development",       icon:"🧠", color:"#0f1d38", bg:"#e8eaed", border:"#c4c8cf", text:"#0f1d38", short:"L&D",          desc:"Skilling, development programs, learning infrastructure, and impact tracking." },
  { id:"tm",  label:"Talent Management",            icon:"🌱", color:"#D9501E", bg:"#FDE8DC", border:"#f4b89a", text:"#C04418", short:"Talent Mgmt",  desc:"Talent segmentation, succession planning, internal mobility, and retention." },
];

const QUESTIONS = {
  ta:{
    maturity:[
      {q:"Job descriptions follow a standardized, bias-reviewed template and are regularly updated to reflect role evolution.", label:"JD quality"},
      {q:"We use structured, competency-based interviews with defined scoring rubrics applied consistently across all roles.", label:"Interview structure"},
      {q:"TA metrics — time-to-hire, source of hire, offer acceptance rate, quality-of-hire — are tracked and actioned.", label:"TA analytics"},
      {q:"Candidate experience is intentionally designed, actively measured (e.g., NPS), and continuously improved.", label:"Candidate experience"},
    ],
    potential:[
      {q:"We have sufficient historical hiring data (volume, outcomes, tenure, performance) that could inform or train predictive tools.", label:"Data depth"},
      {q:"We've piloted or are evaluating AI-assisted sourcing, resume screening, assessments, or interview scheduling.", label:"Tool exploration"},
      {q:"Our ATS supports integrations or APIs that would allow AI tools to connect to our hiring stack.", label:"Tech compatibility"},
      {q:"Leadership sees TA as a strategic investment area where AI-driven ROI improvement is a credible goal.", label:"Investment appetite"},
    ],
  },
  ops:{
    maturity:[
      {q:"Payroll runs with consistently minimal errors, exceptions, and manual corrections each cycle.", label:"Payroll accuracy"},
      {q:"HR transactions (onboarding, transfers, exits, promotions) follow documented workflows executed consistently.", label:"Process discipline"},
      {q:"Employees use a self-service portal for common HR queries and transactions, reducing HR team load.", label:"Self-service adoption"},
      {q:"Compliance obligations (statutory, regulatory, audit) are managed proactively — not reactively.", label:"Compliance posture"},
    ],
    potential:[
      {q:"Our HR data is centralized, consistently structured, and sufficiently clean to support automation logic.", label:"Data readiness"},
      {q:"High-volume, repetitive HR transactions consume disproportionate team bandwidth and are prone to human error.", label:"Automation opportunity"},
      {q:"We can quantify the cost — in time or FTE — of manual HR operations, creating a measurable ROI case for automation.", label:"ROI visibility"},
      {q:"There is leadership appetite to redirect HR Operations team capacity toward more strategic, value-adding work.", label:"Change readiness"},
    ],
  },
  pm:{
    maturity:[
      {q:"We run a consistent, company-wide performance review cycle with transparent criteria known to all employees.", label:"Review consistency"},
      {q:"Managers are trained and calibrated to deliver meaningful, equitable, and development-oriented feedback.", label:"Manager capability"},
      {q:"Performance data feeds directly into decisions on compensation, promotion, and development planning.", label:"Decision integration"},
      {q:"We differentiate clearly and fairly between high performers, solid contributors, and those needing support.", label:"Differentiation quality"},
    ],
    potential:[
      {q:"Performance data is captured in structured, digital form — not predominantly in PDFs, emails, or static notes.", label:"Data structure"},
      {q:"We see meaningful problems (recency bias, inconsistency, subjectivity) that AI could help detect and address.", label:"Problem fit"},
      {q:"Continuous feedback tools, sentiment analysis of performance narratives, or pattern detection interest leadership.", label:"Use case appetite"},
      {q:"Our performance data could plausibly connect to a talent intelligence or succession planning model.", label:"Data extensibility"},
    ],
  },
  ld:{
    maturity:[
      {q:"We have a structured L&D calendar with programs explicitly linked to organizational or skills priorities.", label:"Program structure"},
      {q:"Learning completion, engagement, and on-the-job application are tracked and reported with reasonable reliability.", label:"Impact tracking"},
      {q:"Individual Development Plans (IDPs) exist for a significant proportion of our workforce.", label:"IDP coverage"},
      {q:"We evaluate learning impact beyond completion — using behavior change, capability assessments, or business outcomes.", label:"Evaluation depth"},
    ],
    potential:[
      {q:"We have clear visibility into skills gaps — by role, function, or business unit — that could feed an AI learning engine.", label:"Skills gap clarity"},
      {q:"We're exploring or open to AI-driven, personalized learning paths based on role, career goals, or performance gaps.", label:"Personalization interest"},
      {q:"Our LMS or content library is structured enough to integrate with an AI recommendation or curation engine.", label:"Tech readiness"},
      {q:"AI-generated content, adaptive learning, or intelligent coaching tools are on our near-term agenda.", label:"Innovation appetite"},
    ],
  },
  tm:{
    maturity:[
      {q:"We use a formal talent segmentation model (e.g., performance-potential matrix) to identify and manage key talent.", label:"Talent segmentation"},
      {q:"Succession plans exist and are actively maintained for at least our critical roles or top 20% of positions.", label:"Succession planning"},
      {q:"Internal mobility — lateral moves, project assignments, cross-functional roles — is actively promoted and tracked.", label:"Internal mobility"},
      {q:"We use data to understand retention risk, engagement trends, and the drivers of voluntary attrition.", label:"Retention analytics"},
    ],
    potential:[
      {q:"We have multi-year tenure, performance, and engagement data that could train attrition prediction or talent models.", label:"Data richness"},
      {q:"AI-driven flight risk scoring, attrition prediction, or talent retention tools are of genuine interest to leadership.", label:"Predictive analytics interest"},
      {q:"We see real potential for an internal talent marketplace or AI-assisted career pathing tool for our workforce.", label:"Marketplace potential"},
      {q:"Leadership is willing to take action based on AI-generated talent insights — not just generate dashboards.", label:"Action orientation"},
    ],
  },
};

const SCALE = [{v:1,l:"Not at all"},{v:2,l:"Rarely"},{v:3,l:"Partially"},{v:4,l:"Largely"},{v:5,l:"Fully"}];

// ─────────────────────────────────────────────
// FIX: Field is defined OUTSIDE App so React
// never remounts it on re-render → cursor stays
// ─────────────────────────────────────────────
function Field({ placeholder, type = "text", errs, setErrs, stateKey, lead, setLead }) {
  return (
    <div className="field-wrap">
      <input
        className={`field${errs[stateKey] ? " error" : ""}`}
        placeholder={placeholder}
        type={type}
        value={lead[stateKey]}
        onChange={e => {
          setLead(p => ({ ...p, [stateKey]: e.target.value }));
          setErrs(p => ({ ...p, [stateKey]: "" }));
        }}
      />
      {errs[stateKey] && <div className="field-err">{errs[stateKey]}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// FIX: PrivacyNote also outside App
// ─────────────────────────────────────────────
function PrivacyNote() {
  return (
    <div className="privacy-note">
      <span className="privacy-icon">🔒</span>
      <span className="privacy-text">
        <strong>How we use your information:</strong> Your name, company, and email personalise your report.
        InvokBiz may follow up with relevant insights. We never sell your data. Unsubscribe anytime.
      </span>
    </div>
  );
}

function calcScores(answers) {
  const out = {};
  AREAS.forEach(a => {
    const mqs = QUESTIONS[a.id].maturity;
    const pqs = QUESTIONS[a.id].potential;
    const mTotal = mqs.reduce((s,_,i) => s + (answers[`${a.id}_m_${i}`] || 0), 0);
    const pTotal = pqs.reduce((s,_,i) => s + (answers[`${a.id}_p_${i}`] || 0), 0);
    out[a.id] = {
      maturity:  Math.round((mTotal / (mqs.length * 5)) * 100),
      potential: Math.round((pTotal / (pqs.length * 5)) * 100),
    };
  });
  return out;
}

function getStage(score) {
  if (score < 30) return { name:"Exploratory",  color:"#ef4444" };
  if (score < 50) return { name:"Emerging",     color:"#f59e0b" };
  if (score < 70) return { name:"Scaling",      color:"#3b82f6" };
  if (score < 85) return { name:"Advancing",    color:"#8b5cf6" };
  return               { name:"Transforming", color:"#10b981" };
}

function getQuadrant(m, p) {
  if (m >= 50 && p >= 50) return { name:"Scale AI Now",          color:"#10b981", desc:"Strong foundation. Prioritize AI deployment and ROI capture." };
  if (m <  50 && p >= 50) return { name:"Foundation First",      color:"#f59e0b", desc:"High AI appetite but process maturity must come first." };
  if (m >= 50 && p <  50) return { name:"Optimize & Prepare",    color:"#3b82f6", desc:"Mature practice. Build data assets and leadership appetite for AI." };
  return                   { name:"Critical Transform Zone", color:"#ef4444", desc:"Needs fundamental process and capability transformation before AI." };
}

function Matrix({ scores }) {
  const W=260, H=260, PAD=28;
  const iW = W - PAD*2, iH = H - PAD*2;
  function toXY(m, p) {
    return { x: PAD + (m/100)*iW, y: PAD + ((100-p)/100)*iH };
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto"}}>
      <rect x={PAD} y={PAD} width={iW/2} height={iH/2} fill="#fef3c710"/>
      <rect x={PAD+iW/2} y={PAD} width={iW/2} height={iH/2} fill="#d1fae510"/>
      <rect x={PAD} y={PAD+iH/2} width={iW/2} height={iH/2} fill="#fee2e210"/>
      <rect x={PAD+iW/2} y={PAD+iH/2} width={iW/2} height={iH/2} fill="#dbeafe10"/>
      <line x1={PAD+iW/2} y1={PAD} x2={PAD+iW/2} y2={PAD+iH} stroke="#e8eaed" strokeWidth="1" strokeDasharray="3,3"/>
      <line x1={PAD} y1={PAD+iH/2} x2={PAD+iW} y2={PAD+iH/2} stroke="#e8eaed" strokeWidth="1" strokeDasharray="3,3"/>
      <rect x={PAD} y={PAD} width={iW} height={iH} fill="none" stroke="#e8eaed" strokeWidth=".5"/>
      <text x={PAD+5} y={PAD+9} fontSize="6.5" fontWeight="600" fill="#d4a017" fontFamily="Sora,sans-serif" letterSpacing=".05em">FOUNDATION FIRST</text>
      <text x={PAD+iW/2+5} y={PAD+9} fontSize="6.5" fontWeight="600" fill="#059669" fontFamily="Sora,sans-serif" letterSpacing=".05em">SCALE AI NOW</text>
      <text x={PAD+5} y={PAD+iH-4} fontSize="6.5" fontWeight="600" fill="#dc2626" fontFamily="Sora,sans-serif" letterSpacing=".05em">CRITICAL ZONE</text>
      <text x={PAD+iW/2+5} y={PAD+iH-4} fontSize="6.5" fontWeight="600" fill="#2563eb" fontFamily="Sora,sans-serif" letterSpacing=".05em">OPTIMIZE & PREPARE</text>
      <text x={PAD} y={PAD+iH+13} fontSize="7.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif">Low Maturity</text>
      <text x={PAD+iW} y={PAD+iH+13} fontSize="7.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif" textAnchor="end">High Maturity</text>
      <text x={PAD-3} y={PAD+iH} fontSize="7.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif" textAnchor="end">Low</text>
      <text x={PAD-3} y={PAD+11} fontSize="7.5" fill="#9ca3af" fontFamily="DM Sans,sans-serif" textAnchor="end">High</text>
      {AREAS.map(a => {
        const s = scores[a.id];
        if (!s) return null;
        const { x, y } = toXY(s.maturity, s.potential);
        return (
          <g key={a.id}>
            <circle cx={x} cy={y} r={13} fill="#D9501E" fillOpacity=".15" stroke="#D9501E" strokeWidth="1.5"/>
            <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle" fontSize="8" fontWeight="700" fill="#D9501E" fontFamily="Sora,sans-serif">
              {a.short.split(" ")[0].slice(0,4)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

async function generateReport(scores, overallM, overallP, lead) {
  const breakdown = AREAS.map(a => {
    const s = scores[a.id];
    const q = getQuadrant(s.maturity, s.potential);
    return `${a.label}: Maturity=${s.maturity}/100, AI Potential Index=${s.potential}/100 → Quadrant: ${q.name}`;
  }).join("\n");

  const prompt = `You are a senior HR transformation strategist at InvokBiz. Produce a sharp, CEO-ready diagnostic brief.

Name: ${lead.name}
Organization: ${lead.company}
Overall HR Practice Maturity: ${overallM}/100
Overall AI Adoption Potential Index: ${overallP}/100

Practice Area Breakdown:
${breakdown}

Write in exactly this structure (use these headings verbatim):

EXECUTIVE SUMMARY
[2 sentences. State the overall transformation posture and the single most important strategic insight.]

STRONGEST AI OPPORTUNITY
[Name the 1-2 practice areas with the highest potential index. Explain specifically what AI use cases are most compelling and why.]

CRITICAL MATURITY GAPS
[Name the 1-2 areas where low practice maturity will block AI adoption. What specifically needs to be fixed first?]

SEQUENCED TRANSFORMATION PRIORITIES
[Three numbered actions, ordered by what to do first. Each action should name a specific practice area, a specific intervention, and a measurable outcome to target.]

RISK TO WATCH
[One strategic risk specific to this organization's profile — not generic.]

Keep each section tight (2-4 sentences max). No filler. No generic HR advice.`;

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Report generation failed.";
}

// ─────────────────────────────────────────────
// Helper: is the lead fully valid?
// ─────────────────────────────────────────────
function isLeadComplete(lead) {
  return (
    lead.name.trim() !== "" &&
    lead.company.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)
  );
}

export default function App() {
  const [screen,        setScreen]        = useState("intro");
  const [currentArea,   setCurrentArea]   = useState(0);
  const [answers,       setAnswers]       = useState({});
  const [lead,          setLead]          = useState({ name:"", company:"", email:"" });
  const [errors,        setErrors]        = useState({});
  const [gateErrors,    setGateErrors]    = useState({});
  const [report,        setReport]        = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  const totalQ        = AREAS.length * 8;
  const answeredCount = Object.keys(answers).length;
  const areaId        = AREAS[currentArea]?.id;
  const mQs           = QUESTIONS[areaId]?.maturity  || [];
  const pQs           = QUESTIONS[areaId]?.potential || [];
  const areaAnswered  = [
    ...mQs.map((_,i) => answers[`${areaId}_m_${i}`]),
    ...pQs.map((_,i) => answers[`${areaId}_p_${i}`]),
  ].filter(Boolean).length;
  const canProceed = areaAnswered === 8;

  function validate(obj, setErr) {
    const e = {};
    if (!obj.name.trim())    e.name    = "Your name is required";
    if (!obj.company.trim()) e.company = "Company name is required";
    if (!obj.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(obj.email)) e.email = "Enter a valid email";
    setErr(e);
    return Object.keys(e).length === 0;
  }

  function handleAnswer(type, qi, val) {
    setAnswers(prev => ({ ...prev, [`${areaId}_${type}_${qi}`]: val }));
  }

function submitResults() {
  const scores  = calcScores(answers);
  const overallM = Math.round(AREAS.reduce((s,a) => s + scores[a.id].maturity,  0) / AREAS.length);
  const overallP = Math.round(AREAS.reduce((s,a) => s + scores[a.id].potential, 0) / AREAS.length);
  const stage   = getStage(Math.round((overallM + overallP) / 2));
  setScreen("results");
  setReportLoading(true);
  generateReport(scores, overallM, overallP, lead)
    .then(r => {
      setReport(r);
      setReportLoading(false);
      sendToSheet(lead, overallM, overallP, stage, r);
    })
    .catch(() => {
      setReport("AI report unavailable. Please check API connectivity.");
      setReportLoading(false);
    });
}

  function handleNext() {
    if (currentArea < AREAS.length - 1) {
      setCurrentArea(p => p + 1);
      window.scrollTo(0, 0);
    } else {
      // FIX: if details already filled on intro, skip gate entirely
      if (isLeadComplete(lead)) {
        submitResults();
      } else {
        setScreen("gate");
      }
    }
  }

  async function sendToSheet(lead, overallM, overallP, stage, report) {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbwdrZqJ46fqSI8XMAdv8ShDDrrLMfmUDzb7iBUrpLsIIJiM9dII6h_64kdBmREKfzxp/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        company: lead.company,
        email: lead.email,
        maturity: overallM,
        potential: overallP,
        stage: stage.name,
        report: report
      })
    });
  } catch(err) {
    console.log("Sheet sync failed:", err);
  }
}

  function handleGateSubmit() {
    if (!validate(lead, setGateErrors)) return;
    submitResults();
  }

  /* ── INTRO ── */
  if (screen === "intro") return (
    <div className="app"><style>{STYLE}</style>
    <div className="intro">
      <div className="intro-eyebrow"><div className="intro-line"/>InvokBiz · AI Transformation Series<div className="intro-line"/></div>
      <h1 className="intro-title">HR AI Readiness<br/><em>Diagnostic</em></h1>
      <p className="intro-sub">Assess practice-area maturity and AI adoption potential across five core HR functions. 40 indicators. Dual-axis scoring. AI-generated strategic brief.</p>
      <div className="area-grid">
        {AREAS.map(a => (
          <div className="area-pill" key={a.id}>
            <div className="area-icon">{a.icon}</div>
            <div className="area-pill-name">{a.label}</div>
          </div>
        ))}
      </div>
      <div className="intro-form">
        <Field placeholder="Your full name *"  stateKey="name"    errs={errors} setErrs={setErrors} lead={lead} setLead={setLead}/>
        <Field placeholder="Company name *"    stateKey="company" errs={errors} setErrs={setErrors} lead={lead} setLead={setLead}/>
        <Field placeholder="Work email *" type="email" stateKey="email" errs={errors} setErrs={setErrors} lead={lead} setLead={setLead}/>
        <PrivacyNote/>
        <button className="btn-start" onClick={() => { if (validate(lead, setErrors)) setScreen("assess"); }}>
          Begin Diagnostic →
        </button>
        <div className="intro-note">~10 min · 5 practice areas · Maturity + AI Potential Index</div>
      </div>
    </div>
    </div>
  );

  /* ── ASSESS ── */
  if (screen === "assess") {
    const area     = AREAS[currentArea];
    const progress = (answeredCount / totalQ) * 100;
    return (
      <div className="app"><style>{STYLE}</style>
      <div className="mob-header">
        <span className="mob-logo">⚡ InvokBiz</span>
        <span className="mob-prog">{answeredCount}/{totalQ} answered · Area {currentArea+1}/{AREAS.length}</span>
      </div>
      <div className="layout">
        <nav className="sidebar">
          <div className="sb-brand">
            <div className="sb-brand-box">⚡</div>
            <span className="sb-brand-name">InvokBiz</span>
          </div>
          <div className="sb-section">Practice Areas</div>
          <div className="sb-items">
            {AREAS.map((a, i) => {
              const st = i < currentArea ? "done" : i === currentArea ? "active" : "locked";
              return (
                <div className={`sb-item ${st}`} key={a.id} onClick={() => st !== "locked" && setCurrentArea(i)}>
                  <div className={`sb-num ${st}`}>{i < currentArea ? "✓" : `0${i+1}`}</div>
                  <span className="sb-lbl">{a.label}</span>
                </div>
              );
            })}
          </div>
          <div className="sb-footer">
            <div className="sb-prog-lbl">{answeredCount} of {totalQ} answered</div>
            <div className="sb-prog-track"><div className="sb-prog-fill" style={{width:`${progress}%`}}/></div>
            {lead.name && (
              <div className="sb-user">
                <div className="sb-user-name">{lead.name}</div>
                <div className="sb-user-co">{lead.company}</div>
              </div>
            )}
          </div>
        </nav>
        <main className="main">
          <div className="area-header">
            <div className="area-chip" style={{background:area.bg,borderColor:area.border,color:area.text}}>
              {area.icon} Area {currentArea+1} of {AREAS.length}
            </div>
            <h2 className="area-title">{area.label}</h2>
            <p className="area-desc">{area.desc}</p>
          </div>

          <div className="section-divider">
            <span className="div-label mat-label">Practice Maturity</span>
            <div className="div-line"/>
            <span style={{fontSize:11,color:"#9ca3af",whiteSpace:"nowrap"}}>How developed is your current practice?</span>
          </div>
          <div className="q-list">
            {mQs.map((q, qi) => {
              const key = `${areaId}_m_${qi}`;
              const sel = answers[key];
              return (
                <div className="q-card" key={qi}>
                  <div className="q-meta">{q.label}</div>
                  <div className="q-text">{q.q}</div>
                  <div className="q-scale">
                    {SCALE.map(o => (
                      <button key={o.v} type="button" className={`q-btn${sel===o.v?" sel-m":""}`} onClick={() => handleAnswer("m", qi, o.v)}>{o.v}</button>
                    ))}
                  </div>
                  <div className="scale-hints"><span className="scale-hint">1 — Not at all</span><span className="scale-hint">5 — Fully</span></div>
                </div>
              );
            })}
          </div>

          <div className="section-divider">
            <span className="div-label pot-label">AI Adoption Potential</span>
            <div className="div-line"/>
            <span style={{fontSize:11,color:"#9ca3af",whiteSpace:"nowrap"}}>How ready is this area for AI?</span>
          </div>
          <div className="q-list">
            {pQs.map((q, qi) => {
              const key = `${areaId}_p_${qi}`;
              const sel = answers[key];
              return (
                <div className="q-card pot" key={qi}>
                  <div className="q-meta" style={{color:"#D9501E"}}>{q.label}</div>
                  <div className="q-text">{q.q}</div>
                  <div className="q-scale">
                    {SCALE.map(o => (
                      <button key={o.v} type="button" className={`q-btn${sel===o.v?" sel-p":""}`} onClick={() => handleAnswer("p", qi, o.v)}>{o.v}</button>
                    ))}
                  </div>
                  <div className="scale-hints"><span className="scale-hint">1 — Not at all</span><span className="scale-hint">5 — Fully</span></div>
                </div>
              );
            })}
          </div>

          <div className="area-actions">
            <span className="q-count"><strong>{areaAnswered}</strong> / 8 answered</span>
            <div className="btn-row">
              {currentArea > 0 && (
                <button className="btn-back" onClick={() => { setCurrentArea(p => p-1); window.scrollTo(0,0); }}>← Back</button>
              )}
              <button className="btn-next" disabled={!canProceed} onClick={handleNext}>
                {currentArea === AREAS.length-1 ? "See My Results →" : "Next Area →"}
              </button>
            </div>
          </div>
        </main>
      </div>
      </div>
    );
  }

  /* ── GATE (only shown if details were NOT filled on intro) ── */
  if (screen === "gate") return (
    <div className="app"><style>{STYLE}</style>
    <div className="gate">
      <div className="gate-icon">📊</div>
      <h2 className="gate-title">Your report is ready.</h2>
      <p className="gate-sub">Confirm your details to unlock your personalised AI Transformation Diagnostic — including your AI-generated strategic brief from InvokBiz.</p>
      <div className="gate-form">
        <div className="gate-what">
          <div className="gate-what-title">You'll receive</div>
          <div className="gate-what-item">Dual-axis scores across all 5 HR practice areas</div>
          <div className="gate-what-item">AI-generated strategic advisory brief</div>
          <div className="gate-what-item">Quadrant classification with transformation priorities</div>
          <div className="gate-what-item">A follow-up from the InvokBiz team (if relevant)</div>
        </div>

        {/* FIX: show confirm card if field already filled, else show input */}
        {lead.name.trim()
          ? <div className="gate-confirm">
              <div className="gate-confirm-title">Reporting for</div>
              <div className="gate-confirm-row"><span className="gate-confirm-icon">👤</span><span className="gate-confirm-val">{lead.name}</span></div>
              <div className="gate-confirm-row"><span className="gate-confirm-icon">🏢</span><span className="gate-confirm-val">{lead.company}</span></div>
              <div className="gate-confirm-row"><span className="gate-confirm-icon">✉️</span><span className="gate-confirm-val">{lead.email}</span></div>
            </div>
          : <>
              <Field placeholder="Your full name *"  stateKey="name"    errs={gateErrors} setErrs={setGateErrors} lead={lead} setLead={setLead}/>
              <Field placeholder="Company name *"    stateKey="company" errs={gateErrors} setErrs={setGateErrors} lead={lead} setLead={setLead}/>
              <Field placeholder="Work email *" type="email" stateKey="email" errs={gateErrors} setErrs={setGateErrors} lead={lead} setLead={setLead}/>
            </>
        }

        <PrivacyNote/>
        <button className="btn-start" onClick={handleGateSubmit}>Unlock My Report →</button>
        <button
          style={{background:"transparent",border:"none",color:"#9ca3af",fontSize:12,cursor:"pointer",fontFamily:"DM Sans,sans-serif",padding:"4px 0"}}
          onClick={() => setScreen("assess")}
        >← Go back to edit answers</button>
      </div>
    </div>
    </div>
  );

  /* ── RESULTS ── */
  if (screen === "results") {
    const scores   = calcScores(answers);
    const overallM = Math.round(AREAS.reduce((s,a) => s + scores[a.id].maturity,  0) / AREAS.length);
    const overallP = Math.round(AREAS.reduce((s,a) => s + scores[a.id].potential, 0) / AREAS.length);
    const stage    = getStage(Math.round((overallM + overallP) / 2));
    const sortedByPotential = [...AREAS].sort((a,b) => scores[b.id].potential - scores[a.id].potential);

    return (
      <div className="app"><style>{STYLE}</style>
      <div className="results-wrap">
        <div className="r-eyebrow">AI Transformation Diagnostic · {lead.company || "Your Organization"}</div>
        <h1 className="r-title">Readiness Report</h1>
        <p className="r-sub">Prepared for <strong style={{color:"#0f1d38"}}>{lead.name}</strong> · 5 HR practice areas · {totalQ} indicators assessed</p>

        <div className="sum-row">
          <div className="sum-card">
            <div className="sum-lbl">Practice Maturity</div>
            <div className="sum-big">{overallM}</div>
            <div className="sum-unit">average / 100</div>
          </div>
          <div className="sum-card">
            <div className="sum-lbl">AI Potential Index</div>
            <div className="sum-big" style={{color:"#D9501E"}}>{overallP}</div>
            <div className="sum-unit">average / 100</div>
          </div>
          <div className="sum-card">
            <div className="sum-lbl">Overall Stage</div>
            <div className="sum-stage" style={{background:stage.color+"18",color:stage.color,border:`1px solid ${stage.color}40`}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:stage.color,display:"inline-block",flexShrink:0}}/>
              {stage.name}
            </div>
            <div style={{fontSize:11.5,color:"#6b7280",marginTop:8,lineHeight:1.55}}>
              {(() => {
                const s = Math.round((overallM + overallP) / 2);
                if (s < 30) return "Foundational transformation needed across practices.";
                if (s < 50) return "Pockets of progress — systemic adoption is the next frontier.";
                if (s < 70) return "AI integration is within reach. Govern and prioritize deliberately.";
                if (s < 85) return "Strong platform. Deepen AI integration and measure impact rigorously.";
                return "AI is embedded. Focus on competitive differentiation and scaling.";
              })()}
            </div>
          </div>
        </div>

        <div className="two-up">
          <div className="panel">
            <div className="panel-title">Practice Area Positioning</div>
            <div className="panel-sub">Maturity (x-axis) vs AI Potential (y-axis)</div>
            <Matrix scores={scores}/>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
              {AREAS.map(a => (
                <div key={a.id} style={{display:"flex",alignItems:"center",gap:5,fontSize:10.5,color:"#6b7280"}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:"#D9501E",opacity:.7,flexShrink:0}}/>
                  {a.short}
                </div>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-title">AI Potential Index by Area</div>
            <div className="panel-sub">Maturity (background) · AI Potential (foreground)</div>
            <div className="pi-rows">
              {sortedByPotential.map(a => {
                const s = scores[a.id];
                const q = getQuadrant(s.maturity, s.potential);
                return (
                  <div key={a.id}>
                    <div className="pi-hd">
                      <span className="pi-name">{a.icon} {a.label}</span>
                      <div className="pi-vals">
                        <span className="pi-m">M:{s.maturity}</span>
                        <span className="pi-p" style={{color:"#D9501E"}}>P:{s.potential}</span>
                      </div>
                    </div>
                    <div className="pi-track">
                      <div className="pi-bar-m" style={{width:`${s.maturity}%`,background:"#0f1d38"}}/>
                      <div className="pi-bar-p" style={{width:`${s.potential}%`,background:"#D9501E"}}/>
                    </div>
                    <div style={{fontSize:10,color:q.color,marginTop:3,fontWeight:700,fontFamily:"Sora,sans-serif",letterSpacing:".03em"}}>{q.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="panel" style={{marginBottom:20}}>
          <div className="panel-title" style={{marginBottom:3}}>Quadrant Classification by Practice Area</div>
          <div className="panel-sub">Strategic positioning based on maturity and AI potential scores</div>
          <div className="quadrant-grid">
            {AREAS.map(a => {
              const s = scores[a.id];
              const q = getQuadrant(s.maturity, s.potential);
              return (
                <div key={a.id} style={{background:"#f7f8fa",borderRadius:10,padding:"12px 11px",border:"1px solid #e8eaed"}}>
                  <div style={{fontSize:15,marginBottom:5}}>{a.icon}</div>
                  <div style={{fontFamily:"Sora,sans-serif",fontSize:10.5,fontWeight:700,color:"#0f1d38",marginBottom:4,lineHeight:1.35}}>{a.label}</div>
                  <div style={{fontFamily:"Sora,sans-serif",fontSize:9,fontWeight:700,color:q.color,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{q.name}</div>
                  <div style={{fontSize:10,color:"#6b7280",lineHeight:1.5}}>{q.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="report-panel">
          <div className="rp-hd">
            <div className="rp-title">Strategic Advisor Report</div>
            <div className="rp-badge">AI-generated · InvokBiz</div>
          </div>
          {reportLoading
            ? <div className="rp-loading"><div className="spinner"/><div className="rp-loading-txt">Synthesising your strategic brief…</div></div>
            : <div className="rp-body">{report}</div>
          }
        </div>
        

        <div className="r-actions">
          <button className="btn-ghost" onClick={() => {
            setScreen("intro"); setCurrentArea(0); setAnswers({});
            setReport(""); setLead({ name:"", company:"", email:"" });
          }}>Restart</button>
          <button className="btn-cta" onClick={() => window.open("https://wa.me/+919560506667", "_blank")}>
            Talk to an Advisor →
          </button>
        </div>
      </div>
      </div>
    );
  }

  return null;
}