import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (typeof id !== "number") {
    return notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) return notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
    </div>
  );
};
export default IssueDetailPage;
