import { ReactNode } from "react";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { after } from "next/server";
import User from "@/database/Models/user.model";


const Layout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    const user = await User.findById(session.user?.id);
    const lastactiveCheck = user?.lastActive ? new Date(user.lastActive).toISOString().split('T')[0] : null;
    const today = new Date().toISOString().split('T')[0];

    if (lastactiveCheck !== today) {

      await User.findByIdAndUpdate(
        session.user?.id,
        { lastActive: new Date() },
        { new: true }
      );
    }
    return;
  });


  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />

        <div className="mt-14 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;