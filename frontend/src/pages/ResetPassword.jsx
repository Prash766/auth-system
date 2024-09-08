'use client'

import { motion, useAnimation } from 'framer-motion'
import {  useState } from 'react'
import { Loader, Lock } from 'lucide-react'
import { Loading, useAuthActions } from '../../atoms/Auth'
import { toast } from 'sonner'
import {  useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isPasswordResetSuccess, resetVerified } from '../../atoms/Utils'


export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {resetPassword} = useAuthActions()
  const setIsResetPasswordSuccess = useSetRecoilState(isPasswordResetSuccess)
  const setIsLinkSent = useSetRecoilState(resetVerified)
  const isLoading = useRecoilValue(Loading)
  const {id} = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password Doesnt Match")
      return
    }
    const response = await resetPassword(id , password)
    console.log(response)
    if (response.status === 200) {
      toast.success("Password Reset Successfully");
      setIsLinkSent(false)
      setIsResetPasswordSuccess(true);  
      navigate('/login', { replace: true });
    }
    
    console.log('Password reset submitted', { password })
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>

      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Reset Password
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="password" className="block text-lg font-medium text-gray-200 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-lg"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-200 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 text-lg"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </motion.div>
          <motion.button
          whileTap={{
            scale:0.89
          }}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2  focus:ring-purple-500 transition duration-200 mt-8"
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto ' /> : "Reset Password"}
            </motion.button>
        </form>
        <motion.p
          className="mt-8 text-center text-base text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Remember your password?{' '}
          <a href="#" className="font-medium text-purple-300 hover:text-purple-200">
            Sign in
          </a>
        </motion.p>
      </motion.div>
      </div>

  )
}