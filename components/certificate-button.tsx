"use client"

import Image from "next/image"
import { useRef } from "react"
import { Maximize2, X } from "lucide-react"
import type { Certificate } from "@/lib/data"

/**
 * Certificate thumbnail that opens the full certificate in a modal viewer. The thumbnail is tinted
 * into the page's magma palette so bright scans don't out-shine the work; it turns full colour on
 * hover and in the viewer. `compact` is a small inline button for entries whose space goes to a demo.
 */
export function CertificateButton({ certificate, compact = false }: { certificate: Certificate; compact?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()
  const thumbHeight = (w: number) => Math.round((w * certificate.height) / certificate.width)

  return (
    <>
      {compact ? (
        <button type="button" onClick={open} aria-haspopup="dialog" className="btn btn-quiet group gap-3 py-1.5 pr-4 pl-1.5">
          <span className="cert-thumb block h-8 w-12 overflow-hidden rounded-full">
            <Image src={certificate.thumb} alt="" width={96} height={thumbHeight(96)} sizes="3rem" className="h-full w-full object-cover object-top" />
          </span>
          View certificate
          <span className="sr-only"> for {certificate.title}</span>
          <Maximize2 className="size-3.5 text-muted" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left transition-colors hover:border-white/25"
        >
          <span className="cert-thumb block aspect-[16/8] overflow-hidden">
            <Image
              src={certificate.thumb}
              alt=""
              width={720}
              height={thumbHeight(720)}
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black via-black/80 to-transparent px-4 pt-12 pb-3.5 text-sm font-semibold text-ink">
            <span>
              View certificate
              <span className="sr-only"> for {certificate.title}</span>
            </span>
            <Maximize2 className="size-4 text-ink/80" aria-hidden="true" />
          </span>
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-label={certificate.title}
        className="cert-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <figure className="cert-frame mx-auto w-fit max-w-full">
          <Image
            src={certificate.full}
            alt={certificate.alt}
            width={certificate.width}
            height={certificate.height}
            sizes="(min-width: 1100px) 68rem, 100vw"
            className="h-auto rounded-2xl shadow-[0_40px_120px_-30px_rgb(139_92_246/0.6)]"
          />
          <figcaption className="mt-5 flex items-center justify-between gap-4">
            <span className="text-sm text-muted">{certificate.title}</span>
            <button type="button" onClick={close} autoFocus className="btn btn-quiet">
              <X className="size-4" aria-hidden="true" />
              Close
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  )
}
