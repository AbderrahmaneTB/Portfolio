// All portfolio content lives here. Edit this file to update the site.

export const site = {
  name: "Abderrahmane Tayeb Boudjema",
  firstName: "Abderrahmane",
  lastName: "Tayeb Boudjema",
  email: "abdrahmanetb@gmail.com",
  github: "https://github.com/AbderrahmaneTB",
  timeZone: "Africa/Algiers",
}

export type Profile = { name: "GitHub" | "LinkedIn" | "Kaggle" | "Zindi"; handle: string; href: string }

export const profiles: Profile[] = [
  { name: "GitHub", handle: "AbderrahmaneTB", href: "https://github.com/AbderrahmaneTB" },
  {
    name: "LinkedIn",
    handle: "Tayeb Boudjema Abderrahmane",
    href: "https://www.linkedin.com/in/tayeb-boudjema-abderrahmane-888003380/",
  },
  { name: "Kaggle", handle: "tbabderahmane", href: "https://www.kaggle.com/tbabderahmane" },
  { name: "Zindi", handle: "Abdo_VDL", href: "https://zindi.world/users/Abdo_VDL" },
]

export type Link = { label: string; href: string }

export type Certificate = {
  /** Small image shown on the card */
  thumb: string
  /** Full-size image shown in the viewer */
  full: string
  width: number
  height: number
  /** Short name used for the viewer title and button label */
  title: string
  /** Full description of the certificate for screen readers */
  alt: string
}

export type Competition = {
  id: string
  rank: 1 | 2 | 3
  event: string
  /** Short name and one-line outcome for badges and the chart */
  short: string
  teaser: string
  host: string
  /** Shown on the card, e.g. "Oct 2026" */
  date: string
  /** Machine-readable date for <time> */
  dateTime: string
  /** Month number (1-12) used by the progress chart */
  month: number
  summary: string
  challenges?: { name: string; href?: string }[]
  links?: Link[]
  certificate?: Certificate
}

// Ordered by rank, then by date.
export const competitions: Competition[] = [
  {
    id: "synapseon",
    rank: 1,
    event: "SynapseON Datathon",
    short: "SynapseON",
    teaser: "Winner, radar track",
    host: "IEEE AESS Student Branch Chapter. Track B, time–frequency. Team Attention.",
    date: "Oct 2026",
    dateTime: "2026-10",
    month: 10,
    summary:
      "Won Track B with team Attention. We classified seven radar modulation types from raw I/Q pulses recorded over the air by UCL’s Radar Group, scored on a blind test set of 171,600 pulses by balanced accuracy across 13 noise levels, from +30 dB down to −30 dB SNR.",
    links: [{ label: "Challenge repository", href: "https://github.com/UCLRadarGroup/Radar_ML_lite" }],
    certificate: {
      thumb: "/certificates/synapseon-track-b-winner-thumb.webp",
      full: "/certificates/synapseon-track-b-winner.webp",
      width: 1082,
      height: 814,
      title: "SynapseON Datathon, Track B winner",
      alt: "Certificate of winning awarded to Boudjema Tayeb Abderrahmane, member of team Attention, as a winner of Track B, Time-Frequency Domain, at the SynapseON Datathon featuring the RadarML Lite dataset. Signed by the IEEE AESS SBC chairman, Mohamed Bedka.",
    },
  },
  {
    id: "zindi-financial-stress",
    rank: 2,
    event: "Financial Stress Prediction Challenge",
    short: "Zindi",
    teaser: "Financial stress prediction",
    host: "Zindi, September 2026 edition",
    date: "Sep 2026",
    dateTime: "2026-09",
    month: 9,
    summary:
      "Second on the private leaderboard with 0.7357. The model estimates whether a mobile-money customer will hit liquidity stress within 30 days. An explainable probit model of seven risk factors carries most of the signal; LightGBM learns only the corrections.",
    links: [
      {
        label: "Solution and write-up",
        href: "https://github.com/AbderrahmaneTB/financial-stress-prediction-2nd-place",
      },
    ],
  },
  {
    id: "odyssea",
    rank: 2,
    event: "ODYSSEA Datathon",
    short: "ODYSSEA",
    teaser: "Team MVP",
    host: "Skill & Tell Scientific Club. Official World AI Week event.",
    date: "Oct 2026",
    dateTime: "2026-10",
    month: 10,
    summary:
      "Second place in an online datathon built on three Kaggle challenges. I was the team’s MVP, with our best scores on the breast cancer and Rhine forecasting challenges.",
    challenges: [
      {
        name: "From Tumour Detection to Tumour Evolution (breast cancer)",
        href: "https://www.kaggle.com/competitions/skillntell-breast-cancer-v2",
      },
      { name: "RiverLoad C1: forecasting the Rhine" },
      { name: "RiverLoad C2: loading the ship" },
    ],
    certificate: {
      thumb: "/certificates/odyssea-2nd-place-thumb.webp",
      full: "/certificates/odyssea-2nd-place.webp",
      width: 1684,
      height: 1190,
      title: "ODYSSEA Datathon, 2nd place",
      alt: "Certificate of achievement presented to Tayeb Boudjema Abderrahmane for 2nd place in ODYSSEA, an online data science datathon featuring Kaggle competitions, organized by Skill & Tell Scientific Club, October 2026.",
    },
  },
  {
    id: "mini-datathon",
    rank: 3,
    event: "Mini Online Datathon 2026",
    short: "Mini Datathon",
    teaser: "Club Scientifique de l’ESI",
    host: "Club Scientifique de l’ESI",
    date: "May 2026",
    dateTime: "2026-05-24",
    month: 5,
    summary:
      "Third place across three Kaggle challenges, solved with machine learning, deep learning and NLP models in PyTorch and scikit-learn.",
    challenges: [
      { name: "AI-generated text detection" },
      { name: "3D indoor positioning with Wi-Fi signals" },
      { name: "AI Team Challenge 3" },
    ],
    certificate: {
      thumb: "/certificates/mini-datathon-3rd-place-thumb.webp",
      full: "/certificates/mini-datathon-3rd-place.webp",
      width: 1684,
      height: 1192,
      title: "Mini Online Datathon 2026, 3rd place",
      alt: "Certificate of achievement presented to Tayeb Boudjemaa Abderahmane for third place in the Mini Online Datathon 2026, awarded by Club Scientifique de l’ESI on 24 May 2026.",
    },
  },
]

