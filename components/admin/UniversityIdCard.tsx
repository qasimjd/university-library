"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IKImage } from "imagekitio-next";
import { LinkIcon } from "lucide-react";

const UniversityIdCard = ({ universityCard }: { universityCard: string }) => {
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!urlEndpoint) {
        console.error("ImageKit URL endpoint is missing. Check your .env.local file.");
        return null; // Prevents component from rendering if not configured correctly
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-2">
                    <span className="text-blue-400 hover:text-blue-300">View ID card</span>
                    <LinkIcon color="#669df5" size={16} />
                </div>
            </DialogTrigger>
            <DialogContent className="p-2 bg-gray-900 rounded-lg shadow-lg text-white">
                <DialogTitle className="sr-only"></DialogTitle>
                <DialogDescription className="sr-only">
                </DialogDescription>
                {universityCard ? (
                    <IKImage
                        urlEndpoint={urlEndpoint}
                        path={universityCard}
                        width={700} height={400}
                        alt="University ID Card"
                        className="rounded-lg shadow-md"
                    />
                ) : (
                    <p className="text-gray-400">No image available</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UniversityIdCard;
