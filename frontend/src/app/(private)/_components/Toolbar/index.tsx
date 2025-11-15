"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@unidash/components/Collapsible";
import { ToolbarProps } from "./toolbar.interface";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@unidash/components/Breadcrumb";
import { LinkButton } from "@unidash/components/LinkButton";
import { FunnelIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import { Button } from "@unidash/components/Button";
import { useCourseStore } from "@unidash/store/course.store";

export function Toolbar({
  breadcrumbItems,
  breadcrumbPage,
  addLink,
  children,
  filterForm,
}: ToolbarProps) {
  const { activeCourse } = useCourseStore();

  return (
    <Collapsible>
      <div className="flex flex-col gap-4 md:flex-row items-start md:items-center md:justify-between border-b-1 border-muted pb-1">
        {breadcrumbPage && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems &&
                breadcrumbItems.map((item) => (
                  <Fragment key={item.label}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={
                          item.fromCourse
                            ? `${item.link}/${activeCourse?.id}`
                            : item.link
                        }
                      >
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator />
                  </Fragment>
                ))}

              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}

        {children}

        <div className="flex items-center gap-4">
          {filterForm && (
            <CollapsibleTrigger asChild>
              <Button type="button" variant="ghost">
                <FunnelIcon />
                Filtro
              </Button>
            </CollapsibleTrigger>
          )}

          {addLink && (
            <LinkButton href={addLink.link} variant="filled" size="md">
              <PlusIcon />
              {addLink.label}
            </LinkButton>
          )}
        </div>
      </div>

      {filterForm && <CollapsibleContent>{filterForm}</CollapsibleContent>}
    </Collapsible>
  );
}
