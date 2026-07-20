/**
 * Generates richer LMS curricula for non–Full Stack courses.
 * Run: node backend/scripts/generateOtherLms.js
 */
const fs = require('fs');
const path = require('path');

const LMS_CONTENT_VERSION = 1;

const q = (prompt, options, answerIndex, explanation) => ({ prompt, options, answerIndex, explanation });
const tryIt = (id, title, description, parts) => ({ id, title, description, ...parts });
const chapter = (cfg) => ({
  ...cfg,
  track: cfg.track || 'shared',
  keyPoints: cfg.keyPoints || [],
  tryIt: cfg.tryIt || [],
  localBuild: cfg.localBuild || { goal: '', commands: [], expectedUrl: '', checklist: [] },
  example: cfg.example || { title: '', code: '', explanation: '' },
  quiz: { passScore: cfg.passScore || 70, questions: cfg.questions }
});

const fileHeader = `const LMS_CONTENT_VERSION = ${LMS_CONTENT_VERSION};

const q = (prompt, options, answerIndex, explanation) => ({
  prompt, options, answerIndex, explanation
});

const tryIt = (id, title, description, { html = '', css = '', js = '' } = {}) => ({
  id, title, description, html, css, js
});

const chapter = ({
  id, title, order, track = 'shared', summary, content, keyPoints, tryIt: tryIts,
  localBuild, example, questions, passScore = 70
}) => ({
  id, title, order, track, summary, content,
  keyPoints: keyPoints || [],
  tryIt: tryIts || [],
  localBuild: localBuild || { goal: '', commands: [], expectedUrl: '', checklist: [] },
  example: example || { title: '', code: '', explanation: '' },
  quiz: { passScore, questions }
});
`;

function emitFile(exportName, chapters) {
  const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  let body = `${fileHeader}\nconst ${exportName} = [\n`;
  for (const ch of chapters) {
    const tryIts = (ch.tryIt || []).map((t) => `tryIt(${JSON.stringify(t.id)}, ${JSON.stringify(t.title)}, ${JSON.stringify(t.description)}, {
      html: \`${esc(t.html)}\`,
      css: \`${esc(t.css)}\`,
      js: \`${esc(t.js)}\`
    })`).join(',\n    ');
    const questions = (ch.questions || []).map((x) =>
      `q(${JSON.stringify(x.prompt)}, ${JSON.stringify(x.options)}, ${x.answerIndex}, ${JSON.stringify(x.explanation)})`
    ).join(',\n      ');
    const lb = ch.localBuild || {};
    const ex = ch.example || {};
    body += `  chapter({
    id: ${JSON.stringify(ch.id)},
    title: ${JSON.stringify(ch.title)},
    order: ${ch.order},
    track: ${JSON.stringify(ch.track || 'shared')},
    summary: ${JSON.stringify(ch.summary)},
    content: \`
${esc(ch.content).trim()}
\`,
    keyPoints: ${JSON.stringify(ch.keyPoints || [])},
    tryIt: [
    ${tryIts}
    ],
    localBuild: {
      goal: ${JSON.stringify(lb.goal || '')},
      commands: ${JSON.stringify(lb.commands || [])},
      expectedUrl: ${JSON.stringify(lb.expectedUrl || '')},
      checklist: ${JSON.stringify(lb.checklist || [])}
    },
    example: {
      title: ${JSON.stringify(ex.title || '')},
      code: \`${esc(ex.code)}\`,
      explanation: ${JSON.stringify(ex.explanation || '')}
    },
    questions: [
      ${questions}
    ]
  }),
`;
  }
  body += `];

module.exports = { ${exportName}, LMS_CONTENT_VERSION };
`;
  return body;
}

const stdQuiz = (topic) => [
  q(`What is the main goal of learning ${topic}?`, ['Memorize jargon only', 'Build practical, job-ready skills', 'Avoid projects', 'Skip practice'], 1, 'Practice and projects create skill.'),
  q('How should you practice each chapter?', ['Only watch videos', 'Read, try the editor, then build locally', 'Skip quizzes', 'Copy without reading'], 1, 'Active practice sticks.'),
  q('Key points sections help you…', ['Ignore details', 'Remember the essentials', 'Skip Try it', 'Avoid local work'], 1, 'They summarize must-know ideas.'),
  q('Passing the quiz means…', ['You finished the chapter requirements', 'You deployed to production', 'You bought a domain', 'You skipped content'], 0, 'Quiz pass unlocks the next lesson.'),
  q('If stuck, you should…', ['Guess forever', 'Re-read, use Try it, then ask for help', 'Delete the course', 'Change the skin only'], 1, 'Iterate and seek help.')
];

