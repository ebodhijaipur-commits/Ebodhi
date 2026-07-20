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

const APP_DEV_LMS_CHAPTERS = [
  chapter({
    id: "ad-1",
    title: "Mobile product thinking",
    order: 1,
    track: "shared",
    summary: "Design for thumbs, offline moments, and short sessions.",
    content: `
## Mobile product thinking

Design for thumbs, offline moments, and short sessions.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app1", "Try it: Mobile product thinking", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Mobile product thinking</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Mobile product thinking on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Mobile product thinking snapshot",
      code: `// Example notes for: Mobile product thinking
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Mobile product thinking\"?", ["Design for thumbs, offline moments, and short sessions.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-2",
    title: "UI/UX patterns for apps",
    order: 2,
    track: "shared",
    summary: "Navigation, feedback, and accessibility on small screens.",
    content: `
## UI/UX patterns for apps

Navigation, feedback, and accessibility on small screens.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app2", "Try it: UI/UX patterns for apps", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>UI/UX patterns for apps</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice UI/UX patterns for apps on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "UI/UX patterns for apps snapshot",
      code: `// Example notes for: UI/UX patterns for apps
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"UI/UX patterns for apps\"?", ["Navigation, feedback, and accessibility on small screens.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-3",
    title: "App architecture basics",
    order: 3,
    track: "shared",
    summary: "Separate UI, state, and data layers cleanly.",
    content: `
## App architecture basics

Separate UI, state, and data layers cleanly.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app3", "Try it: App architecture basics", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>App architecture basics</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice App architecture basics on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "App architecture basics snapshot",
      code: `// Example notes for: App architecture basics
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"App architecture basics\"?", ["Separate UI, state, and data layers cleanly.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-4",
    title: "Screens, navigation & stacks",
    order: 4,
    track: "shared",
    summary: "Move between screens without losing user context.",
    content: `
## Screens, navigation & stacks

Move between screens without losing user context.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app4", "Try it: Screens, navigation & stacks", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><div id="screen">Home</div>
<button data-g="Home">Home</button>
<button data-g="Profile">Profile</button>
<button data-g="Settings">Settings</button></div>`,
      css: `.phone{width:260px;border:2px solid #0b2a8f;border-radius:16px;padding:12px;font-family:Arial,sans-serif}#screen{min-height:120px;background:#eff6ff;padding:12px;margin-bottom:8px;border-radius:8px}button{margin-right:4px}`,
      js: `document.querySelectorAll('button[data-g]').forEach(b=>b.onclick=()=>{screen.textContent=b.dataset.g+' screen';});`
    })
    ],
    localBuild: {
      goal: "Practice Screens, navigation & stacks on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Screens, navigation & stacks snapshot",
      code: `// Example notes for: Screens, navigation & stacks
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Screens, navigation & stacks\"?", ["Move between screens without losing user context.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-5",
    title: "State management intro",
    order: 5,
    track: "shared",
    summary: "Local state vs shared app state.",
    content: `
## State management intro

Local state vs shared app state.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app5", "Try it: State management intro", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>State management intro</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice State management intro on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "State management intro snapshot",
      code: `// Example notes for: State management intro
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"State management intro\"?", ["Local state vs shared app state.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-6",
    title: "Forms & validation on mobile",
    order: 6,
    track: "shared",
    summary: "Helpful errors, keyboards, and accessibility.",
    content: `
## Forms & validation on mobile

Helpful errors, keyboards, and accessibility.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app6", "Try it: Forms & validation on mobile", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Forms & validation on mobile</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Forms & validation on mobile on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Forms & validation on mobile snapshot",
      code: `// Example notes for: Forms & validation on mobile
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Forms & validation on mobile\"?", ["Helpful errors, keyboards, and accessibility.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-7",
    title: "Networking & REST from apps",
    order: 7,
    track: "shared",
    summary: "Fetch APIs safely with loading and offline UX.",
    content: `
## Networking & REST from apps

Fetch APIs safely with loading and offline UX.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app7", "Try it: Networking & REST from apps", "Mobile-oriented micro demo.", {
      html: `<button id="go">Fetch status</button><p id="out">Idle</p>`,
      css: `body{font-family:Arial,sans-serif}button{padding:8px 12px;background:#0b2a8f;color:#fff;border:0}`,
      js: `document.getElementById('go').onclick=async()=>{
  out.textContent='Loading…';
  await new Promise(r=>setTimeout(r,600));
  out.textContent='200 OK — show data + pull-to-refresh later';
};`
    })
    ],
    localBuild: {
      goal: "Practice Networking & REST from apps on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Networking & REST from apps snapshot",
      code: `// Example notes for: Networking & REST from apps
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Networking & REST from apps\"?", ["Fetch APIs safely with loading and offline UX.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-8",
    title: "Local storage & caching",
    order: 8,
    track: "shared",
    summary: "Persist sessions and light data on device.",
    content: `
## Local storage & caching

Persist sessions and light data on device.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app8", "Try it: Local storage & caching", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Local storage & caching</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Local storage & caching on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Local storage & caching snapshot",
      code: `// Example notes for: Local storage & caching
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Local storage & caching\"?", ["Persist sessions and light data on device.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-9",
    title: "Android, iOS & cross-platform choices",
    order: 9,
    track: "shared",
    summary: "When Kotlin/Swift vs Flutter/React Native fits.",
    content: `
## Android, iOS & cross-platform choices

When Kotlin/Swift vs Flutter/React Native fits.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app9", "Try it: Android, iOS & cross-platform choices", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Android, iOS & cross-platform choices</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Android, iOS & cross-platform choices on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Android, iOS & cross-platform choices snapshot",
      code: `// Example notes for: Android, iOS & cross-platform choices
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Android, iOS & cross-platform choices\"?", ["When Kotlin/Swift vs Flutter/React Native fits.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-10",
    title: "Debugging & device testing",
    order: 10,
    track: "shared",
    summary: "Logs, emulators, and real-device checks.",
    content: `
## Debugging & device testing

Logs, emulators, and real-device checks.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app10", "Try it: Debugging & device testing", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Debugging & device testing</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Debugging & device testing on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Debugging & device testing snapshot",
      code: `// Example notes for: Debugging & device testing
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Debugging & device testing\"?", ["Logs, emulators, and real-device checks.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-11",
    title: "Store readiness checklist",
    order: 11,
    track: "shared",
    summary: "Icons, privacy, permissions, and release notes.",
    content: `
## Store readiness checklist

Icons, privacy, permissions, and release notes.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app11", "Try it: Store readiness checklist", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Store readiness checklist</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Store readiness checklist on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Store readiness checklist snapshot",
      code: `// Example notes for: Store readiness checklist
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Store readiness checklist\"?", ["Icons, privacy, permissions, and release notes.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
  chapter({
    id: "ad-12",
    title: "Capstone MVP build",
    order: 12,
    track: "shared",
    summary: "Ship a vertical slice: auth/list/detail/action.",
    content: `
## Capstone MVP build

Ship a vertical slice: auth/list/detail/action.

### Mobile constraints
- Small screen
- Intermittent network
- Interrupted sessions
- Battery & performance

Build the **happy path** first, then harden edge cases.
`,
    keyPoints: ["Design for interruption","Clear navigation","Loading & empty states","Test on a real phone","Keep MVP narrow"],
    tryIt: [
    tryIt("app12", "Try it: Capstone MVP build", "Mobile-oriented micro demo.", {
      html: `<div class="phone"><h3>Capstone MVP build</h3><p id="out">Tap improve</p><button id="go">Improve UX</button></div>`,
      css: `.phone{max-width:280px;border:2px solid #cbd5e1;border-radius:16px;padding:14px;font-family:Arial,sans-serif}button{padding:8px 12px;background:#f59e0b;border:0;font-weight:bold}`,
      js: `const tips=['Add loading state','Increase tap targets','Show empty state','Save draft offline'];
let i=0; document.getElementById('go').onclick=()=>{out.textContent=tips[i%tips.length]; i++;};`
    })
    ],
    localBuild: {
      goal: "Practice Capstone MVP build on your machine and take notes.",
      commands: ["mkdir practice && cd practice","code notes.md"],
      expectedUrl: "local notes / tool of choice",
      checklist: ["Notes saved","Try it completed","Ready for quiz"]
    },
    example: {
      title: "Capstone MVP build snapshot",
      code: `// Example notes for: Capstone MVP build
// 1) Concept
// 2) Why it matters
// 3) Mini practice`,
      explanation: "Keep short notes after every chapter."
    },
    questions: [
      q("Which best describes \"Capstone MVP build\"?", ["Ship a vertical slice: auth/list/detail/action.…","A CSS property","A Mongo index type","An SSL cipher"], 0, "Match the chapter summary."),
      q("How should you practice each chapter?", ["Only watch videos","Read, try the editor, then build locally","Skip quizzes","Copy without reading"], 1, "Active practice sticks."),
      q("Key points sections help you…", ["Ignore details","Remember the essentials","Skip Try it","Avoid local work"], 1, "They summarize must-know ideas."),
      q("Passing the quiz means…", ["You finished the chapter requirements","You deployed to production","You bought a domain","You skipped content"], 0, "Quiz pass unlocks the next lesson."),
      q("If stuck, you should…", ["Guess forever","Re-read, use Try it, then ask for help","Delete the course","Change the skin only"], 1, "Iterate and seek help.")
    ]
  }),
];

module.exports = { APP_DEV_LMS_CHAPTERS, LMS_CONTENT_VERSION };
