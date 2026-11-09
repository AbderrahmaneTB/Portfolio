import type { IconType } from "react-icons"
import { FaKaggle, FaLinkedinIn } from "react-icons/fa"
import {
  SiC,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si"
import type { Profile, SkillIcon as SkillIconName } from "@/lib/data"

const profileIcons: Record<Profile["name"], IconType | null> = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  Kaggle: FaKaggle,
  Zindi: null,
}

export function ProfileIcon({ name, className }: { name: Profile["name"]; className?: string }) {
  const Icon = profileIcons[name]
  if (!Icon) {
    return (
      <span aria-hidden="true" className={`grid place-items-center font-display font-extrabold ${className ?? ""}`}>
        Z
      </span>
    )
  }
  return <Icon aria-hidden="true" className={className} />
}

const skillIcons: Record<SkillIconName, { Icon: IconType | null; color: string }> = {
  pytorch: { Icon: SiPytorch, color: "#EE4C2C" },
  tensorflow: { Icon: SiTensorflow, color: "#FF8F00" },
  scikitlearn: { Icon: SiScikitlearn, color: "#F7931E" },
  lightgbm: { Icon: null, color: "#9BE15D" },
  pandas: { Icon: SiPandas, color: "#B8A6FF" },
  numpy: { Icon: SiNumpy, color: "#4DABCF" },
  scipy: { Icon: SiScipy, color: "#5FA8E8" },
  nextjs: { Icon: SiNextdotjs, color: "#FFFFFF" },
  react: { Icon: SiReact, color: "#61DAFB" },
  nodejs: { Icon: SiNodedotjs, color: "#6CC24A" },
  express: { Icon: SiExpress, color: "#E6E6E6" },
  django: { Icon: SiDjango, color: "#44B78B" },
  fastapi: { Icon: SiFastapi, color: "#05998B" },
  postgresql: { Icon: SiPostgresql, color: "#6E9FD8" },
  mysql: { Icon: SiMysql, color: "#5D9BC9" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  python: { Icon: SiPython, color: "#FFD43B" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  c: { Icon: SiC, color: "#A8B9CC" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
}

export function SkillIcon({ icon, className }: { icon: SkillIconName; className?: string }) {
  const { Icon, color } = skillIcons[icon]
  if (!Icon) {
    return (
      <span aria-hidden="true" className="font-mono text-[0.6rem] font-bold tracking-tight" style={{ color }}>
        LGBM
      </span>
    )
  }
  return <Icon aria-hidden="true" className={className} style={{ color }} />
}
