"use client";

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const SelectStatus = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const [currentStatus, setCurrentStatus] = useState(issue.status);
  const updateStatus = (status: Status) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .then(() => {
        console.log(issue.status);
        console.log(status);
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };
  return (
    <Select.Root defaultValue={currentStatus} onValueChange={updateStatus}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
