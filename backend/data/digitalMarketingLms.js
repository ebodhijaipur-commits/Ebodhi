const LMS_CONTENT_VERSION = 1;

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

const DIGITAL_MARKETING_LMS_CHAPTERS = [
  chapter({
    id: "dm-1",
    title: "Marketing funnel & journey",
    order: 1,
    track: "shared",
    summary: "Map awareness → consideration → conversion → retention.",
    content: `
## Marketing funnel & journey

Map awareness → consideration → conversion → retention.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm1", "Try it: Marketing funnel & journey", "Hands-on micro tool for this topic.", {
      html: `<h3>Marketing funnel & journey</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Marketing funnel & journey on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Marketing funnel & journey snapshot",
      code: `// Example notes for: Marketing funnel & journey
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Marketing funnel & journey\"?", ["Map awareness → consideration → conversion → retention.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-2",
    title: "Brand messaging & personas",
    order: 2,
    track: "shared",
    summary: "Write offers that speak to a real buyer, not everyone.",
    content: `
## Brand messaging & personas

Write offers that speak to a real buyer, not everyone.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm2", "Try it: Brand messaging & personas", "Hands-on micro tool for this topic.", {
      html: `<h3>Brand messaging & personas</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Brand messaging & personas on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Brand messaging & personas snapshot",
      code: `// Example notes for: Brand messaging & personas
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Brand messaging & personas\"?", ["Write offers that speak to a real buyer, not everyone.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-3",
    title: "SEO foundations",
    order: 3,
    track: "shared",
    summary: "Help search engines and humans understand your pages.",
    content: `
## SEO foundations

Help search engines and humans understand your pages.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm3", "Try it: SEO foundations", "Hands-on micro tool for this topic.", {
      html: `<h3>SEO foundations</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice SEO foundations on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "SEO foundations snapshot",
      code: `// Example notes for: SEO foundations
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"SEO foundations\"?", ["Help search engines and humans understand your pages.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-4",
    title: "Keyword research mindset",
    order: 4,
    track: "shared",
    summary: "Find queries with intent you can win.",
    content: `
## Keyword research mindset

Find queries with intent you can win.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm4", "Try it: Keyword research mindset", "Hands-on micro tool for this topic.", {
      html: `<h3>Keyword research mindset</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Keyword research mindset on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Keyword research mindset snapshot",
      code: `// Example notes for: Keyword research mindset
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Keyword research mindset\"?", ["Find queries with intent you can win.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-5",
    title: "On-page SEO & content structure",
    order: 5,
    track: "shared",
    summary: "Titles, headings, internal links, and readable pages.",
    content: `
## On-page SEO & content structure

Titles, headings, internal links, and readable pages.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm5", "Try it: On-page SEO & content structure", "Hands-on micro tool for this topic.", {
      html: `<label>SEO title <input id="t" maxlength="70" style="width:95%" value="Full Stack Course in Jaipur | eBodhi"/></label>
<p>Length: <strong id="n">0</strong>/60 recommended</p>`,
      css: `body{font-family:Arial,sans-serif}input{padding:8px}`,
      js: `const sync=()=>{n.textContent=t.value.length; n.style.color=t.value.length>60?'#b91c1c':'#15803d';};
t.oninput=sync; sync();`
    })
    ],
    localBuild: {
      goal: "Practice On-page SEO & content structure on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "On-page SEO & content structure snapshot",
      code: `// Example notes for: On-page SEO & content structure
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"On-page SEO & content structure\"?", ["Titles, headings, internal links, and readable pages.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-6",
    title: "Content systems that scale",
    order: 6,
    track: "shared",
    summary: "Pillars, clusters, calendars, and repurposing.",
    content: `
## Content systems that scale

Pillars, clusters, calendars, and repurposing.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm6", "Try it: Content systems that scale", "Hands-on micro tool for this topic.", {
      html: `<h3>Content systems that scale</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Content systems that scale on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Content systems that scale snapshot",
      code: `// Example notes for: Content systems that scale
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Content systems that scale\"?", ["Pillars, clusters, calendars, and repurposing.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-7",
    title: "Social media strategy",
    order: 7,
    track: "shared",
    summary: "Pick platforms for distribution, not vanity.",
    content: `
## Social media strategy

Pick platforms for distribution, not vanity.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm7", "Try it: Social media strategy", "Hands-on micro tool for this topic.", {
      html: `<h3>Social media strategy</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Social media strategy on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Social media strategy snapshot",
      code: `// Example notes for: Social media strategy
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Social media strategy\"?", ["Pick platforms for distribution, not vanity.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-8",
    title: "Paid ads fundamentals",
    order: 8,
    track: "shared",
    summary: "Budgets, bidding basics, and campaign structure.",
    content: `
## Paid ads fundamentals

Budgets, bidding basics, and campaign structure.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm8", "Try it: Paid ads fundamentals", "Hands-on micro tool for this topic.", {
      html: `<h3>Paid ads fundamentals</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Paid ads fundamentals on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Paid ads fundamentals snapshot",
      code: `// Example notes for: Paid ads fundamentals
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Paid ads fundamentals\"?", ["Budgets, bidding basics, and campaign structure.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-9",
    title: "Creative testing & hooks",
    order: 9,
    track: "shared",
    summary: "Test angles quickly; kill losers early.",
    content: `
## Creative testing & hooks

Test angles quickly; kill losers early.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm9", "Try it: Creative testing & hooks", "Hands-on micro tool for this topic.", {
      html: `<h3>Creative testing & hooks</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Creative testing & hooks on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Creative testing & hooks snapshot",
      code: `// Example notes for: Creative testing & hooks
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Creative testing & hooks\"?", ["Test angles quickly; kill losers early.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-10",
    title: "Analytics & attribution basics",
    order: 10,
    track: "shared",
    summary: "UTMs, conversions, and honest reporting.",
    content: `
## Analytics & attribution basics

UTMs, conversions, and honest reporting.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm10", "Try it: Analytics & attribution basics", "Hands-on micro tool for this topic.", {
      html: `<label>Campaign <input id="c" value="spring_enroll"/></label>
<label>Source <input id="s" value="instagram"/></label>
<label>Medium <input id="m" value="paid_social"/></label>
<button id="go">Build UTM</button><pre id="out"></pre>`,
      css: `body{font-family:Arial,sans-serif}label{display:block;margin:6px 0}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}pre{background:#f1f5f9;padding:10px;word-break:break-all}`,
      js: `document.getElementById('go').onclick=()=>{
  const url='https://ebodhi.com/contact?utm_campaign='+encodeURIComponent(c.value)+'&utm_source='+encodeURIComponent(s.value)+'&utm_medium='+encodeURIComponent(m.value);
  out.textContent=url;
};`
    })
    ],
    localBuild: {
      goal: "Practice Analytics & attribution basics on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Analytics & attribution basics snapshot",
      code: `// Example notes for: Analytics & attribution basics
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Analytics & attribution basics\"?", ["UTMs, conversions, and honest reporting.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-11",
    title: "Landing pages that convert",
    order: 11,
    track: "shared",
    summary: "One page, one promise, one clear CTA.",
    content: `
## Landing pages that convert

One page, one promise, one clear CTA.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm11", "Try it: Landing pages that convert", "Hands-on micro tool for this topic.", {
      html: `<h3>Landing page checklist</h3>
<label><input type="checkbox"/> Clear headline</label><br/>
<label><input type="checkbox"/> Social proof</label><br/>
<label><input type="checkbox"/> Single CTA</label><br/>
<label><input type="checkbox"/> Mobile readable</label>
<button id="go">Score</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:10px;padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `document.getElementById('go').onclick=()=>{
  const n=[...document.querySelectorAll('input[type=checkbox]:checked')].length;
  out.textContent='Score '+n+'/4 — improve unchecked items.';
};`
    })
    ],
    localBuild: {
      goal: "Practice Landing pages that convert on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Landing pages that convert snapshot",
      code: `// Example notes for: Landing pages that convert
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Landing pages that convert\"?", ["One page, one promise, one clear CTA.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "dm-12",
    title: "Capstone: campaign plan",
    order: 12,
    track: "shared",
    summary: "Ship a full campaign brief with KPIs and weekly tests.",
    content: `
## Capstone: campaign plan

Ship a full campaign brief with KPIs and weekly tests.

### Why it matters
Marketing without measurement is guessing. Every chapter connects to a KPI you can track.

### Practice habit
- Write the audience
- Write the offer
- Pick one channel
- Define one metric
- Run a small test
`,
    keyPoints: ["Audience clarity first","One primary CTA","Measure weekly","Test creatives","Document learnings"],
    tryIt: [
    tryIt("dm12", "Try it: Capstone: campaign plan", "Hands-on micro tool for this topic.", {
      html: `<h3>Capstone: campaign plan</h3><textarea id="a" rows="4" style="width:95%">Audience: \\nOffer: \\nMetric: </textarea>
<button id="go">Save note</button><p id="out"></p>`,
      css: `body{font-family:Arial,sans-serif}button{margin-top:8px;padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=()=>{out.textContent='Saved ('+a.value.length+' chars). Keep this in your campaign doc.';};`
    })
    ],
    localBuild: {
      goal: "Practice Capstone: campaign plan on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Capstone: campaign plan snapshot",
      code: `// Example notes for: Capstone: campaign plan
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Capstone: campaign plan\"?", ["Ship a full campaign brief with KPIs and weekly tests.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
];

module.exports = { DIGITAL_MARKETING_LMS_CHAPTERS, LMS_CONTENT_VERSION };
