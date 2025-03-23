import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowclient = new WorkflowClient({
    baseUrl: process.env.WORKFLOW_API_KEY,
    token: process.env.WORKFLOW_ID,
});

const qStashClient = new QStashClient({ token: process.env.QSTASH_TOKEN! });

await qStashClient.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: "<RESEND_TOKEN>" }),
  },
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
});