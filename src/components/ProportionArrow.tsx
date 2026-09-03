import { useReducedMotion } from "framer-motion"
import * as m from "framer-motion/m"

const spring = { type: "spring" as const, stiffness: 400, damping: 15 }
const instant = { duration: 0 }

export default function ProportionArrow({ inverse }: { inverse: boolean }) {
  const reduced = useReducedMotion()

  return (
    <m.div
      className="flex items-center justify-center shrink-0 text-brand"
      animate={{ rotate: inverse ? 180 : 0 }}
      transition={reduced ? instant : spring}
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="36"
        height="20"
        viewBox="0 0 36 20"
        fill="none"
      >
        <line
          x1="2"
          y1="10"
          x2="28"
          y2="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polyline
          points="24,4 33,10 24,16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </m.div>
  )
}
