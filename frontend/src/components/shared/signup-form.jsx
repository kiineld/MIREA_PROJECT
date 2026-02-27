import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Register } from "@/auth"
import {signupSchema} from "@/components/forms/signup-schema.jsx";


export function SignupForm({className, ...props}) {
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password1: "",
            password2: "",
        },
    })

    const onSubmit = async (data) => {
        const payload = {
            username: data.username,
            email: data.email,
            password1: data.password1,
            password2: data.password2,
        }
        Register(payload)
            .then(function (result) {
                if (result.status === 201) {
                    navigate("/dashboard");
                }
            })
            .catch (function (error) {
                console.log(error?.response?.data);
                alert(error?.response?.data)
            })
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="username">Username</FieldLabel>
                                        <Input
                                            {...field}
                                            id="username"
                                            placeholder="John Doe"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Field className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="password1"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password1">Password</FieldLabel>
                                            <Input
                                                {...field}
                                                id="password1"
                                                type="password"
                                                placeholder="********"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="password2"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password2">
                                                Confirm Password
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="password2"
                                                type="password"
                                                placeholder="********"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </Field>

                            <Field>
                                <Button type="submit">Create Account</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/login">Sign in</a>
                                </FieldDescription>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            {/*<FieldDescription className="px-6 text-center">*/}
            {/*    By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}*/}
            {/*    <a href="#">Privacy Policy</a>.*/}
            {/*</FieldDescription>*/}
        </div>
    )
}
