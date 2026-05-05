import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
