import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, Mail } from 'lucide-react'
import PasswordStrengthMeter from '../components/PasswordStrength'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, useAuthActions } from '../../atoms/Auth'
import { useRecoilValue } from 'recoil'

const SignupPage = () => {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
const {signup } = useAuthActions()
const isLoading = useRecoilValue(Loading)

async function handleSignUp(){
try {
   const response = await signup(email , password , fullName)
   console.log(response)
   if(response.status ===200){
     navigate('/verify-email')
   }
} catch (error) {
  console.error(error)
}
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-6 text-center"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hello!✌️
        </motion.h2>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className='space-y-4'
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}

              id="fullname"
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="Enter Full Name"
              required
            />
          </motion.div>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="••••••••"
              required
            />
          </motion.div>


          {/* Password strength*/}
          <PasswordStrengthMeter password={password} />
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleSignUp}
            className='bg-purple-600 w-full rounded-md p-2 font-semibold text-white hover:bg-purple-700'
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto ' /> : "Sign Up"}

          </motion.button>

          <motion.p
            className="mt-6 text-center text-sm text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Already a Member?{' '}
            <Link to='/login' className="underline cursor-pointer font-medium text-purple-300 hover:text-purple-200">
              Login now
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignupPage
