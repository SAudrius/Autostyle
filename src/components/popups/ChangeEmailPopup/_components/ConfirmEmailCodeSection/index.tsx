import { 
    Button, 
    CodeVerification, 
    FormError, 
    FormLoading, 
    FormSuccess 
} from "@/components";
import { cn, nunito } from '@/config';


interface ConfirmEmailCodeSectionProps {
    otpArr: string[]
    setOtpArr: React.Dispatch<React.SetStateAction<string[]>>
    handleCancel: () => void,
    handleSubmitCode: () => void,
    handleNewCode: () => void,
    loading:boolean;
    error: string;
    success: boolean;
}

export const ConfirmEmailCodeSection = ( {
    otpArr,
    setOtpArr,
    handleCancel,
    handleSubmitCode,
    handleNewCode,
    loading,
    error,
    success,
}: ConfirmEmailCodeSectionProps ) => {
    return (
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Procced email change
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                You will receive a verification code via email to confirm that email is your
            </p>
            <CodeVerification handleCancel={handleCancel} otpArr={otpArr} setOtpArr={setOtpArr} handleNewCode={handleNewCode} />
            {loading && !success && !error && <FormLoading />}
            {error && !loading && <FormError size="small" className="mt-3" message={error} />}
            {success && !loading && <FormSuccess size="small" className="mt-3" message="Email send!" />}
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
