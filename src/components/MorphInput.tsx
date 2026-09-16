import clsx from "clsx"
import type React from "react"
import { useState } from "react"
import { TextMorph } from "torph/react"

type MorphInputProps = Omit<React.ComponentProps<"input">, "value"> & {
  value: string
}

/**
 * Input com texto transparente (caret, seleção e placeholder seguem nativos) e o
 * TextMorph desenhando o valor por cima, sem capturar clique. O overlay repete
 * padding/borda/fonte do campo para o texto cair sob o caret.
 */
const MorphInput: React.FC<MorphInputProps> = ({ value, className, onSelect, ...props }) => {
  const [caret, setCaret] = useState<number | undefined>(undefined)

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        className={clsx(className, "text-transparent caret-ink")}
        onSelect={(e) => {
          setCaret(e.currentTarget.selectionStart ?? undefined)
          onSelect?.(e)
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center border border-transparent px-3 py-2.5 text-lg font-medium text-ink"
      >
        <TextMorph locale="pt-BR" cursorIndex={caret}>
          {value}
        </TextMorph>
      </span>
    </div>
  )
}

export default MorphInput
