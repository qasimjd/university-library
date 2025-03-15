import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { handleSignOut } from "@/lib/actions/auth.action";

export function LogoutDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="rounded-full">
                    <LogOut size={24} className="text-red-500" />
                </button>
            </DialogTrigger>
            <DialogContent className="smmax-w-md bg-blue-950 text-white border border-primary p-6 rounded-xl shadow-xl"
                style={{
                    backgroundImage: "url('/images/pattern.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                }}>
                <DialogHeader className="text-center">
                    <DialogTitle className="text-lg font-semibold text-white">Sign Out</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Are you sure you want to log out? You will need to sign in again to access your account.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <form action={handleSignOut}>
                        <Button
                            type="submit"
                            variant="destructive"
                            className="bg-red-700 hover:bg-red-600 w-full transition-colors duration-200"
                        >
                            Logout
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
