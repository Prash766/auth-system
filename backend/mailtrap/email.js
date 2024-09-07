import { ApiError } from "../utils/ApiError.js"
import { PASSWORD_RESET_SUCCESS_TEMPLATE, RESET_PASSWORD_TEMPLATE, VERIFY_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplate.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email , verificationToken)=>{
    const recipient=[{email}]
    try {
        const response = await mailTrapClient.send(
            {
                from :sender,
                to:recipient,
                subject:"Verify Your Email",
                html:VERIFY_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
                category:"Email Verification"
            }
        )
        console.log("Email sent successfully", response)
        
    } catch (error) {
        console.log(error)
        throw new ApiError(400 , "Error sending verification email")
    }

}

export const sendWelcomeEmail = async(email , name)=>{
   try {
     const recipient = [{email}]
     const response = await mailTrapClient.send({
         from:sender,
         to:recipient,
         html:WELCOME_TEMPLATE,
         subject:"Welcome to Auth-System",
         category:"welcome"
 
 
     })
     console.log("Welcome Email sent succesfully", response)
 
 
   } catch (error) {
 throw new ApiError(400 , "Error In sending Welcome Email")
    
   }
}

export const sendResetPassword = async(email , resetURL)=>{
   try {
     const recipient =[{email}]
     const response = await mailTrapClient.send({
         from:sender,
         to:recipient,
         subject:"Reset Your Password",
         html:RESET_PASSWORD_TEMPLATE.replace("{resetURL}" , resetURL),
         category:"Password reset"
     })
     console.log("Reset Mail sent", response)
   } catch (error) {
    throw new ApiError(400 , "Rest Mail not sent")
    
   }
}

export const sendResetSuccessMail = async(email)=>{
   try {
     const recipient =[{email}]
     const response = await mailTrapClient.send({
         from:sender,
         to:recipient,
         subject:"Password Reset Successfully",
         html:PASSWORD_RESET_SUCCESS_TEMPLATE,
         category:"Password Reset Successful"
 
     })
     console.log("Reset Password Successful" , response)
   } catch (error) {
    throw new ApiError(400 , "Reset Password Not Successful")
   }
}