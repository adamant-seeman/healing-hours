import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Search, Trash2 } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createSupabaseAdminClient, Enquiry, EnquiryStatus } from "@/lib/supabase";

const statuses: EnquiryStatus[] = ["new", "contacted", "closed"];

async function deleteEnquiry(formData: FormData) {
  "use server";

  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("enquiries").delete().eq("id", id);
  revalidatePath("/admin/dashboard");
}

async function updateStatus(formData: FormData) {
  "use server";

  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as EnquiryStatus;

  if (!id || !statuses.includes(status)) return;

  const supabase = createSupabaseAdminClient();
  await supabase.from("enquiries").update({ status }).eq("id", id);
  revalidatePath("/admin/dashboard");
}

export default async function AdminDashboard({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  const params = await searchParams;
  const query = String(params?.q || "").trim();
  const supabase = createSupabaseAdminClient();

  const totalPromise = supabase.from("enquiries").select("id", { count: "exact", head: true });
  const newPromise = supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new");
  const closedPromise = supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "closed");

  let enquiriesQuery = supabase
    .from("enquiries")
    .select("id,name,phone,email,message,status,created_at")
    .order("created_at", { ascending: false });

  if (query) {
    enquiriesQuery = enquiriesQuery.or(
      `name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%,message.ilike.%${query}%`
    );
  }

  const [totalResult, newResult, closedResult, enquiriesResult] = await Promise.all([
    totalPromise,
    newPromise,
    closedPromise,
    enquiriesQuery
  ]);

  const enquiries = (enquiriesResult.data || []) as Enquiry[];

  return (
    <main className="min-h-screen bg-cream px-5 py-10 text-ink dark:bg-[#201c27] dark:text-cream sm:px-8">
      <div className="watercolor" />
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sage">The Healing Hour</p>
            <h1 className="serif mt-3 text-5xl font-semibold text-purple dark:text-beige">Enquiries</h1>
          </div>
          <form action="/admin/dashboard" className="glass flex w-full items-center gap-3 rounded-full px-4 py-3 sm:max-w-sm">
            <Search size={18} className="text-purple dark:text-beige" aria-hidden="true" />
            <input
              name="q"
              defaultValue={query}
              placeholder="Search enquiries"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40 dark:placeholder:text-cream/40"
            />
          </form>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Total enquiries" value={totalResult.count || 0} />
          <StatCard label="New enquiries" value={newResult.count || 0} />
          <StatCard label="Closed enquiries" value={closedResult.count || 0} />
        </section>

        <section className="glass mt-8 overflow-hidden rounded-[32px]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead className="border-b border-purple/12 bg-white/40 text-xs uppercase tracking-[0.18em] text-purple dark:bg-white/8 dark:text-beige">
                <tr>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">Message</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Delete</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b border-purple/10 last:border-0">
                    <td className="px-5 py-5 font-semibold text-ink/82 dark:text-cream/86">{enquiry.name}</td>
                    <td className="px-5 py-5 text-sm text-ink/68 dark:text-cream/72">{enquiry.phone}</td>
                    <td className="px-5 py-5 text-sm text-ink/68 dark:text-cream/72">{enquiry.email}</td>
                    <td className="max-w-xs px-5 py-5 text-sm leading-6 text-ink/68 dark:text-cream/72">
                      {enquiry.message || "—"}
                    </td>
                    <td className="px-5 py-5">
                      <form action={updateStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={enquiry.id} />
                        <select
                          name="status"
                          defaultValue={enquiry.status}
                          className="rounded-full border border-purple/14 bg-white/70 px-4 py-2 text-sm font-semibold text-purple outline-none dark:bg-white/8 dark:text-beige"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="focus-ring rounded-full bg-lavender/24 px-3 py-2 text-xs font-semibold text-purple transition hover:bg-lavender/36 dark:text-beige"
                        >
                          Update
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-5 text-sm text-ink/60 dark:text-cream/64">
                      {new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short"
                      }).format(new Date(enquiry.created_at))}
                    </td>
                    <td className="px-5 py-5">
                      <form action={deleteEnquiry}>
                        <input type="hidden" name="id" value={enquiry.id} />
                        <button
                          type="submit"
                          className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-red-100 bg-red-50 text-red-600 transition hover:-translate-y-0.5 hover:bg-red-100"
                          aria-label={`Delete enquiry from ${enquiry.name}`}
                        >
                          <Trash2 size={17} aria-hidden="true" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!enquiries.length && (
            <p className="px-6 py-10 text-center text-ink/62 dark:text-cream/68">
              No enquiries found.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="glass rounded-[28px] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">{label}</p>
      <p className="serif mt-4 text-5xl font-semibold text-purple dark:text-beige">{value}</p>
    </article>
  );
}