function makeChapters(prefix, titles, richer) {
  return titles.map((t, i) => {
    const r = richer[i] || {};
    return chapter({
      id: `${prefix}-${i + 1}`,
      title: t.title,
      order: i + 1,
      summary: t.summary,
      content: r.content || `## ${t.title}\n\n${t.summary}\n\nPractice with the Try it editor, then complete local steps and the quiz.`,
      keyPoints: r.keyPoints || [
        `Focus on understanding ${t.title.toLowerCase()}`,
        'Use the Try it editor to experiment',
        'Complete the local practice checklist',
        'Pass the quiz to unlock the next chapter'
      ],
      tryIt: r.tryIt || [tryIt(`${prefix}-t${i + 1}`, `Try it: ${t.title}`, 'Interact with this demo, then Run.', {
        html: `<h2>${t.title}</h2><p id="out">Edit and click Run</p><button id="go">Run demo</button>`,
        css: 'body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0;cursor:pointer}',
        js: `document.getElementById('go').onclick=()=>{document.getElementById('out').textContent='Nice! You ran the ${t.title.replace(/'/g, '')} demo.';};`
      })],
      localBuild: r.localBuild || {
        goal: `Practice ${t.title} on your machine and take notes.`,
        commands: ['mkdir practice && cd practice', 'code notes.md'],
        expectedUrl: 'local notes / tool of choice',
        checklist: ['Notes saved', 'Try it completed', 'Ready for quiz']
      },
      example: r.example || {
        title: `${t.title} snapshot`,
        code: `// Example notes for: ${t.title}\n// 1) Concept\n// 2) Why it matters\n// 3) Mini practice`,
        explanation: 'Keep short notes after every chapter.'
      },
      questions: r.questions || [
        q(`Which best describes "${t.title}"?`, [t.summary.slice(0, 60) + '…', 'A CSS property', 'A Mongo index type', 'An SSL cipher'], 0, 'Match the chapter summary.'),
        ...stdQuiz(t.title).slice(1)
      ]
    });
  });
}

/* ---------- Data Science ---------- */
const dsTitles = [
  { title: 'Data Science mindset & workflow', summary: 'Learn how data projects move from question → data → insight → decision.' },
  { title: 'Python foundations for data', summary: 'Variables, lists, dicts, and notebooks — the language of data work.' },
  { title: 'NumPy arrays & vector thinking', summary: 'Fast numeric arrays and why vectorized code beats slow loops.' },
  { title: 'Tabular data with Pandas ideas', summary: 'Rows, columns, filters, and group-bys on tables.' },
  { title: 'Exploratory data analysis (EDA)', summary: 'Profiles, missing values, distributions, and first charts.' },
  { title: 'Statistics that analysts use daily', summary: 'Mean, median, variance, correlation — interpreted simply.' },
  { title: 'Supervised learning intro', summary: 'Predict targets with labeled examples: regression vs classification.' },
  { title: 'Train/test split & model metrics', summary: 'Avoid leakage; measure accuracy, precision, recall, RMSE.' },
  { title: 'Trees, forests & practical ML', summary: 'Interpretable models teams ship in real products.' },
  { title: 'Clustering & unsupervised patterns', summary: 'Find groups when labels are missing.' },
  { title: 'Intro GenAI for analytics', summary: 'Use LLMs safely for summarization and coding help — with verification.' },
  { title: 'Capstone: insight story & portfolio', summary: 'Ship a mini case study with charts, metrics, and a clear recommendation.' }
];

