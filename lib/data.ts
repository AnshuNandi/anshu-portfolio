export const GOOG = ['blue', 'red', 'yellow', 'green'] as const
export type GoogColor = (typeof GOOG)[number]

export const swatch: Record<GoogColor, { bg: string; text: string; raw: string }> = {
  blue: { bg: 'bg-goog-blue', text: 'text-goog-blue', raw: '#4285F4' },
  red: { bg: 'bg-goog-red', text: 'text-goog-red', raw: '#EA4335' },
  yellow: { bg: 'bg-goog-yellow', text: 'text-goog-yellow', raw: '#FBBC05' },
  green: { bg: 'bg-goog-green', text: 'text-goog-green', raw: '#34A853' },
}

export const profile = {
  name: 'Anshu Nandi',
  handle: 'AnshuNandi',
  pronouns: 'he/him',
  role: 'Agentic AI & Full-Stack Engineer',
  location: 'Kolkata, India',
  email: 'nandi.anshu712@gmail.com',
  altEmail: 'anshu.nandi07@gmail.com',
  phone: '+91 70038 02901',
  github: 'https://github.com/AnshuNandi',
  linkedin: 'https://linkedin.com/in/anshu-nandi',
  leetcode: 'https://leetcode.com/u/anshunandi/',
  discord: 'https://discordapp.com/users/765922353632772127',
  tagline:
    'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
}

export const roles = [
  'Agentic AI Engineer',
  'Full-Stack Architect',
  'MLOps Practitioner',
  'LangGraph Wrangler',
  'Competitive Programmer',
]

export const stats = [
  { label: 'Contributions / yr', value: '550+', color: 'blue' as GoogColor },
  { label: 'Total Repos', value: '25', color: 'red' as GoogColor },
  { label: 'CGPA (5th Sem)', value: '8.70', color: 'yellow' as GoogColor },
  { label: 'Contest Podiums', value: '02', color: 'green' as GoogColor },
]

export const about = {
  paragraphs: [
    "B.Tech CSE undergrad at RCCIIT (Class of '27). I live at the intersection of robust software engineering, scalable cloud infrastructure and applied machine learning — and I care a great deal about how the result looks and feels.",
    'Right now I am deep in Agentic AI with LangGraph and end-to-end MLOps, while learning distributed systems, real-time WebRTC and ethical hacking. I previously architected EPIC, an AI-assisted government grievance platform, at Webel.',
  ],
  facts: [
    { k: 'Focus', v: 'Agentic AI (LangGraph) & End-to-End MLOps', color: 'blue' as GoogColor },
    {
      k: 'Learning',
      v: 'Distributed Systems, Real-Time WebRTC, Ethical Hacking',
      color: 'red' as GoogColor,
    },
    {
      k: 'Hobbies',
      v: 'Graphic Design, Video Editing, Chess, Competitive Programming',
      color: 'yellow' as GoogColor,
    },
    { k: 'Open to', v: 'SDE / AI Engineering internships & new grad roles', color: 'green' as GoogColor },
  ],
}

export const skillGroups = [
  {
    title: 'AI & Machine Learning',
    color: 'blue' as GoogColor,
    icon: 'brain',
    items: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI (LLMs, RAG)',
      'Agentic AI',
      'PyTorch',
      'TensorFlow',
      'LangChain',
      'LangGraph',
      'MediaPipe',
      'OpenCV',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'EDA',
    ],
  },
  {
    title: 'Frontend & Backend',
    color: 'red' as GoogColor,
    icon: 'layout',
    items: [
      'TypeScript',
      'JavaScript',
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'HTML/CSS',
      'Node.js',
      'Express.js',
      'FastAPI',
      'Flask',
      'Streamlit',
      'NGINX',
      'WebRTC',
      'Socket.IO',
      'JWT',
    ],
  },
  {
    title: 'Cloud, DevOps & Databases',
    color: 'green' as GoogColor,
    icon: 'cloud',
    items: [
      'AWS (S3, EC2)',
      'GCP',
      'Linux',
      'Bash',
      'Docker',
      'Kubernetes',
      'Git',
      'GitHub Actions',
      'CI/CD',
      'Celery',
      'Redis',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'SQLite',
      'Supabase',
      'FAISS',
      'Pinecone',
      'ChromaDB',
    ],
  },
  {
    title: 'Languages & Fundamentals',
    color: 'yellow' as GoogColor,
    icon: 'terminal',
    items: [
      'Python',
      'Java',
      'C++',
      'C',
      'SQL',
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'Statistical Modeling',
    ],
  },
]

