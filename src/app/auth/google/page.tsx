import CardWrapper from "../_components/CardWrapper";
import { GoogleVerify } from "./_component/GoogleVerify";

const GooglePage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
      <CardWrapper
        headerLabel="Verification"
        headerDescription="Confirming your google"
        backButtonText="Back to login"
        backButtonAttribute="/auth/login"
      >
        <GoogleVerify />
      </CardWrapper>
    </div>
  );
};

export default GooglePage;
