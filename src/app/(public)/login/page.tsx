/* Icons Imports */
import { IconChartArcs } from "@tabler/icons-react";

/* Components Imports */
import LoginForm from "~/app/_components/layout/login-form";

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-1 self-center font-medium">
          <IconChartArcs className="size-5" />
          <span>HermesHub</span>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
