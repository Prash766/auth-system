'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

const BouncingObject = ({ size, color, initialPosition }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -50, 0],
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
    />
  )
}

const FloatingObject = ({ size, color, initialPosition }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 10, 0],
      transition: {
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        repeatType: 'mirror',
      },
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
    />
  )
}

const DynamicBackground = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingObject size={100} color="#8B5CF6" initialPosition={{ x: '10%', y: '20%' }} />
        <FloatingObject size={150} color="#6366F1" initialPosition={{ x: '70%', y: '10%' }} />
        <FloatingObject size={80} color="#EC4899" initialPosition={{ x: '25%', y: '60%' }} />
        <FloatingObject size={120} color="#8B5CF6" initialPosition={{ x: '80%', y: '70%' }} />
        <FloatingObject size={90} color="#6366F1" initialPosition={{ x: '50%', y: '30%' }} />
        <BouncingObject size={60} color="#F472B6" initialPosition={{ x: '15%', y: '40%' }} />
        <BouncingObject size={40} color="#818CF8" initialPosition={{ x: '85%', y: '25%' }} />
        <BouncingObject size={50} color="#A78BFA" initialPosition={{ x: '45%', y: '80%' }} />
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  )
}

export default function AppSample() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login submitted', { email, password })
  }

  return (
    <DynamicBackground>
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome Back
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="you@example.com"
              required
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
              required
            />
          </motion.div>
          <motion.div
            className="flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-purple-300 hover:text-purple-200">
                Forgot your password?
              </a>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Sign in
          </motion.button>
        </form>
        <motion.p
          className="mt-6 text-center text-sm text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Not a member?{' '}
          <a href="#" className="font-medium text-purple-300 hover:text-purple-200">
            Sign up now
          </a>
        </motion.p>
      </motion.div>
    </DynamicBackground>
  )
}
