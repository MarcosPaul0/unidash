"use client";

import { StudentIncomingDialog } from "@unidash/app/(private)/studentIncomingData/_components/StudentIncomingDialog";
import { Can } from "@unidash/components/Can";
import { WelcomeDialog } from "../WelcomeDialog";

export function DashboardDialogs() {
  return (
    <>
      <Can allowedRoles={["student"]}>
        <StudentIncomingDialog />
      </Can>

      <WelcomeDialog />
    </>
  );
}
