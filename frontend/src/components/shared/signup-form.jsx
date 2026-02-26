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
import { Input } from "@/components/ui/input"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Register} from "@/auth";

export function SignupForm({...props}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    }
    Register(payload)
        .then(function (result) {
          if (result.status === 201) {
            navigate("/dashboard");
          }
        })
        .catch (function (error) {
          console.log(error?.response?.data.non_field_errors);
          alert(error?.response?.data.non_field_errors)
        })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password1">Password</FieldLabel>
              <Input
                  id="password1"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password2">Confirm Password</FieldLabel>
              <Input
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">Create Account</Button>
                <Button variant="outline" type="button" disabled>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
