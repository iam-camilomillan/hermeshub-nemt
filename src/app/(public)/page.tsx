import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section>
        <div className="grid gap-8">
          <span>A very beautiful homepage.</span>

          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
