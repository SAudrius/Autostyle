'use server'

export const sendEmail = async ( email: string, templateId: string, dynamicData?: object ) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-mail`;
    try {
        const response = await fetch( apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { email, templateId, dynamicData } ),
        } );

        if ( !response.ok ) {
            console.log( '!ok', response.ok )
            return false
        }
        const data = await response.json();
        console.log( 'data ===', data );
        return data;
    } catch ( error ) {
        console.log( '@error ===', error );
        return false;
    }
};