export const experience = [
  {
    org: 'Webel — Centre of Excellence on Data Science & ML',
    dept: 'Dept. of IT & Electronics, Govt. of West Bengal',
    role: 'Data Science & ML Engineering Intern',
    period: "Mar '25 – Jun '25",
    color: 'blue' as GoogColor,
    bullets: [
      'Architected EPIC, a distributed full-stack government grievance platform (FastAPI + React/TypeScript + PostgreSQL + Redis + Celery), containerized with Docker Compose and Kubernetes.',
      'Built a multimodal AI data pipeline: FAISS vector DB + all-MiniLM-L6-v2 SentenceTransformer with Vision OCR fallback, powering a RAG pipeline for one-click policy-grounded reply drafting.',
      'Engineered a LangGraph ReAct agent for live SQL data analytics, real-time KPI computation and NLP-based policy Q&A.',
      'Designed a hybrid 4-tier triage system (rule-based heuristics + Gemini LLM deep inference) and a hardware-aware VRAM mutex resource manager preventing starvation during concurrent inference.',
      'Enforced enterprise security: Fernet-encrypted OAuth tokens, PostgreSQL Row-Level Security multi-tenancy and Google RISC webhooks; shipped a real-time SSE dashboard with Recharts.',
    ],
    stack: ['FastAPI', 'LangGraph', 'PostgreSQL/RLS', 'Redis', 'Celery', 'Kubernetes', 'Gemini'],
  },
]

export const education = [
  {
    school: 'RCC Institute of Information Technology',
    degree: 'B.Tech, Computer Science & Engineering',
    period: "Aug '23 – Jun '27",
    detail: 'CGPA 8.70 / 10 (till 5th semester)',
    color: 'green' as GoogColor,
  },
]

