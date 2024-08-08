import sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

interface sendMailArgs {
    email: string,
    templateId: string, 
    dynamicData?:object,
}

interface sendGridMsgArgs {
    to:string,
    from: { email: string, name: string},
    templateId: string,
    dynamic_template_data?: object,
}

if ( !SENDGRID_API_KEY ) {
    throw new Error( 'SendGrid API key is missing' );
}

sgMail.setApiKey( SENDGRID_API_KEY );

export async function POST( req: NextRequest ) {
    console.log( 'api mail' )
    if ( !process.env.SENDGRID_API_KEY ) {
        return NextResponse.json( false )
    }
    
    const { email, templateId, dynamicData } = await req.json() as sendMailArgs;
    if ( !email || !templateId ) {
        return NextResponse.json( false )
    }
    console.log( 'email ===', email );
    console.log( 'templateId ===', templateId );

    const msg: sendGridMsgArgs = {
        to: email,
        from: {
            email: 'autostyle.test@gmail.com',
            name: 'AutoStyle Test Team', // Customize your sender name here
        },
        templateId,
    };

    if ( dynamicData ) {
        msg.dynamic_template_data = dynamicData;
    }

    try {
        const sendMail = await sgMail.send( msg );
        if ( sendMail[0].statusCode >= 200 && sendMail[0].statusCode < 300 ) {
            return NextResponse.json( true )
        }
    } catch ( error ) {
        console.log( 'error ===', error );
        return NextResponse.json( false )
    }
}