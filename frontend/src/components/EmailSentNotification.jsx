'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Clock } from 'lucide-react'
import { useAuthActions } from '../../atoms/Auth'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isPasswordResetSuccess, resetLinkSentData } from '../../atoms/Utils'
import { useNavigate } from 'react-router-dom'

export default function EmailSentNotification() {
  const [countdown, setCountdown] = useState(30) 
  const [timesResendClicked , setTimesResendClicked] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const {forgotPassword} = useAuthActions()
  const userData = useRecoilValue(resetLinkSentData)
  const isResetPasswordDone = useRecoilValue(isPasswordResetSuccess)
  const navigate = useNavigate()

  const setResetLinkData = useSetRecoilState(resetLinkSentData)
  
  const checkPasswordResetStatus = () => {
    const storedResetStatus = JSON.parse(localStorage.getItem("passwordResetSuccess")) || false;
    if (storedResetStatus) {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleResend = async () => {
    setTimesResendClicked(prev => prev+1)
    if (canResend) {
      console.log('Resending email...')
      const response = await forgotPassword(userData.email)
      if(response.status===200){
        setResetLinkData(response.data.user)
        setCanResend(false)
        setCountdown(30*timesResendClicked+60)
      }
    }
  }

  // This useEffect listens for changes in Recoil's atom
  useEffect(() => {
    console.log('isResetPasswordDone in EmailSentNotification:', isResetPasswordDone);
    if (isResetPasswordDone === true) {
      navigate('/login', { replace: true });
    }
  }, [isResetPasswordDone, navigate]);

  // This useEffect listens for changes in localStorage from another tab
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "passwordResetSuccess") {
        checkPasswordResetStatus();
      }
    };
    // listen to storage changes
    window.addEventListener('storage', handleStorageChange);
    // Check once on initial load
    checkPasswordResetStatus();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4">
      <motion.div
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <Mail className="mx-auto h-12 w-12 text-purple-300" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Check Your Email</h2>
        <p className="text-gray-200 text-center mb-6">
          If your email exists in our system, you have received a link to reset your password.
        </p>
        <motion.a
          href="/login"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </motion.a>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300 mb-2">Didn't receive the email?</p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-sm font-medium ${
              canResend ? 'text-purple-300 hover:text-purple-200' : 'text-gray-400 cursor-not-allowed'
            } flex items-center justify-center mx-auto`}
          >
            {canResend ? (
              'Resend it'
            ) : (
              <>
                <Clock className="mr-1 h-4 w-4" />
                Resend in {formatTime(countdown)}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
