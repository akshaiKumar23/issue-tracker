import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(65535),
    description: z.string().min(3, "Description is required"),
});
export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(65535).optional(),
    description: z.string().min(3, "Description is required").optional(),
    assignedToUser: z.string().min(1, "AssignedToUserId is  required").max(255).optional().nullable()
});