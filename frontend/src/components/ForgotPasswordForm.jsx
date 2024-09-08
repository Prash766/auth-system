'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader } from 'lucide-react'
import { Loading, useAuthActions } from '../../atoms/Auth'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isPasswordResetSuccess, resetLinkSentData, resetVerified } from '../../atoms/Utils'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const {forgotPassword}  = useAuthActions()
const setIsLinkSent = useSetRecoilState(resetVerified)
const isLoading = useRecoilValue(Loading)
const setResetLinkData = useSetRecoilState(resetLinkSentData)
const setIsPasswordResetSuccess = useSetRecoilState(isPasswordResetSuccess)




useEffect(()=>{
  setIsPasswordResetSuccess(false)

},[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response =await  forgotPassword(email)
    console.log(response)
    if(response.status===200){
      setIsLinkSent(true)
      setResetLinkData(response.data.user)
    }
    console.log('Password reset requested for:', email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <p className="text-gray-200 text-center mb-8">
          Enter your email and we will send you a link to reset your password
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto ' /> : "Send Reset Link"}
            </motion.button>
        </form>
        <div className="mt-8 text-center">
          <a
            href="/login"
            className="text-sm font-medium text-purple-300 hover:text-purple-200 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  )
}