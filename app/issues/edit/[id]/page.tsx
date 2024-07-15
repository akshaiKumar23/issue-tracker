import prisma from "@/prisma/client";

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import EditPageSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <EditPageSkeleton />,
});
interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
