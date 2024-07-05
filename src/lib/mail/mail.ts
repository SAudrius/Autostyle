'use server'
import { ChangeEmailTemplate } from "@components/templates/ChangeEmailTemplate";
import { ChangetPasswordTemplate } from "@components/templates/ChangePasswordTemplate";
import { ForgotPasswordTemplate } from "@components/templates/ForgotPasswordTemplate";
import { VerificationTemplate } from "@components/templates/VerificationTemplate";
import { Resend } from "resend";

import { SuccessPasswordChangeTemplate } from "@/components/templates/SuccessPasswordChangeTemplate";

const resend = new Resend( process.env.RESEND_API_KEY );

export const sendMail = async ( email: string, template: 'successPassword' ) => {
    try {
        const selectedTemplate = () => {
            if ( template === 'successPassword' ) {
                return { template: SuccessPasswordChangeTemplate(), title: 'Account Verification' }
            }
        }
        const currentTemplate = selectedTemplate() 

        if ( !currentTemplate ) {
            return { mailError:'Somethink went wrong' }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await resend.emails.send( {
            from: 'AutoStyle Team Testing <autostyle@resend.dev>',
            // to: [email] TODO: email to send uncomment
            to:'audrius@sabalys.com',
            subject: currentTemplate.title,
            react: currentTemplate.template
        } );

        if ( error ) {
            return { mailError: 'Something went wrong' };
        }

        if ( error ) {
            return { mailError: 'Something went wrong' }
        }

        return { mailSuccess: 'Mail send' }
    } catch ( err ){
        return { mailError: 'Something went wrong' }
    }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendMailToken = async ( token: string, email: string, template: "verification" | "forgotPassword" | 'successPassword' ) => {
    try {
        const selectedTemplate = () => {
            if ( template === 'verification' ) {
                return { template: VerificationTemplate( { verificationLink: `http://localhost:3000/auth/verification?token=${token}` } ), title: 'Account Verification' }
            }
            if ( template === "forgotPassword" ) {
                return { template: ForgotPasswordTemplate( { resetPasswordLink: `http://localhost:3000/auth/reset-password?token=${token}` } ), title: 'Change Password' }
            }
        }
        const currentTemplate = selectedTemplate() 

        if ( !currentTemplate ) {
            return { mailError:'Somethink went wrong' }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await resend.emails.send( {
            from: 'AutoStyle Team Testing <autostyle@resend.dev>',
            // to: [email] TODO: email to send uncomment
            to:'audrius@sabalys.com',
            subject: currentTemplate.title,
            react: currentTemplate.template
        } );

        if ( error ) {
            return { mailError: 'Something went wrong' };
        }

        if ( error ) {
            return { mailError: 'Something went wrong' }
        }

        return { mailSuccess: 'Mail send' }
    } catch ( err ){
        return { mailError: 'Something went wrong' }
    }
}

export const sendMailCode = async ( email: string, code:number, template: "changeEmail" | "changePassword" ) => {
    try {
        const selectedTemplate = () => {
            if ( template === 'changeEmail' ) {
                return { template: ChangeEmailTemplate( { code } ), title: 'Change email' }
            }
            if ( template === "changePassword" ) {
                return { template: ChangetPasswordTemplate( { code } ), title: 'Change password' }
            }
        }
        const currentTemplate = selectedTemplate() 
  
        if ( !currentTemplate ) {
            return { mailError:'Somethink went wrong' }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await resend.emails.send( {
            from: 'AutoStyle Team Testing <autostyle@resend.dev>',
            // to: [email] TODO: email to send uncomment
            to:'audrius@sabalys.com',
            subject: currentTemplate.title,
            react: currentTemplate.template
        } );
  
        if ( error ) {
            return { mailError: 'Something went wrong' };
        }
  
        if ( error ) {
            return { mailError: 'Something went wrong' }
        }
  
        return { mailSuccess: 'Mail send' }
    } catch ( err ){
        return { mailError: 'Something went wrong' }
    }
}