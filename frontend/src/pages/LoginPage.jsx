import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { Loading, useAuthActions } from '../../atoms/Auth'
import { toast } from 'sonner'

const LoginPage = () => {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const isLoading = useRecoilValue(Loading)
  const {login} = useAuthActions()
  const navigate = useNavigate()

async function handleLogin(e){
  e.preventDefault()
  try {
    const response = await login(email ,password)
    console.log(response)
    if(response.status===200){
      toast.success("Logged in Successfully")
      navigate('/' ,{replace:true})
      
    }
  } catch (error) {
    console.error(error)
    
  }

}
  return (
    <div className="flex  items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <motion.div
        className="bg-white  bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
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

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-3">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            className="w-full mb-4 px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="you@example.com"
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            className="w-full px-3 mb-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            required
          />
        </motion.div>

        <motion.div
          className="flex items-center justify-end mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
    
          <div className="text-sm">
            <Link to='/forgot-password' className="font-medium text-purple-300 hover:text-purple-200">
              Forgot your password?
            </Link>
          </div>
        </motion.div>

        <motion.button
          type="submit"
          onClick={(e)=>handleLogin(e)}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:ring-offset-2 focus:ring-purple-500 "
          whileHover={{ scale: 1.1,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.8,
            transition: { duration: 0.5 },
           }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{delay:0.4 , duration:0.6}}
          disabled={isLoading}
        >
        {isLoading? <Loader className='w-6 h-6 animate-spin mx-auto '/>:"Login"}
        </motion.button>

        <motion.p
          className="mt-6 text-center text-sm text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Not a member?{' '}
          <Link to='/signup' className="underline cursor-pointer  font-medium text-purple-300 hover:text-purple-200">
            Sign up now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default LoginPage
