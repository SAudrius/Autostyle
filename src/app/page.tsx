"use client";
// import { LoginButton } from "@/app/auth/_components/LoginButton";
import { Button } from "@/components/ui/button";
import { testDb } from "@/lib/data/test";

export default function Home() {
  const handleTest = () => {
    testDb().then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="container flex h-screen items-center justify-center text-center text-2xl">
      <div>
        <h2 className="mb-4">Welcome to AutoStyle</h2>
        {/* <LoginButton> */}
        <Button variant="secondary" size="default" onClick={handleTest}>
          To login
        </Button>
        {/* </LoginButton> */}
      </div>
    </div>
  );
}
