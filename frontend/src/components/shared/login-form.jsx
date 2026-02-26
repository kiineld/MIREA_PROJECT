import { cn } from "@/lib/utils.js"
import { Button } from "@/components/ui/button.jsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.jsx"
import { Input } from "@/components/ui/input.jsx"
import {useState} from "react";
import {Login} from "@/auth";
import {useNavigate} from "react-router-dom";


export function LoginForm({className, ...props}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    }
    try {
      await Login(payload)
          .then(function (result) {
            if (result.status === 200) {
              navigate("/dashboard");
            }
          })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder="dot@dot.dot"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </Field>
              <Field>
                <Button className="cursor-pointer" type="submit">Login</Button>
                <Button variant="outline" type="button" disabled>
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
