import { LoginButton } from "@/app/auth/_components/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="container flex h-screen items-center justify-center text-center text-2xl">
        <div>
          <h2 className="mb-4">Welcome to AutoStyle</h2>
          <LoginButton>
            <Button variant="secondary" size="default">
              To login
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
