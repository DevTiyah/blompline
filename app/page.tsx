import { Button } from "@/components/ui/button";
import { 
  RegisterLink, 
  LoginLink,
  LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Home() {
  // trying to check if the user is authenticated and also getting the user in session
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  return (
    <div>
      <h1>Hello</h1>
      {/* imported the auth from kinde and display it on the frontend */}
      {session ? (
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      ) : (
        <div>
          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
        </div>
      )}
    </div>
  );
}
