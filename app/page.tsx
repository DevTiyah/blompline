import { Button } from "@/components/ui/button";
import { 
  RegisterLink, 
  LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <RegisterLink>
        <Button>Get Started</Button>
      </RegisterLink>
      <LoginLink>
        <Button>Login</Button>
      </LoginLink>
    </div>
  );
}
