"use client";

/* React Imports */
import { useState, type FormEvent } from "react";

/* Next Imports */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* Shadcn Imports */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/app/_components/ui/field";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconLoader2 } from "@tabler/icons-react";

/* Auth Imports */
import { authClient } from "~/server/better-auth/client";

/* Utils Imports */
import { cn } from "~/lib/utils";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();

  /* Event states */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ type: "", message: "" });

  /* Login states */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError({ type: "", message: "" });

    if (!username) {
      setError({ type: "username", message: "Username is required" });
      setLoading(false);
      return;
    }

    if (!password) {
      setError({ type: "password", message: "Password is required" });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.username({
        username,
        password,
      });

      console.log({ data, error });

      if (error) {
        setError({
          type: "general",
          message: error.message ?? "An error occurred",
        });
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>

          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error.type === "general" && (
                <FieldError className="rounded-md bg-red-400/10 p-2">
                  &#8226; {error.message}
                </FieldError>
              )}

              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="username@company"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {error.type === "username" && (
                  <FieldError className="rounded-md bg-red-400/10 p-2">
                    &#8226; {error.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Link href="#" className="ml-auto text-sm hover:underline">
                    Forgot your password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.type === "password" && (
                  <FieldError className="rounded-md bg-red-400/10 p-2">
                    &#8226; {error.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <Button type="submit">
                  {loading ? <IconLoader2 className="animate-spin" /> : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/book-demo">Request a demo</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking login, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default LoginForm;