// The fields behind the results and projects on this page, shown in the band under the hero
export const topics = [
  "Radar signal classification",
  "Traffic-signal control",
  "Financial stress prediction",
  "Breast cancer detection",
  "River forecasting",
  "AI-text detection",
  "Language models",
  "Wi-Fi indoor positioning",
  "Full-stack products",
]

export type Role = { title: string; org: string; description: string }

export const roles: Role[] = [
  {
    title: "Co-founder",
    org: "Bytorax, web development and design agency",
    description:
      "I lead technical delivery on client projects, with a focus on backend architecture, API quality and reliable deployment pipelines from development to production.",
  },
  {
    title: "Full-stack developer, UI/UX designer and AI team member",
    org: "ESMS project and CSE web development",
    description:
      "I take products from Figma prototypes to full-stack implementations, and contribute to machine learning projects and applied AI research with the team.",
  },
]

export const chowkpilot = {
  name: "ChowkPilot",
  badge: "NeuralStorm 2026",
  context: "Built with Ouail Imad Eddine Zitouni as team Blackwater.",
  description:
    "A reinforcement learning traffic-signal controller for Indian junctions. Every few seconds it decides which approach gets green, using only what a roadside camera can count. One small policy runs any junction layout, and it was tested zero-shot on three real Hyderabad areas it never saw in training.",
  metrics: [
    { value: 59, label: "less delay than fixed-time signal plans" },
    { value: 24, label: "less CO₂ in the network" },
    { value: 67, label: "less ambulance delay" },
  ],
  stack: ["Python", "PyTorch", "SUMO", "NumPy", "FastAPI"],
  links: [
    { label: "Live demo", href: "https://abderrahmanetb.github.io/chowkpilot/" },
    { label: "Walkthrough video", href: "https://www.youtube.com/watch?v=ymLgzVjIqkI" },
    { label: "Code", href: "https://github.com/AbderrahmaneTB/chowkpilot" },
  ],
}

export const stressProject = {
  name: "Financial stress prediction",
  badge: "Zindi, 2nd place",
  description:
    "Predicts whether a mobile-money customer hits liquidity stress in the next 30 days. A structural probit model of seven risk factors does most of the work, LightGBM learns the corrections, and each month is calibrated to the 15% stress rate seen in training.",
  stack: ["Python", "LightGBM", "pandas", "SciPy", "scikit-learn"],
  links: [
    { label: "Read the solution", href: "https://github.com/AbderrahmaneTB/financial-stress-prediction-2nd-place" },
  ],
}

export type LlmProject = {
  name: string
  /** Model size, the number a reader compares first */
  size: { value: string; label: string }
  description: string
  specs: { label: string; value: string }[]
  stack: string[]
  links: Link[]
}

