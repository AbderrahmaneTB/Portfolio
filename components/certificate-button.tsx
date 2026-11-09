"use client"

import Image from "next/image"
import { useRef } from "react"
import { X } from "lucide-react"
import type { Certificate } from "@/lib/data"

/** Certificate thumbnail that opens the full certificate in a modal viewer. */
export function CertificateButton({ certificate }: { certificate: Certificate }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        data-cursor="view"
        data-cursor-label="View"
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
      >
        <span className="block aspect-[16/8] overflow-hidden">
          <Image
            src={certificate.thumb}
            alt=""
            width={720}
            height={Math.round((720 * certificate.height) / certificate.width)}
            sizes="(min-width: 768px) 32rem, 90vw"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </span>
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent px-4 pt-10 pb-3 text-sm font-medium">
          View certificate
          <span className="sr-only"> for {certificate.title}</span>
          <span aria-hidden="true" className="font-mono text-xs text-white/70">
            ⤢
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={certificate.title}
        className="cert-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="cert-frame w-[min(68rem,100%)]">
          <Image
            src={certificate.full}
            alt={certificate.alt}
            width={certificate.width}
            height={certificate.height}
            sizes="(min-width: 1100px) 68rem, 100vw"
            className="h-auto rounded-2xl shadow-[0_40px_120px_-30px_rgb(139_92_246/0.6)]"
          />
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="font-mono text-sm text-muted">{certificate.title}</p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            >
              <X className="size-4" aria-hidden="true" />
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
