import { Button } from '@components/ui/button';
import { FormError, FormSuccess } from '@components/ui/custom';
import { CodeVerification } from '@components/ui/custom/CodeVerification';
import { FormLoading } from '@components/ui/custom/FormLoading';
import { nunito } from '@config/fonts';
import { cn } from '@config/utils'

interface ConfirmEmailCodeSectionTwoProps {
    otpArr: string[]
    setOtpArr: React.Dispatch<React.SetStateAction<string[]>>
    handleCancel: () => void,
    handleSubmitCode: () => void,
    handleNewCode: () => void,
    error: string;
    loading: boolean;
    success: boolean;
}

export const ConfirmEmailCodeTwoSection = ( {
    otpArr,
    setOtpArr,
    handleCancel,
    handleSubmitCode,
    handleNewCode,
    loading,
    error,
    success
}: ConfirmEmailCodeSectionTwoProps ) => {
    return (
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Confirm your email
            </h3>
            <p className={cn( "mt-4 text-center mx-auto", nunito.className )}>
                You will receive a verification code via email to confirm that email is your
            </p>
            <CodeVerification handleCancel={handleCancel} otpArr={otpArr} setOtpArr={setOtpArr} handleNewCode={handleNewCode}/>
            {loading && !success && !error && <FormLoading/>}
            {error && !loading && <FormError size='small' className='mt-3' message={error}/>}
            {success && !loading && <FormSuccess size='small' message='Email send!' className='mt-3'/>}
            <Button
                onClick={handleSubmitCode}
                className="mt-2"
                size="full"
                variant="secondary"
            >
                Confirm
            </Button>
        </>
    )
}
