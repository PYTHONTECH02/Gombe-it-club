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

export const CODING_LESSON_QUIZZES: Record<string, Record<number, any[]>> = {
  beginner: {
    1: [
      { q: 'Which part of a computer performs most calculations?', options: ['CPU', 'Monitor', 'Keyboard', 'Speaker'], correct: 0 },
      { q: 'RAM is best described as...', options: ['Permanent storage', 'Temporary working memory', 'A web browser', 'A power cable'], correct: 1 },
      { q: 'The input-process-output cycle means a computer...', options: ['Only prints paper', 'Receives data, works on it, and returns a result', 'Cannot store files', 'Only runs games'], correct: 1 },
      { q: 'Binary uses which digits?', options: ['0 and 1', '1 and 2', 'A and B', '9 and 10'], correct: 0 },
      { q: 'Which item is software?', options: ['Mouse', 'CPU fan', 'Web browser', 'Hard drive'], correct: 2 },
    ],
    2: [
      { q: 'Which tag creates the largest default heading?', options: ['<p>', '<h1>', '<title>', '<img>'], correct: 1 },
      { q: 'What does HTML mainly describe?', options: ['Page structure', 'Database passwords', 'Computer voltage', 'Internet speed'], correct: 0 },
      { q: 'Which tag creates a link?', options: ['<a>', '<linkbox>', '<url>', '<jump>'], correct: 0 },
      { q: 'Which attribute gives an image its file path?', options: ['href', 'class', 'src', 'alt'], correct: 2 },
      { q: 'Where does visible page content usually go?', options: ['Inside <body>', 'Inside <head>', 'Before <!doctype>', 'Inside <meta>'], correct: 0 },
    ],
    3: [
      { q: 'What does CSS control?', options: ['Page style and layout', 'User passwords', 'Server memory', 'File compression'], correct: 0 },
      { q: 'Which selector targets a class named card?', options: ['#card', '.card', 'card()', '<card>'], correct: 1 },
      { q: 'The CSS box model includes...', options: ['Margin, border, padding, content', 'CPU, RAM, SSD, GPU', 'DNS, IP, TCP, UDP', 'Rows, tables, joins, keys'], correct: 0 },
      { q: 'Which property changes text color?', options: ['font-size', 'display', 'color', 'gap'], correct: 2 },
      { q: 'Which value makes a flex container?', options: ['display: flex', 'position: text', 'box: row', 'align: css'], correct: 0 },
    ],
    4: [
      { q: 'Which Python command displays output?', options: ['show()', 'print()', 'echo()', 'display()'], correct: 1 },
      { q: 'Which is a valid variable assignment?', options: ['name = "Amina"', 'let name := Amina', 'name equals Amina', 'var name -> Amina'], correct: 0 },
      { q: 'What type is 42?', options: ['String', 'Boolean', 'Integer', 'List'], correct: 2 },
      { q: 'Which function can read typed input?', options: ['input()', 'ask()', 'scan()', 'readline() only'], correct: 0 },
      { q: 'What does 7 % 3 return?', options: ['1', '2', '3', '21'], correct: 0 },
    ],
    5: [
      { q: 'Which keyword starts a Python condition?', options: ['when', 'if', 'check', 'case'], correct: 1 },
      { q: 'Which operator means equal value comparison?', options: ['=', '==', '=>', '=== only'], correct: 1 },
      { q: 'A loop is useful when you need to...', options: ['Repeat steps', 'Delete Python', 'Turn off CSS', 'Create a monitor'], correct: 0 },
      { q: 'Which loop runs over every item in a list?', options: ['for item in list:', 'repeat list', 'loop each(list)', 'while list as item'], correct: 0 },
      { q: 'What should indentation show in Python?', options: ['Code blocks', 'File size', 'Internet speed', 'HTML tags'], correct: 0 },
    ],
  },
};

export const CYBER_LESSON_QUIZZES: Record<string, Record<number, any[]>> = {
  recon: {
    1: [
      { q: 'DNS helps convert a domain name into...', options: ['An IP address', 'A password', 'A firewall rule', 'A USB port'], correct: 0 },
      { q: 'HTTPS normally uses encryption to protect...', options: ['Data in transit', 'Screen brightness', 'Keyboard layout', 'Battery charge'], correct: 0 },
      { q: 'Which protocol is commonly used for web pages?', options: ['HTTP', 'SMTP only', 'Bluetooth', 'HDMI'], correct: 0 },
      { q: 'A port number helps identify...', options: ['A service on a device', 'A monitor size', 'A user age', 'A file color'], correct: 0 },
      { q: 'TCP is known for...', options: ['Reliable ordered delivery', 'Styling HTML', 'Encrypting passwords by itself', 'Drawing images'], correct: 0 },
    ],
    2: [
      { q: 'Which command lists files in a Linux directory?', options: ['ls', 'pwd', 'whoami', 'mkdir'], correct: 0 },
      { q: 'What does cd do?', options: ['Changes directory', 'Copies DNS', 'Deletes users', 'Checks viruses automatically'], correct: 0 },
      { q: 'chmod changes...', options: ['File permissions', 'IP address ownership', 'Browser cache', 'Monitor color'], correct: 0 },
      { q: 'Which command shows the current directory?', options: ['pwd', 'dirnow', 'pathfind', 'locate-me'], correct: 0 },
      { q: 'sudo is used to...', options: ['Run a command with elevated privileges', 'Open a website', 'Create CSS', 'Start a game'], correct: 0 },
    ],
  },
};

