import { 
    updateUserEmailExpireLimitById,
    updateUserEmailExpireTimeAndEmailLimitById
} from "@/lib";

export const scrollToTop = () => {
    window.scrollTo( { top: 0, behavior: "smooth" } );
};
  
export const generateRandomSixNumberCode = () => {
    return parseInt( Math.floor( 100000 + Math.random() * 900000 ).toString() );
}

export const createExpiryTime = ( hours = 0, minutes = 0, seconds = 0 ) => {
    const currentTime = new Date();
    const expiryTime = new Date( currentTime.getTime() +
      ( hours * 60 * 60 * 1000 ) +
      ( minutes * 60 * 1000 ) +
      ( seconds * 1000 )
    );
    return expiryTime.getTime();
}

export const convertToDbDate = ( timestamp:number ) => {
    const date = new Date( timestamp );
    return date.toISOString().slice( 0, 19 ).replace( 'T', ' ' );
};

export const checkUserEmailLimit = async ( userData: User ) => {
    const emailLimit = 15
    const cooldown = createExpiryTime( 6, 0, 0 );

    const currentTimestamp = new Date().getTime();
    const userEmailCount = userData.email_user_limit;
    const newUserExpireTime = cooldown
    const emailUserExpireTime = userData.email_limit_time ? userData.email_limit_time : newUserExpireTime;

    if ( currentTimestamp > emailUserExpireTime || !userData.email_limit_time ) {

        const updateTimeRows = await updateUserEmailExpireTimeAndEmailLimitById( userData.id, newUserExpireTime, 0 )
        if ( updateTimeRows?.affectedRows !== 1  || !updateTimeRows ) {
            return { error: 'Something went wrong' };
        }
    } else if ( userEmailCount >= emailLimit || currentTimestamp < emailUserExpireTime && !userData.email_limit_time ) {

        const timeRemainingMillis = emailUserExpireTime - currentTimestamp;
        const timeRemainingMinutes = Math.max( Math.ceil( timeRemainingMillis / 60000 ), 0 )
        const timeRemainingHours = Math.max( Math.floor( timeRemainingMillis / 3600000 ), 0 );
    
        let timeMessage;
        if ( timeRemainingHours > 0 ) {
            timeMessage = `${timeRemainingHours} hour${timeRemainingHours > 1 ? 's' : ''}`;
        } else {
            timeMessage = `${timeRemainingMinutes} minute${timeRemainingMinutes > 1 ? 's' : ''}`;
        }
    
        return { error: `You’ve reached your limit. Try again in ${timeMessage}.` };
    }
    
    const updateLimitRows = await updateUserEmailExpireLimitById( userData.id, userEmailCount + 1 )
    if ( updateLimitRows?.affectedRows !== 1 || !updateLimitRows ) {
        return { error: 'Something went wrong' }
    }

    return { success: "Success" }
}


export const validatePaginationParams = ( value: number, defaultValue: number ): number => {
    if ( Number.isInteger( value ) && value >= 0 ) {
        return value;
    }
    return defaultValue; // fallback to a default value if invalid
}
