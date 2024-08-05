import { Button } from '@components/ui/button';
import { nunito } from '@config/fonts';
import { cn } from '@config/utils'

import { FormError, FormSuccess } from '@/components/ui/custom';
import { CodeVerification } from '@/components/ui/custom/CodeVerification';
import { FormLoading } from '@/components/ui/custom/FormLoading';

interface ConfirmCodeSectionProps {
    otpArr: string[]
    setOtpArr: React.Dispatch<React.SetStateAction<string[]>>
    handleCancel: () => void,
    handleSubmitCode: () => void,
    handleSendNewCode: () => void,
    success: boolean;
    loading:boolean;
    error: string;
}

export const ConfirmCodeSection = ( {
    otpArr,
    setOtpArr,
    handleCancel,
    handleSubmitCode,
    handleSendNewCode,
    success,
    loading,
    error,
}: ConfirmCodeSectionProps ) => {
    return (
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Procced password change
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                You will receive a verification code via email to confirm that email is your
            </p>
            <CodeVerification handleCancel={handleCancel} otpArr={otpArr} setOtpArr={setOtpArr} handleNewCode={handleSendNewCode} />
            {loading && !success && !error && <FormLoading/>}
            {error && !loading && <FormError size='small' className='mt-3' message={error}/>}
            {success && !loading && <FormSuccess size='small' className='mt-3' message='Email send!'/>}
            <Button
                onClick={handleSubmitCode}
                className="mt-2"
                size="full"
                variant="secondary"
            >
                Submit
            </Button>
        </>
    )
}