const fallbackCodingQuiz = [
  { q: 'Which habit helps learners debug code?', options: ['Read the error message carefully', 'Delete every file', 'Guess randomly', 'Ignore line numbers'], correct: 0 },
  { q: 'Why should variable names be clear?', options: ['They make code easier to understand', 'They make screens brighter', 'They replace tests', 'They hide bugs'], correct: 0 },
  { q: 'What is a function?', options: ['A reusable block of instructions', 'A computer cable', 'A CSS color', 'A database password'], correct: 0 },
  { q: 'Which tool helps track code changes?', options: ['Git', 'Paint', 'Calculator', 'Volume mixer'], correct: 0 },
  { q: 'What should you do after writing a small feature?', options: ['Test it', 'Never run it', 'Remove comments only', 'Rename the browser'], correct: 0 },
];

const fallbackCyberQuiz = [
  { q: 'What is the safest way to practice cybersecurity?', options: ['Use legal labs and owned systems', 'Attack random websites', 'Share passwords', 'Bypass school rules'], correct: 0 },
  { q: 'Which is a strong password habit?', options: ['Use a password manager', 'Reuse one password everywhere', 'Use your birthday', 'Post it publicly'], correct: 0 },
  { q: 'What does MFA add?', options: ['Another proof of identity', 'A faster keyboard', 'A public password', 'A weaker login'], correct: 0 },
  { q: 'A phishing message tries to...', options: ['Trick someone into giving access or information', 'Improve CSS', 'Install updates safely', 'Teach HTML'], correct: 0 },
  { q: 'Security reports should be...', options: ['Clear, truthful, and reproducible', 'Secret from the owner', 'Full of guesses', 'Written after deleting evidence'], correct: 0 },
];

export const getCodingLessonQuiz = (trackId: string, lessonId: number) =>
  CODING_LESSON_QUIZZES[trackId]?.[lessonId] || fallbackCodingQuiz;

export const getCyberLessonQuiz = (trackId: string, lessonId: number) =>
  CYBER_LESSON_QUIZZES[trackId]?.[lessonId] || fallbackCyberQuiz;

export const CODING_EXAM_QUESTIONS = [
  { q: 'Which HTML element contains visible page content?', options: ['<body>', '<head>', '<meta>', '<script-only>'], correct: 0 },
  { q: 'Which CSS selector targets id="main"?', options: ['#main', '.main', 'main()', '<main>'], correct: 0 },
  { q: 'Which JavaScript keyword declares a variable that can change?', options: ['let', 'fixed', 'def', 'className'], correct: 0 },
  { q: 'What does JSON commonly represent?', options: ['Structured data', 'A monitor cable', 'A CPU instruction only', 'A CSS animation'], correct: 0 },
  { q: 'What does git commit do?', options: ['Records a snapshot of changes', 'Publishes a website automatically every time', 'Deletes a branch', 'Formats HTML only'], correct: 0 },
  { q: 'Which React hook stores component state?', options: ['useState', 'useStyle', 'useHTML', 'useDatabase'], correct: 0 },
  { q: 'Which SQL command reads rows?', options: ['SELECT', 'PAINT', 'OPEN', 'STYLE'], correct: 0 },
  { q: 'O(n) means work grows...', options: ['Linearly with input size', 'Never at all', 'Only on Fridays', 'As a CSS value'], correct: 0 },
  { q: 'Why validate form input?', options: ['To reduce bad data and security risk', 'To slow every user down', 'To replace HTTPS', 'To avoid using labels'], correct: 0 },
  { q: 'An environment variable is useful for...', options: ['Configuration such as API URLs or secrets', 'Changing a button color only', 'Making HTML optional', 'Deleting builds'], correct: 0 },
];

export const CYBER_EXAM_QUESTIONS = [
  { q: 'Which tool is commonly used to scan network ports?', options: ['Nmap', 'Figma', 'Excel', 'Vite'], correct: 0 },
  { q: 'What does the principle of least privilege mean?', options: ['Give only the access needed', 'Make everyone admin', 'Disable passwords', 'Share root accounts'], correct: 0 },
  { q: 'Hashing passwords is useful because...', options: ['The original password is not stored in plain text', 'It makes passwords public', 'It removes login checks', 'It opens ports'], correct: 0 },
  { q: 'XSS usually targets...', options: ['Users through injected browser scripts', 'Only printer paper', 'CPU fan speed', 'HTML comments only'], correct: 0 },
  { q: 'What should happen first in incident response?', options: ['Identify and contain the issue', 'Delete all logs', 'Blame a user', 'Publish private data'], correct: 0 },
  { q: 'OSINT means gathering information from...', options: ['Open sources', 'Random password guessing', 'Private accounts without consent', 'Malware only'], correct: 0 },
  { q: 'A firewall mainly helps...', options: ['Control allowed network traffic', 'Write React components', 'Compress images', 'Store passwords'], correct: 0 },
  { q: 'SQL injection is reduced by...', options: ['Parameterized queries', 'String-building raw user input', 'Public admin passwords', 'Disabling HTTPS'], correct: 0 },
  { q: 'Responsible disclosure means...', options: ['Reporting a vulnerability through an approved process', 'Posting exploit details first', 'Keeping stolen data', 'Attacking more systems'], correct: 0 },
  { q: 'Which activity is appropriate for students?', options: ['Practicing in CTF labs with permission', 'Scanning public targets without permission', 'Phishing classmates', 'Sharing exploit code against school systems'], correct: 0 },
];
