import { Session } from "next-auth";
import SearchBar from "../SearchBar";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-gray-100 mb-3">
          Welcome, {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>

      {/* <SearchBar /> */}
    </header>
  );
};
export default Header;