'use server'
import { Resend } from "resend";

import { VerificationTemplate } from "@/components/templates/VerificationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMail = async (token: string, email: string) => {
  try {
  console.log('send mail')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await resend.emails.send({
    from: 'AutoStyle Team Testing <autostyle@resend.dev>',
    // to: [email]       TODO: email to send uncomment
    to:'audrius@sabalys.com',
    subject: 'Account verification v5',
    react: VerificationTemplate({verificationLink:`http://localhost:3000/auth/verification?token=${token}`})
  });

  if (error) {
    console.log('error ===', error);
    return { mailError: 'Something went wrong: ' + JSON.stringify(error) }; // Provide detailed error information
  }

  if (error) {
    return {mailError:'Somethink went wrong'}
  }

  return {mailSuccess: 'Mail send'}
} catch (err){
  console.log(err)
  return {mailError:'Somethink went wrong'}}
}