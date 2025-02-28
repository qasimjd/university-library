import Link from "next/link";
import React from "react";

const Page = () => {
    return (
        <main className="root-container flex min-h-screen flex-col items-center justify-center">
            <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
                Too many requests. Please wait and try again.
            </h1>
            <p className="mt-3 max-w-xl text-center text-light-400">
                You have made too many requests in a short period of time. Please wait a moment before trying again. This is to ensure fair usage and prevent abuse of our services. Thank you for your understanding.
            </p>
            <div className="bg-primary flex gap-1 p-2 mt-5 font-extrabold rounded-lg">
                Return to
                <Link className="underline" href="/"> Sign Up </Link> /
                <Link className="underline" href="/">Sign In</Link>
            </div>
        </main>
    );
};
export default Page;