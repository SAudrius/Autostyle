'use server'
import { Resend } from "resend";

import { ForgotPasswordTemplate } from "@/components/templates/ForgotPasswordTemplate";
import { VerificationTemplate } from "@/components/templates/VerificationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMail = async (token: string, email: string, template: "verification" | "forgotPassword" ) => {
  try {
  const selectedTemplate = () => {
    if (template === 'verification') {
      return {template: VerificationTemplate({verificationLink: `http://localhost:3000/auth/verification?token=${token}`}), title: 'Account verification'}
    }
    if (template === "forgotPassword") {
      return {template: ForgotPasswordTemplate({resetPasswordLink: `http://localhost:3000/auth/reset-password?token=${token}`}), title: 'Change password'}
    }
  }
  const currentTemplate = selectedTemplate() 

  if (!currentTemplate) {
    return {mailError:'Somethink went wrong'}
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await resend.emails.send({
    from: 'AutoStyle Team Testing <autostyle@resend.dev>',
    // to: [email] TODO: email to send uncomment
    to:'audrius@sabalys.com',
    subject: currentTemplate.title,
    react: currentTemplate.template
  });

  if (error) {
    return { mailError: 'Something went wrong' };
  }

  if (error) {
    return {mailError: 'Something went wrong' }
  }

  return { mailSuccess: 'Mail send'}
} catch (err){
  return { mailError: 'Something went wrong'}}
}