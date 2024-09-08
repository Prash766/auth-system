import React from 'react'
import {motion} from 'framer-motion'
import OTP from '../components/OTP'

function EmailVerification() {
  return (
    <motion.div
    className='flex min-h-screen justify-center items-center'
    >

    <motion.div
    initial={{x:10 , opacity:0}}
    animate={{x:0 , opacity:1}}
    transition={{delay:0.3, duration:0.6}}
    className="space-y-9 bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-xl p-9 w-full max-w-md"
    >

    <motion.div
        initial={{y:-5 , opacity:0}}
    animate={{y:0 , opacity:1}}
    transition={{delay:0.3, duration:0.6}}
    className='font-semibold text-2xl text-white text-center -mb-7'
    >
    Verify Your Email
    </motion.div>
    <motion.p
    className='text-gray-400 font-semibold text-center'
    >
    Enter the 6-digit code sent to your email

    </motion.p>


    <OTP/>

    </motion.div>
    </motion.div>

  )
}

export default EmailVerification