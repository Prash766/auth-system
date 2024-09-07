import { useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'

const BouncingObject = ({ size, color, initialPosition }) => {
    const controls = useAnimation()
  
    useEffect(() => {
      controls.start({
        y: [0, 100, 0],
        transition: {
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    }, [controls])
  
    return (
      <motion.div
        className="absolute rounded-full opacity-30"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left: initialPosition.x,
          top: initialPosition.y,
        }}
        animate={controls}
        aria-hidden='true'
      />
    )
  }

export default BouncingObject