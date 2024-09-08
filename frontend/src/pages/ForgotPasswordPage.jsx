import React from 'react'
import { useRecoilValue } from 'recoil'
import { resetVerified } from '../../atoms/Utils'
import EmailSentNotification from '../components/EmailSentNotification'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const ForgotPasswordPage = () => {
    const isLinkSent= useRecoilValue(resetVerified)
    console.log(isLinkSent)
  return (
    <div>
    {
        isLinkSent?<EmailSentNotification/> : <ForgotPasswordForm/>
    }



    </div>
  )
}

export default ForgotPasswordPage