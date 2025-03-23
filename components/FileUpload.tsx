"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

interface AuthResponse {
  token: string;
  expire: number;
  signature: string;
}

const authenticator = async (): Promise<AuthResponse> => {
  try {

    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL!;

    const response = await fetch(`${baseUrl}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`1Authentication request failed: ${error.message}`);
    }
    throw new Error("2An unknown error occurred while authenticating.");
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "user" | "admin";
  onFileChange: (filePath: string) => void;
  value?: string;
}

interface FileState {
  filePath: string | null;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<FileState>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "user" ? "bg-dark-300" : "bg-gray-900 border-gray-500 border",
    placeholder: variant === "user" ? "text-light-100" : "text-gray-200",
    text: variant === "user" ? "text-light-100" : "",
  };

  const onError = (error: unknown) => {
    console.log(error);

    if (error instanceof Error) {
      toast.error(`3Your ${type} could not be uploaded. Please try again. Error: ${error.message}`);
    } else {
      toast.error(`4Your ${type} could not be uploaded. Please try again.`);
      console.log("Error: ", error);
    }
  };

  const onSuccess = (res: { filePath: string }) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success(`Your ${type} has been uploaded successfully.`);
  };

  const onValidate = (file: File): boolean => {
    const maxSize = type === "image" ? 20 * 1024 * 1024 : 50 * 1024 * 1024; // 20MB for images, 50MB for videos
    if (file.size > maxSize) {
      toast.error(`File size too large. Please upload a file smaller than ${maxSize / (1024 * 1024)}MB.`);
      return false;
    }
    return true;
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file.filePath && <p className={cn("upload-filename", styles.text)}>Image upload successfully.</p>}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-primary-admin h-2 mt-2">
          <div className="progress" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      )}

      {file.filePath &&
        (type === "image" ? (
          <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />
        ) : (
          <IKVideo path={file.filePath} controls className="h-96 w-full rounded-xl" />
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
