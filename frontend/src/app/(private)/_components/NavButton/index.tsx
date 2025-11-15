"use client";

import { Button } from "@unidash/components/Button";
import { NavButtonProps } from "./navButton.interface";
import { MouseEvent } from "react";

export function NavButton({ sectionId, children, ...rest }: NavButtonProps) {
  function handleScrollToSection(
    event: MouseEvent<HTMLButtonElement>,
    sectionId: string
  ) {
    event.preventDefault();
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Button
      onClick={(event) => handleScrollToSection(event, sectionId)}
      {...rest}
    >
      {children}
    </Button>
  );
}
