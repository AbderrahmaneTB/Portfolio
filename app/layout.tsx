import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Doto, Geist, JetBrains_Mono } from "next/font/google"
import { Cursor } from "@/components/cursor"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
})
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" })
const doto = Doto({ subsets: ["latin"], axes: ["ROND"], variable: "--font-doto", display: "swap" })

const description =
  "Machine learning and full-stack developer from Algeria. Track B winner at the SynapseON Datathon, 2nd in Zindi’s Financial Stress Prediction Challenge and the ODYSSEA Datathon, 3rd in the Mini Online Datathon."

// On Vercel this resolves to the production domain; the fallback is the current deployment URL.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://portfolio-abderahmanes-projects.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Abderrahmane Tayeb Boudjema | Machine learning and full-stack developer",
  description,
  openGraph: {
    title: "Abderrahmane Tayeb Boudjema",
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Abderrahmane Tayeb Boudjema, machine learning and full-stack developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abderrahmane Tayeb Boudjema",
    description,
    images: ["/og.png"],
  },
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07060c",
}

// Runs before paint. Motion: a saved choice wins, otherwise follow the system setting.
// Intro: skip it if motion is off or it already played in the last 6 hours.
const introScript = `(function(){var d=document.documentElement;try{var p=localStorage.getItem('motion');var on=p?p==='on':!matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.motion=on?'on':'off';var t=+localStorage.getItem('intro-seen-at')||0;if(!on||Date.now()-t<216e5){d.dataset.intro='seen'}else{d.dataset.introPending=''}}catch(e){d.dataset.motion='off';d.dataset.intro='seen'}})()`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${bricolage.variable} ${jetbrains.variable} ${doto.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        {children}
        <div className="grain" aria-hidden="true" />
        <Cursor />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
