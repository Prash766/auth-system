import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const FloatingObject = ({start , end, color, size, initialPosition, randomPosition }) => {
    const controls = useAnimation()
    
    useEffect(() => {
        controls.start({
            x: [start, Math.random() * 100 +randomPosition ,  end],  // Complete a loop back to the starting point
            y: [start, Math.random() * 100 + randomPosition,  end],  // Same for y
            transition: {
              x: {
                type: "tween",
                ease: "linear",      
                duration: 20,        
                repeat: Infinity,    
                repeatType: 'loop',  // Loop the path
              },
              y: {
                type: "tween",
                ease: "linear",
                duration: 20,
                repeat: Infinity,
                repeatType: 'loop',
              },
            },
          });
    }, [controls])

    return (
        <motion.div
            className='absolute rounded-full'
            style={{
                width: size,
                height: size,
                opacity: 0.2,
                left: initialPosition.x,
                top: initialPosition.y,
                backgroundColor: color,
            }}
            animate={controls}
        />
    )
}

export default FloatingObject
