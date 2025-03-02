import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          <Button asChild className="back-btn mr-2">
            <Link href="/">Go Back to /</Link>
          </Button>
          Monitor all of your users and books here
        </p>
      </div>

      {/*<p>Search</p>*/}
    </header>
  );
};
export default Header;