import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container text-center text-2xl">
      <h2 className="text-red-500">Home page</h2>
      <LoginButton>
        <Button size="full">To login</Button>
      </LoginButton>
    </div>
  );
}
