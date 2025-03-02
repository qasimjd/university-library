import { Client as WorkflowClient } from "@upstash/workflow";

export const workflowclient = new WorkflowClient({
    baseUrl: process.env.WORKFLOW_API_KEY,
    token: process.env.WORKFLOW_ID,
});