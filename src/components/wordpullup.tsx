import clsx from "clsx"
import { motion } from "framer-motion"

interface WordPullUpProps {
  renderText: string
  transitionTime: number
}

export function WordPullUp(props: WordPullUpProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: props.transitionTime,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const words = props.renderText
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={clsx(
        "flex gap-3",
        "font-display font-bold drop-shadow-sm",
        "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        "tracking-[-0.02em]",
        "md:leading-[4rem] lg:leading-[4.5rem] xl:leading-[5rem]"
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{}}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.span>
  )
}