const dsRicher = [
  {
    content: `## What is Data Science?

Data Science turns raw data into **decisions**. A typical loop:

1. Ask a business question
2. Collect / access data
3. Clean and explore
4. Model or analyze
5. Communicate insight
6. Measure impact

### Roles you will hear
- Data Analyst — dashboards, SQL, storytelling
- Data Scientist — modeling + experimentation
- ML Engineer — production systems

## Why process matters
Jumping to fancy models without a clear question wastes time. Start with: **Who decides what, using which metric?**`,
    keyPoints: ['Start from a decision/question', 'Data quality beats fancy models', 'Communicate for non-technical stakeholders', 'Iterate: explore → model → explain', 'Ethics and privacy are part of the job'],
    tryIt: [tryIt('ds1', 'Try it: Project brief builder', 'Fill a mini brief — good projects start here.', {
      html: `<label>Business question<br/><input id="q" style="width:95%" value="Which leads are most likely to enroll?"/></label>
<label>Decision owner<br/><input id="o" style="width:95%" value="Admissions counselor"/></label>
<label>Success metric<br/><input id="m" style="width:95%" value="Enrollment conversion rate"/></label>
<button id="go">Build brief</button>
<pre id="out"></pre>`,
      css: 'body{font-family:Arial,sans-serif}label{display:block;margin:8px 0}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0;cursor:pointer}pre{background:#f1f5f9;padding:10px}',
      js: `document.getElementById('go').onclick=()=>{
  const brief={question:q.value,owner:o.value,metric:m.value,nextStep:'Collect labeled historical leads'};
  out.textContent=JSON.stringify(brief,null,2);
};`
    })]
  },
  {
    content: `## Python for data

You will use Python for notebooks, scripts, and ML libraries.

Core ideas:
- \`list\` / \`dict\` for collections
- functions for reusable steps
- virtual environments for dependencies

### Local workflow
\`\`\`bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
pip install numpy pandas matplotlib
\`\`\`

Practice writing tiny scripts before jumping into huge notebooks.`,
    keyPoints: ['Use a virtual environment', 'Lists vs dicts', 'Readable function names', 'Notebooks are for exploration; scripts for reuse', 'pip install project dependencies'],
    tryIt: [tryIt('ds2', 'Try it: Mean of a list (JS stand-in)', 'Same idea as Python statistics on a list.', {
      html: `<p>Scores: <code id="arr">[70, 85, 90, 60, 88]</code></p>
<button id="go">Compute mean</button>
<p id="out"></p>`,
      css: 'body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
      js: `const scores=[70,85,90,60,88];
document.getElementById('go').onclick=()=>{
  const mean=scores.reduce((a,b)=>a+b,0)/scores.length;
  out.textContent='Mean = '+mean.toFixed(2);
};`
    })],
    localBuild: {
      goal: 'Create a venv and print hello from Python.',
      commands: ['python -m venv .venv', '.venv\\Scripts\\activate', 'python -c "print(\'hello data\')"'],
      expectedUrl: 'terminal output',
      checklist: ['venv created', 'activated', 'hello printed']
    }
  },
  {
    content: `## NumPy mindset

NumPy arrays store numbers efficiently and support vectorized operations:

\`\`\`python
import numpy as np
x = np.array([1, 2, 3])
print(x * 2)  # [2 4 6]
\`\`\`

Prefer array ops over Python for-loops for speed and clarity.`,
    keyPoints: ['Arrays are typed and fast', 'Broadcasting applies ops across shapes', 'Axes matter in 2D data', 'Vectorize when possible', 'Know shape and dtype'],
    tryIt: [tryIt('ds3', 'Try it: Vector scale', 'Multiply every value — like a NumPy vector op.', {
      html: `<input id="n" type="number" value="3" />
<button id="go">Scale [2,4,6,8]</button>
<pre id="out"></pre>`,
      css: 'body{font-family:Arial,sans-serif}button{margin-left:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
      js: `document.getElementById('go').onclick=()=>{
  const k=Number(n.value)||1;
  const scaled=[2,4,6,8].map(v=>v*k);
  out.textContent=JSON.stringify(scaled);
};`
    })]
  }
];

