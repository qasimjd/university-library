"use client";

import dynamic from "next/dynamic";
import { IUser } from "@/database/Models/user.model";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

const IKImage = dynamic(() => import("imagekitio-next").then((mod) => mod.IKImage), { ssr: false });

const StudentIDCard = (profile: IUser) => {
  const { fullName, email, universityCard, universityId, status } = profile;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-2xl h-fit shadow-lg relative">

      <div className="flex gap-2 items-center">
        <Avatar className="size-24">
          <AvatarFallback className="w-full h-full bg-blue-400 border-4 border-gray-700 text-black font-normal text-4xl">
            {fullName.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold mt-3">{fullName}</p>
          <p className="text-gray-400 text-sm">{email}</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm">Status: {status.toUpperCase()}</p>
            <span
              className={`w-3 h-3 rounded-full animate-pulse ease-in-out ${status.toLowerCase() === "approve"
                  ? "bg-green-500"
                  : status.toLowerCase() === "rejected"
                    ? "bg-red-700"
                    : "bg-orange-400"
                }`}
            ></span>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">University</p>
        <p className="text-lg font-semibold">QasimJd Pro</p>
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-400">Student ID</p>
        <p className="text-lg font-semibold">{universityId}</p>
      </div>

      {/* University Card */}
      <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-inner">
        <div className="mt-3 space-y-1 text-sm">
          {universityCard && urlEndpoint ? (
            <IKImage urlEndpoint={urlEndpoint} path={universityCard} width={500} height={300} alt="University Card" />
          ) : (
            <p className="text-gray-400">No image available</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentIDCard;