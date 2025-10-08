'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ src, alt, className = '', speed = 0.5 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.2, 0])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="w-full h-[120%]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          style={{ opacity }}
          priority
        />
      </motion.div>
    </div>
  )
}
