"use client";

import { useCan } from "@unidash/hooks/useCan";
import { CanProps } from "./can.interface";

export function Can({ allowedRoles, allowedTeacherRoles, children }: CanProps) {
  const can = useCan(allowedRoles, allowedTeacherRoles);

  if (can) {
    return children;
  }

  return null;
}
