"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";


const { env: { imagekit: { publicKey, urlEndpoint }, }, } = config;

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text();

            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`,
            );
        }

        const data = await response.json();

        const { signature, expire, token } = data;

        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const FileUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {

    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string | null }>();

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);
        toast.success(`${res.filePath} uploaded successfully`);
    };

    const onError = (res: any) => {
        toast.error(`${res.filePath} uploading file`);
    };

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                className="hidden"
                ref={ikUploadRef}
                fileName="test-upload.png"
                onSuccess={onSuccess}
                onError={onError}
            />

            <button
                className={cn("upload-btn")}
                onClick={(e) => {
                    e.preventDefault();

                    if (ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current?.click();
                    }
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className="object-contain"
                />

                <p className={cn("text-base",)}>Upload a File</p>

                {file && (<p className={cn("upload-filename",)}>{file.filePath}</p>)}
            </button>

            {file && (
                <IKImage
                    path={file.filePath || undefined}
                    width={500}
                    height={300}
                    alt="Uploaded file"
                />
            )}

        </ImageKitProvider>
    );
}

export default FileUpload;