// Two language models built with Wael at llm-lab-dz. Every figure comes from the repositories' READMEs;
// the from-scratch model publishes no benchmark scores, so none are shown for it.
export const llmLab: { name: string; context: string; projects: LlmProject[] } = {
  name: "Language models",
  context: "Two projects at llm-lab-dz, built with Wael: one model trained from zero, one adapted from a 3B base.",
  projects: [
    {
      name: "A GPT built from scratch",
      size: { value: "98M", label: "parameters, trained from zero" },
      description:
        "Every stage of a small language model: its own byte-level BPE tokenizer, a pipeline that streams about a billion tokens without filling memory, a transformer and training loop in plain PyTorch, and a Gradio chat. Training on Kaggle’s free GPUs picks up after each 12-hour session from checkpoints on the Hugging Face Hub.",
      specs: [
        { label: "Layers × heads", value: "12 × 12" },
        { label: "Hidden size", value: "768" },
        { label: "Context", value: "512 tokens" },
        { label: "Vocabulary", value: "16,000 BPE" },
        { label: "Training data", value: "≈1B tokens" },
      ],
      stack: ["PyTorch", "tokenizers", "Hugging Face Hub", "Gradio"],
      links: [{ label: "Code", href: "https://github.com/llm-lab-dz/llm-from-scratch" }],
    },
    {
      name: "Qwen2.5-3B, fine-tuned with QLoRA",
      size: { value: "3B", label: "parameters, adapted on two free GPUs" },
      description:
        "A chat model adapted on two 16 GB T4s. The base model is loaded in 4-bit and LoRA trains every attention and MLP projection, on a cleaned 10,000-conversation sample of UltraChat. Training resumes from its own checkpoints, and the adapter is public on Hugging Face.",
      specs: [
        { label: "Quantization", value: "4-bit NF4" },
        { label: "LoRA", value: "r 16, 7 projections" },
        { label: "Hardware", value: "2 × T4, 16 GB each" },
        { label: "Training", value: "1,091 steps, 1 epoch" },
        { label: "Validation perplexity", value: "3.32" },
      ],
      stack: ["PyTorch", "Transformers", "PEFT", "TRL", "bitsandbytes"],
      links: [
        { label: "Code", href: "https://github.com/llm-lab-dz/LLM-FineTune" },
        { label: "Adapter on Hugging Face", href: "https://huggingface.co/llm-lab-dz/qwen-3b-qlora-ultrachat" },
      ],
    },
  ],
}

export type WebProject = {
  name: string
  status: "Live" | "In development"
  description: string
  stack: string[]
  image: { src: string; width: number; height: number; alt: string }
  link: Link
}

export const webProjects: WebProject[] = [
  {
    name: "Neon Quiz",
    status: "Live",
    description: "A full-stack trivia app with accounts and rapid 15-question rounds, in a neon glass interface.",
    stack: ["Next.js", "React", "Node.js", "Express"],
    image: {
      src: "/projects/neon-quiz.webp",
      width: 600,
      height: 1111,
      alt: "Neon Quiz welcome screen with Get Started, Create Account and Sign In buttons",
    },
    link: { label: "Open the app", href: "https://quizweb-woad.vercel.app" },
  },
  {
    name: "TalentLink",
    status: "In development",
    description: "A mobile-first job networking app where recruiters find candidates through profile-based search.",
    stack: ["React Native", "Expo", "Express", "Node.js"],
    image: {
      src: "/projects/talentlink.webp",
      width: 238,
      height: 402,
      alt: "TalentLink home screen with a search bar for names, jobs and emails",
    },
    link: { label: "Read the code", href: "https://github.com/AbderrahmaneTB/TalentLink" },
  },
]

export type SkillIcon =
  | "pytorch" | "huggingface" | "tensorflow" | "scikitlearn" | "lightgbm" | "pandas" | "numpy" | "scipy"
  | "nextjs" | "react" | "nodejs" | "express" | "django" | "fastapi"
  | "postgresql" | "mysql" | "mongodb" | "docker"
  | "python" | "typescript" | "javascript" | "c" | "figma"

export type SkillGroup = { group: string; ring: 0 | 1 | 2; items: { name: string; icon: SkillIcon }[] }

// ring 0 is the centre of the radar scope, ring 2 the outer edge
export const skills: SkillGroup[] = [
  {
    group: "Machine learning",
    ring: 0,
    items: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "LightGBM", icon: "lightgbm" },
      { name: "pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "SciPy", icon: "scipy" },
    ],
  },
  {
    group: "Web and mobile",
    ring: 1,
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "Django", icon: "django" },
      { name: "FastAPI", icon: "fastapi" },
    ],
  },
  {
    group: "Languages, data and design",
    ring: 2,
    items: [
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "C", icon: "c" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Docker", icon: "docker" },
      { name: "Figma", icon: "figma" },
    ],
  },
]
