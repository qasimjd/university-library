import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";


const {env: { imagekit: { privateKey, publicKey, urlEndpoint}}} = config

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}