export const projects = [
  {
    n: '01',
    title: 'EPIC',
    subtitle: 'AI Grievance Platform',
    color: 'blue' as GoogColor,
    blurb:
      'A distributed full-stack government grievance platform with a hybrid 4-tier LLM triage system, LangGraph ReAct agent and FAISS RAG pipeline. Dual-provider email sync engine (Gmail API + Microsoft Graph) with incremental thread reconciliation, plus a real-time SSE dashboard.',
    highlights: ['4-tier LLM triage', 'FAISS RAG drafting', 'RLS multi-tenancy', 'VRAM mutex'],
    stack: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Celery', 'Kubernetes'],
    featured: true,
    repo: null,
  },
  {
    n: '02',
    title: 'MLOps X-Ray Classifier',
    subtitle: 'Pneumonia Detection Pipeline',
    color: 'red' as GoogColor,
    blurb:
      'Custom PyTorch CNN for binary chest X-ray classification with a modular MLOps pipeline — ingestion → augmentation → training → evaluation — plus a FastAPI inference server and automated CI/CD to AWS EC2 self-hosted runners.',
    highlights: ['Custom CNN', 'Modular pipeline', 'GitHub Actions CI/CD', 'EC2 runners'],
    stack: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'AWS EC2', 'GitHub Actions'],
    featured: true,
    repo: 'https://github.com/AnshuNandi/pneumonia-xray-classifier',
  },
  {
    n: '03',
    title: 'Custom VCS CLI',
    subtitle: 'Git From Scratch',
    color: 'yellow' as GoogColor,
    blurb:
      'A Git-like CLI (yargs) with immutable SHA commit hashing and AWS S3 SDK sync for version-controlled blobs, a JWT/bcrypt REST API, and a GitHub-like React dashboard with contribution heatmaps and Socket.IO collaboration.',
    highlights: ['SHA object store', 'S3 blob sync', 'PR histories', 'Live heatmaps'],
    stack: ['Node.js', 'Express', 'MongoDB', 'React', 'AWS S3', 'Socket.IO', 'JWT'],
    repo: 'https://github.com/AnshuNandi/Custom-Version-Control',
  },
  {
    n: '04',
    title: 'PulseMeet',
    subtitle: 'WebRTC Conferencing',
    color: 'green' as GoogColor,
    blurb:
      'P2P video conferencing built on raw WebRTC (ICE/SDP negotiation) with a Socket.IO signaling server for peer discovery. Screen sharing, media controls, meeting rooms and call-history tracking with token-based sessions.',
    highlights: ['ICE/SDP negotiation', 'Screen share', 'Meeting rooms', 'Call history'],
    stack: ['React', 'Node.js', 'Socket.IO', 'WebRTC', 'MongoDB'],
    repo: 'https://github.com/AnshuNandi/PulseMeet',
  },
  {
    n: '05',
    title: 'Dum-E',
    subtitle: 'AI Fitness Coach',
    color: 'red' as GoogColor,
    blurb:
      'Real-time CV pipeline (MediaPipe + OpenCV) computing 3D joint angles to render a live biomechanical HUD across 6 exercises, with Groq API LLM feedback and an async gTTS voice pipeline that never blocks the video thread.',
    highlights: ['3D pose landmarks', 'Live HUD', 'Groq LLM coaching', 'Async TTS'],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Streamlit', 'Groq', 'gTTS'],
    repo: 'https://github.com/AnshuNandi/Dum-E--AI-Coach',
  },
  {
    n: '06',
    title: 'SnapRoll',
    subtitle: 'Biometric Attendance',
    color: 'blue' as GoogColor,
    blurb:
      'Multi-modal biometric attendance using 128-D facial embeddings (dlib + SVM) to identify multiple students from one image, plus librosa MFCC voice verification. Supabase backend with dual-role portals and QR class-joining.',
    highlights: ['128-D embeddings', 'MFCC voice auth', 'Dual-role portals', 'QR join'],
    stack: ['Python', 'Streamlit', 'Flask', 'Supabase', 'dlib', 'scikit-learn', 'librosa'],
    repo: 'https://github.com/AnshuNandi/SnapRoll',
  },
]

export const achievements = [
  {
    place: '2nd',
    title: 'Cipher 7.0 Coding Contest',
    org: 'RCCTechz, RCCIIT',
    date: "Dec '24",
    color: 'blue' as GoogColor,
  },
  {
    place: '3rd',
    title: 'Codathon — Innovision ’24',
    org: 'Dept. of CSE, RCCIIT',
    date: "Oct '24",
    color: 'red' as GoogColor,
  },
  {
    place: '★',
    title: 'Pull Shark ×2',
    org: 'GitHub Achievement',
    date: 'Lifetime',
    color: 'yellow' as GoogColor,
  },
  {
    place: '★',
    title: 'YOLO',
    org: 'GitHub Achievement',
    date: 'Lifetime',
    color: 'green' as GoogColor,
  },
]

export const marqueeWords = [
  'AGENTIC AI',
  'LANGGRAPH',
  'MLOPS',
  'FASTAPI',
  'NEXT.JS',
  'PYTORCH',
  'KUBERNETES',
  'RAG',
  'WEBRTC',
  'POSTGRESQL',
  'DOCKER',
  'REDIS',
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#awards', label: 'Awards' },
  { href: '#contact', label: 'Contact' },
]