// Fill remaining DS richer lightly with topic-specific tryIts
for (let i = 3; i < dsTitles.length; i++) {
  if (!dsRicher[i]) {
    const title = dsTitles[i].title;
    dsRicher[i] = {
      content: `## ${title}\n\n${dsTitles[i].summary}\n\n### Learn by doing\n1. Read the idea\n2. Use Try it\n3. Reproduce locally in Python/notebooks\n4. Write 5 lines of notes\n5. Take the quiz\n\n### Common mistakes\n- Skipping data cleaning\n- Overfitting without validation\n- Charts without a message\n- Using GenAI output without checking`,
      keyPoints: ['Understand the question first', 'Validate assumptions with plots/tables', 'Keep a reproducible notebook', 'Explain results in plain language', 'Version your data + code'],
      tryIt: [tryIt(`ds${i + 1}`, `Try it: ${title}`, 'Interactive concept check.', {
        html: `<h3>${title}</h3><p>Mark what you will practice:</p>
<label><input type="checkbox"/> Read docs/examples</label><br/>
<label><input type="checkbox"/> Run a tiny demo</label><br/>
<label><input type="checkbox"/> Write notes</label>
<button id="go">Save plan</button><p id="out"></p>`,
        css: 'body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
        js: `document.getElementById('go').onclick=()=>{out.textContent='Plan saved. Now practice ${title.replace(/'/g, '')} locally.';};`
      })]
    };
  }
}

/* Special richer blocks for key DS chapters */
dsRicher[4] = {
  content: `## EDA checklist

Before modeling:
- How many rows/columns?
- Missing values?
- Outliers?
- Target balance (classification)?
- Leakage risk?

### Charts with a purpose
Every chart should answer a question — not decorate a slide.`,
  keyPoints: ['Profile before modeling', 'Missingness is a signal', 'Plot distributions', 'Watch for leakage', 'Document findings'],
  tryIt: [tryIt('ds5', 'Try it: Missing value %', 'Compute missing percentage for a tiny table.', {
    html: `<pre>age: 10 values, 2 missing
city: 10 values, 0 missing</pre>
<button id="go">Compute</button><pre id="out"></pre>`,
    css: 'body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}pre{background:#f8fafc;padding:10px}',
    js: `document.getElementById('go').onclick=()=>{
  out.textContent=JSON.stringify({age:(2/10*100)+'%',city:(0/10*100)+'%'},null,2);
};`
  })]
};

dsRicher[6] = {
  content: `## Supervised learning

You have **features (X)** and a **label (y)**.

- Regression → numeric target (price, score)
- Classification → category target (spam/ham, enroll/not)

Start with simple baselines before complex models.`,
  keyPoints: ['Labeled data required', 'Baseline first', 'Features must be available at prediction time', 'Split train/test', 'Metrics depend on task'],
  tryIt: [tryIt('ds7', 'Try it: Classify threshold', 'Score >= 0.5 → Yes', {
    html: `<input id="s" type="number" step="0.1" value="0.72" />
<button id="go">Predict</button><p id="out"></p>`,
    css: 'body{font-family:Arial,sans-serif}button{margin-left:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
    js: `document.getElementById('go').onclick=()=>{
  const v=Number(s.value); out.textContent = v>=0.5 ? 'Class: YES' : 'Class: NO';
};`
  })]
};

dsRicher[11] = {
  content: `## Capstone story

Your portfolio piece should include:
1. Question & audience
2. Data source + cleaning notes
3. 2–4 insightful charts
4. Model or analysis result
5. Decision recommendation
6. Limitations

Ship a GitHub README that another person can run.`,
  keyPoints: ['Story > complexity', 'Reproducible steps', 'Clear recommendation', 'Honest limitations', 'Demo-ready notebook'],
  tryIt: [tryIt('ds12', 'Try it: Capstone outline', 'Generate a portfolio outline.', {
    html: `<button id="go">Generate outline</button><pre id="out"></pre>`,
    css: 'body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}pre{background:#0f172a;color:#e2e8f0;padding:12px}',
    js: `document.getElementById('go').onclick=()=>{out.textContent=['1. Question','2. Data','3. EDA','4. Model/Analysis','5. Recommendation','6. Limits'].join('\\n');};`
  })]
};

