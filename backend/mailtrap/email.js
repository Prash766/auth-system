import { ApiError } from "../utils/ApiError.js"
import { VERIFY_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplate.js"
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
        throw new ApiError("Error sending verification email")
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