import { ChecksIcon } from "@phosphor-icons/react/dist/ssr";
import { ActionPlanItemProps } from "./actionPlanItem.interface";

export function ActionPlanItem({
  academicActionPlans,
  administrativeActionPlans,
  title,
}: ActionPlanItemProps) {
  return (
    <dl className="flex flex-col gap-2 w-full">
      <dt className="flex items-center gap-2 font-bold text-lg text-primary">
        <ChecksIcon size={28} />
        {title}
      </dt>

      <dd className="flex flex-col gap-2">
        {academicActionPlans && (
          <p className="bg-popover-secondary/5 p-4 rounded-xl">
            <strong>Ações Acadêmicas:</strong> {academicActionPlans}
          </p>
        )}
        {administrativeActionPlans && (
          <p className="bg-popover-secondary/5 p-4 rounded-xl">
            <strong>Ações Administrativas:</strong> {administrativeActionPlans}
          </p>
        )}
      </dd>
    </dl>
  );
}
