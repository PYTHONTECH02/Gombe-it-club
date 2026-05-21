export const CYBER_TRACKS = [
  {
    id: 'recon',
    title: 'Recon & Basics',
    theme: 'green',
    lessons: [
      { id: 1, title: 'How the Internet Works', desc: 'DNS, IP addresses, TCP/IP, ports' },
      { id: 2, title: 'Linux Terminal Basics', desc: 'pwd, ls, cd, chmod, sudo, netstat' },
      { id: 3, title: 'Networking Fundamentals', desc: 'OSI 7 layers, HTTP/HTTPS/SSH, firewalls, Wireshark' },
      { id: 4, title: 'OSINT & Reconnaissance', desc: 'Google dorks, Shodan, HaveIBeenPwned, whois' },
      { id: 5, title: 'Threats, Attacks & Social Engineering', desc: 'malware types, phishing, MITM, SQL injection' }
    ]
  },
  {
    id: 'defence',
    title: 'Defence & Crypto',
    theme: 'yellow',
    lessons: [
      { id: 1, title: 'Cryptography Fundamentals', desc: 'symmetric vs asymmetric, AES, RSA, hashing' },
      { id: 2, title: 'Web Security Basics', desc: 'OWASP Top 10, XSS, CSRF, input validation' },
      { id: 3, title: 'Password Security & Auth', desc: 'hashing, salting, MFA, password managers' },
      { id: 4, title: 'Network Defence', desc: 'IDS/IPS, VPNs, DMZ, hardening' },
      { id: 5, title: 'Incident Response', desc: 'IR lifecycle, forensics basics, log analysis' }
    ]
  },
  {
    id: 'attack',
    title: 'Attack & CTF',
    theme: 'red',
    lessons: [
      { id: 1, title: 'Ethical Hacking Intro', desc: 'phases: recon, scan, exploit, post-exploit, report' },
      { id: 2, title: 'Scanning & Enumeration', desc: 'Nmap, Gobuster, Nikto, banner grabbing' },
      { id: 3, title: 'Exploitation Basics', desc: 'Metasploit, CVEs, buffer overflows intro' },
      { id: 4, title: 'CTF Strategies', desc: 'challenge types, tools: BurpSuite, Ghidra, CyberChef' },
      { id: 5, title: 'Report Writing', desc: 'executive summary, findings, CVSS scoring' }
    ]
  }
];

export const CODING_TRACKS = [
  {
    id: 'beginner',
    title: 'Foundations',
    theme: 'green',
    lessons: [
      { id: 1, title: 'What is a Computer?', desc: 'IPO cycle, CPU/RAM/Storage, binary, hardware vs software' },
      { id: 2, title: 'Intro to HTML', desc: 'tags, structure, headings, links, images, lists' },
      { id: 3, title: 'Styling with CSS', desc: 'selectors, box model, 3 ways to add CSS, classes vs IDs' },
      { id: 4, title: 'Python Basics', desc: 'print, variables, data types, input(), arithmetic' },
      { id: 5, title: 'Logic & Conditionals', desc: 'if/elif/else, comparison operators, loops' }
    ]
  },
  {
    id: 'intermediate',
    title: 'Building Up',
    theme: 'yellow',
    lessons: [
      { id: 1, title: 'JavaScript Fundamentals', desc: 'let/const/var, functions, arrays, objects' },
      { id: 2, title: 'DOM Manipulation', desc: 'getElementById, querySelector, events, createElement' },
      { id: 3, title: 'Python Functions & Lists', desc: 'def, return, append, comprehensions, dicts' },
      { id: 4, title: 'APIs & JSON', desc: 'fetch, async/await, response.json(), try/catch' },
      { id: 5, title: 'Git & Version Control', desc: 'init, add, commit, push, clone, branch' }
    ]
  },
  {
    id: 'pro',
    title: 'Advanced',
    theme: 'red',
    lessons: [
      { id: 1, title: 'React & Components', desc: 'JSX, useState, props vs state, re-renders' },
      { id: 2, title: 'Databases & SQL', desc: 'CREATE TABLE, SELECT, WHERE, INSERT, UPDATE, DELETE' },
      { id: 3, title: 'Algorithms & Big O', desc: 'O(1), O(n), O(n²), binary search, bubble sort' },
      { id: 4, title: 'Authentication & Security', desc: 'sessions, JWT, OAuth, HTTPS, SQL injection prevention' },
      { id: 5, title: 'Deploying Your App', desc: 'GitHub Pages, Vercel, env vars, CI/CD basics' }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  { q: "What does this concept refer to?", options: ["A", "B", "C", "D"], correct: 0 },
  { q: "Which tool is best used for this?", options: ["A", "B", "C", "D"], correct: 1 },
  { q: "What is the primary benefit?", options: ["A", "B", "C", "D"], correct: 2 },
  { q: "How do you implement this?", options: ["A", "B", "C", "D"], correct: 3 },
  { q: "Which of these is NOT true?", options: ["A", "B", "C", "D"], correct: 0 }
];

export const MOCK_EXAM_QUESTIONS = Array(10).fill(null).map((_, i) => ({
  id: i,
  q: `Exam Question ${i + 1}`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: Math.floor(Math.random() * 4)
}));
