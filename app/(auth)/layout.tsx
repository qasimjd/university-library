import { auth } from "@/auth";
import { MarqueeDemoVertical } from "@/components/authImage";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


const Layout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration">
        <div className="size-full object-cover bg-gray-950">
          <MarqueeDemoVertical />
        </div>
      </section>
    </main>
  );
};

export default Layout;