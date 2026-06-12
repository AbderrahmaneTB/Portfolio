import type { IconType } from "react-icons"
import {
  SiFigma,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiJavascript,
  SiHtml5,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiDjango,
  SiDocker,
  SiC,
} from "react-icons/si"

export const socials = {
  email: "abdrahmanetb@gmail.com",
  github: "https://github.com/AbderrahmaneTB",
  kaggle: "https://www.kaggle.com/tbabderahmane",
  linkedin:
    "https://www.linkedin.com/in/tayeb-boudjema-abderrahmane-888003380/",
}

export type Skill = {
  name: string
  Icon?: IconType
  src?: string
  color?: string
}

export const skills: Skill[] = [
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "C", Icon: SiC, color: "#A8B9CC" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "Express", Icon: SiExpress, color: "#cbd5e1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#e5e7eb" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Django", Icon: SiDjango, color: "#44B78B" },
  { name: "PyTorch", src: "/icons/pytorch.png" },
  { name: "TensorFlow", src: "/icons/tensorflow.png" },
  { name: "Scikit-learn", src: "/icons/scikit-learn.png" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
]

export type Experience = {
  title: string
  org: string
  description: string
}

export const experiences: Experience[] = [
  {
    title: "Co-Founder @ Bytorax Agency",
    org: "Web Development & Design Agency",
    description:
      "Leading technical delivery across client projects, with a focus on backend architecture, API quality, and stable deployment pipelines from development to production.",
  },
  {
    title: "3rd Place — CSE Club Mini Datathon",
    org: "Machine Learning Competition",
    description:
      "Secured 3rd place at the CSE Club Mini Datathon by engineering a comprehensive Machine Learning, Deep Learning, and NLP solution using PyTorch/Scikit-Learn to successfully tackle complex data challenges.",
  },
  {
    title: "Participant — Haik Datathon",
    org: "Competitive Data Science Challenge",
    description:
      "Designed and built end-to-end AI solutions, applying Machine Learning, Deep Learning, and Natural Language Processing techniques, handling everything from data preprocessing and feature engineering to model training.",
  },
  {
    title: "Full-Stack Developer, UI/UX Designer & AI Team Member",
    org: "ESMS Project & CSE Web Development",
    description:
      "Combining design and development expertise to create seamless user experiences, from Figma prototypes to fully integrated full-stack implementations, while contributing to machine learning projects and collaborative research initiatives, exploring real-world AI applications.",
  },
]

export type Project = {
  name: string
  status: "Completed" | "In Development"
  description: string
  builtWith: string
  image: string
  link: string
  reverse?: boolean
}

export const projects: Project[] = [
  {
    name: "Neon Quiz",
    status: "Completed",
    description:
      "A dynamic, full-stack quiz web application developed from scratch. Features real-time scoring, full user authentication, and a responsive, interactive UI.",
    builtWith: "Next.js · React · Node.js · Express",
    image: "/projects/neon-quiz.png",
    link: "https://quizweb-woad.vercel.app",
  },
  {
    name: "TalentLink",
    status: "In Development",
    description:
      "A full stack mobile-first job networking app built with React Native (Expo) and Express.js that connects recruiters with candidates through profile-based search.",
    builtWith: "React Native · Expo · Express.js · Node.js",
    image: "/projects/talentlink.png",
    link: "https://github.com/AbderrahmaneTB/TalentLink",
    reverse: true,
  },
  {
    name: "Brew & Bright",
    status: "Completed",
    description:
      "A coffee brand landing page designed and developed from scratch: clean layout, menu showcase, and smooth brand identity built for real client delivery.",
    builtWith: "React · Tailwind CSS · Figma",
    image: "/projects/brew-bright.png",
    link: "https://brew-and-bright.vercel.app",
  },
]
