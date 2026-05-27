import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { isAdminAuthenticated, setAdminCookie } from "@/lib/admin-auth";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") || "");

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin?error=1");
  }

  await setAdminCookie();
  redirect("/admin/dashboard");
}

export default async function AdminLogin({
  searchParams
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;

  return (
    <main className="min-h-screen bg-cream px-5 py-16 text-ink dark:bg-[#201c27] dark:text-cream">
      <div className="watercolor" />
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center">
        <form
          action={login}
          className="glass w-full rounded-[32px] p-7 shadow-bloom sm:p-8"
          aria-label="Admin login"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lavender/24 text-purple dark:text-beige">
            <LockKeyhole size={24} aria-hidden="true" />
          </span>
          <h1 className="serif mt-7 text-4xl font-semibold text-purple dark:text-beige">Admin Login</h1>
          <p className="mt-3 leading-7 text-ink/64 dark:text-cream/70">
            Enter the private clinic password to manage enquiries.
          </p>

          <label className="mt-8 block">
            <span className="mb-2 block text-sm font-semibold text-ink/72 dark:text-cream/78">Password</span>
            <input
              name="password"
              type="password"
              required
              className="focus-ring w-full rounded-full border border-purple/14 bg-white/65 px-5 py-4 text-ink shadow-sm outline-none transition placeholder:text-ink/36 focus:border-purple/40 dark:bg-white/8 dark:text-cream"
              placeholder="Admin password"
            />
          </label>

          {params?.error && (
            <p role="alert" className="mt-5 rounded-[20px] bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              Incorrect password.
            </p>
          )}

          <button
            type="submit"
            className="focus-ring mt-7 inline-flex w-full items-center justify-center rounded-full bg-purple px-7 py-4 font-semibold text-white shadow-bloom transition hover:-translate-y-1 hover:bg-[#7f6aa8]"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