/* ---------- Digital Marketing ---------- */
const dmTitles = [
  { title: 'Marketing funnel & journey', summary: 'Map awareness → consideration → conversion → retention.' },
  { title: 'Brand messaging & personas', summary: 'Write offers that speak to a real buyer, not everyone.' },
  { title: 'SEO foundations', summary: 'Help search engines and humans understand your pages.' },
  { title: 'Keyword research mindset', summary: 'Find queries with intent you can win.' },
  { title: 'On-page SEO & content structure', summary: 'Titles, headings, internal links, and readable pages.' },
  { title: 'Content systems that scale', summary: 'Pillars, clusters, calendars, and repurposing.' },
  { title: 'Social media strategy', summary: 'Pick platforms for distribution, not vanity.' },
  { title: 'Paid ads fundamentals', summary: 'Budgets, bidding basics, and campaign structure.' },
  { title: 'Creative testing & hooks', summary: 'Test angles quickly; kill losers early.' },
  { title: 'Analytics & attribution basics', summary: 'UTMs, conversions, and honest reporting.' },
  { title: 'Landing pages that convert', summary: 'One page, one promise, one clear CTA.' },
  { title: 'Capstone: campaign plan', summary: 'Ship a full campaign brief with KPIs and weekly tests.' }
];

const dmRicher = dmTitles.map((t, i) => ({
  content: `## ${t.title}\n\n${t.summary}\n\n### Why it matters\nMarketing without measurement is guessing. Every chapter connects to a KPI you can track.\n\n### Practice habit\n- Write the audience\n- Write the offer\n- Pick one channel\n- Define one metric\n- Run a small test`,
  keyPoints: ['Audience clarity first', 'One primary CTA', 'Measure weekly', 'Test creatives', 'Document learnings'],
  tryIt: [tryIt(`dm${i + 1}`, `Try it: ${t.title}`, 'Hands-on micro tool for this topic.', i === 9 ? {
    html: `<label>Campaign <input id="c" value="spring_enroll"/></label>
<label>Source <input id="s" value="instagram"/></label>
<label>Medium <input id="m" value="paid_social"/></label>
<button id="go">Build UTM</button><pre id="out"></pre>`,
    css: 'body{font-family:Arial,sans-serif}label{display:block;margin:6px 0}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}pre{background:#f1f5f9;padding:10px;word-break:break-all}',
    js: `document.getElementById('go').onclick=()=>{
  const url='https://ebodhi.com/contact?utm_campaign='+encodeURIComponent(c.value)+'&utm_source='+encodeURIComponent(s.value)+'&utm_medium='+encodeURIComponent(m.value);
  out.textContent=url;
};`
  } : i === 4 ? {
    html: `<label>SEO title <input id="t" maxlength="70" style="width:95%" value="Full Stack Course in Jaipur | eBodhi"/></label>
<p>Length: <strong id="n">0</strong>/60 recommended</p>`,
    css: 'body{font-family:Arial,sans-serif}input{padding:8px}',
    js: `const sync=()=>{n.textContent=t.value.length; n.style.color=t.value.length>60?'#b91c1c':'#15803d';};
t.oninput=sync; sync();`
  } : i === 10 ? {
    html: `<h3>Landing page checklist</h3>
<label><input type="checkbox"/> Clear headline</label><br/>
<label><input type="checkbox"/> Social proof</label><br/>
<label><input type="checkbox"/> Single CTA</label><br/>
<label><input type="checkbox"/> Mobile readable</label>
<button id="go">Score</button><p id="out"></p>`,
    css: 'body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}',
    js: `document.getElementById('go').onclick=()=>{
  const n=[...document.querySelectorAll('input[type=checkbox]:checked')].length;
  out.textContent='Score '+n+'/4 — improve unchecked items.';
};`
  } : {
    html: `<h3>${t.title}</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
    css: 'body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
    js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
  })]
}));

/* ---------- Data Analytics ---------- */
const daTitles = [
  { title: 'Analytics problem framing', summary: 'Turn vague asks into measurable questions and KPIs.' },
  { title: 'Spreadsheets like a pro', summary: 'Cleaning, lookups, and pivot-ready tables in Excel/Sheets.' },
  { title: 'Data cleaning patterns', summary: 'Duplicates, types, nulls, and standardizing categories.' },
  { title: 'SQL SELECT & filters', summary: 'Query tables with WHERE, ORDER BY, and LIMIT.' },
  { title: 'SQL joins that analysts use', summary: 'Combine tables without exploding row counts by accident.' },
  { title: 'Aggregations & windows intro', summary: 'GROUP BY metrics and ranking ideas.' },
  { title: 'BI tools & dashboard design', summary: 'Power BI / Tableau layout principles that executives skim.' },
  { title: 'KPI trees & definitions', summary: 'Define metrics so finance and marketing mean the same thing.' },
  { title: 'Visualization that tells truth', summary: 'Choose chart types that match the question.' },
  { title: 'Stakeholder storytelling', summary: 'Lead with insight, then show evidence.' },
  { title: 'Quality checks & handoff', summary: 'Validate numbers before the meeting.' },
  { title: 'Capstone dashboard case', summary: 'Build a mini dashboard narrative with actions.' }
];

const daRicher = daTitles.map((t, i) => ({
  content: `## ${t.title}\n\n${t.summary}\n\n### Analyst habit\nAlways ask: **What decision changes if this number moves?**\n\n### Deliverables\n- Clean table or query\n- Chart or KPI card\n- One-sentence insight\n- Recommended action`,
  keyPoints: ['Define the KPI', 'Clean before charting', 'Show methodology briefly', 'Action > decoration', 'Double-check totals'],
  tryIt: [tryIt(`da${i + 1}`, `Try it: ${t.title}`, 'Interactive practice.', i === 3 ? {
    html: `<pre>SELECT name, score FROM students WHERE score >= 80 ORDER BY score DESC;</pre>
<p>Rows: Asha 92, Ravi 88, Neha 76, Kabir 81</p>
<button id="go">Run filter</button><pre id="out"></pre>`,
    css: 'body{font-family:Arial,sans-serif}pre{background:#0f172a;color:#e2e8f0;padding:10px}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
    js: `const rows=[{name:'Asha',score:92},{name:'Ravi',score:88},{name:'Neha',score:76},{name:'Kabir',score:81}];
document.getElementById('go').onclick=()=>{
  const res=rows.filter(r=>r.score>=80).sort((a,b)=>b.score-a.score);
  out.textContent=res.map(r=>r.name+' '+r.score).join('\\n');
};`
  } : i === 8 ? {
    html: `<select id="q">
<option value="trend">Trend over months</option>
<option value="parts">Share of total</option>
<option value="compare">Compare categories</option>
</select>
<p id="out"></p>`,
    css: 'body{font-family:Arial,sans-serif}',
    js: `const map={trend:'Use a line chart',parts:'Use a pie/stacked bar carefully',compare:'Use a bar chart'};
const sync=()=>out.textContent=map[q.value];
q.onchange=sync; sync();`
  } : {
    html: `<h3>${t.title}</h3><p>Write one insight sentence:</p>
<input id="i" style="width:95%" placeholder="Insight: ..."/>
<button id="go">Check</button><p id="out"></p>`,
    css: 'body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
    js: `document.getElementById('go').onclick=()=>{
  out.textContent = i.value.trim().length<12 ? 'Make the insight more specific.' : 'Good — pair it with a chart and an action.';
};`
  })]
}));

/* ---------- App Development ---------- */
const appTitles = [
  { title: 'Mobile product thinking', summary: 'Design for thumbs, offline moments, and short sessions.' },
  { title: 'UI/UX patterns for apps', summary: 'Navigation, feedback, and accessibility on small screens.' },
  { title: 'App architecture basics', summary: 'Separate UI, state, and data layers cleanly.' },
  { title: 'Screens, navigation & stacks', summary: 'Move between screens without losing user context.' },
  { title: 'State management intro', summary: 'Local state vs shared app state.' },
  { title: 'Forms & validation on mobile', summary: 'Helpful errors, keyboards, and accessibility.' },
  { title: 'Networking & REST from apps', summary: 'Fetch APIs safely with loading and offline UX.' },
  { title: 'Local storage & caching', summary: 'Persist sessions and light data on device.' },
  { title: 'Android, iOS & cross-platform choices', summary: 'When Kotlin/Swift vs Flutter/React Native fits.' },
  { title: 'Debugging & device testing', summary: 'Logs, emulators, and real-device checks.' },
  { title: 'Store readiness checklist', summary: 'Icons, privacy, permissions, and release notes.' },
  { title: 'Capstone MVP build', summary: 'Ship a vertical slice: auth/list/detail/action.' }
];

const appRicher = appTitles.map((t, i) => ({
  content: `## ${t.title}\n\n${t.summary}\n\n### Mobile constraints\n- Small screen\n- Intermittent network\n- Interrupted sessions\n- Battery & performance\n\nBuild the **happy path** first, then harden edge cases.`,
  keyPoints: ['Design for interruption', 'Clear navigation', 'Loading & empty states', 'Test on a real phone', 'Keep MVP narrow'],
  tryIt: [tryIt(`app${i + 1}`, `Try it: ${t.title}`, 'Mobile-oriented micro demo.', i === 3 ? {
    html: `<div class="phone"><div id="screen">Home</div>
<button data-g="Home">Home</button>
<button data-g="Profile">Profile</button>
<button data-g="Settings">Settings</button></div>`,
    css: '.phone{width:260px;border:2px solid #0b2a8f;border-radius:16px;padding:12px;font-family:Arial,sans-serif}#screen{min-height:120px;background:#eff6ff;padding:12px;margin-bottom:8px;border-radius:8px}button{margin-right:4px}',
    js: `document.querySelectorAll('button[data-g]').forEach(b=>b.onclick=()=>{screen.textContent=b.dataset.g+' screen';});`
  } : i === 6 ? {
    html: `<button id="go">Fetch status</button><p id="out">Idle</p>`,
    css: 'body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}',
    js: `document.getElementById('go').onclick=async()=>{
  out.textContent='Loading…';
  await new Promise(r=>setTimeout(r,600));
  out.textContent='200 OK — show data + pull-to-refresh later';
};`
  } : {
    html: `<div class="phone"><h3>${t.title}</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
    css: '.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}',
    js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
  })]
}));

const curricula = [
  { file: 'dataScienceLms.js', exportName: 'DATA_SCIENCE_LMS_CHAPTERS', chapters: makeChapters('ds', dsTitles, dsRicher) },
  { file: 'digitalMarketingLms.js', exportName: 'DIGITAL_MARKETING_LMS_CHAPTERS', chapters: makeChapters('dm', dmTitles, dmRicher) },
  { file: 'dataAnalyticsLms.js', exportName: 'DATA_ANALYTICS_LMS_CHAPTERS', chapters: makeChapters('da', daTitles, daRicher) },
  { file: 'appDevelopmentLms.js', exportName: 'APP_DEV_LMS_CHAPTERS', chapters: makeChapters('ad', appTitles, appRicher) }
];

const outDir = path.join(__dirname, '..', 'data');
for (const c of curricula) {
  // rebuild chapters with richer overrides already applied inside makeChapters
  const content = emitFile(c.exportName, c.chapters);
  fs.writeFileSync(path.join(outDir, c.file), content, 'utf8');
  console.log('Wrote', c.file, c.chapters.length);
}

fs.writeFileSync(
  path.join(outDir, 'lmsCatalog.js'),
  `const { FULLSTACK_LMS_CHAPTERS, LMS_CONTENT_VERSION: FS_V } = require('./fullstackLms');
const { DATA_SCIENCE_LMS_CHAPTERS, LMS_CONTENT_VERSION: DS_V } = require('./dataScienceLms');
const { DIGITAL_MARKETING_LMS_CHAPTERS, LMS_CONTENT_VERSION: DM_V } = require('./digitalMarketingLms');
const { DATA_ANALYTICS_LMS_CHAPTERS, LMS_CONTENT_VERSION: DA_V } = require('./dataAnalyticsLms');
const { APP_DEV_LMS_CHAPTERS, LMS_CONTENT_VERSION: AD_V } = require('./appDevelopmentLms');

const LMS_BY_SLUG = {
  'full-stack-development': { chapters: FULLSTACK_LMS_CHAPTERS, version: FS_V },
  'data-science-with-ai-ml': { chapters: DATA_SCIENCE_LMS_CHAPTERS, version: DS_V },
  'digital-marketing': { chapters: DIGITAL_MARKETING_LMS_CHAPTERS, version: DM_V },
  'data-analytics': { chapters: DATA_ANALYTICS_LMS_CHAPTERS, version: DA_V },
  'app-development-android-ios': { chapters: APP_DEV_LMS_CHAPTERS, version: AD_V }
};

module.exports = { LMS_BY_SLUG };
`,
  'utf8'
);
console.log('Wrote lmsCatalog.js');
