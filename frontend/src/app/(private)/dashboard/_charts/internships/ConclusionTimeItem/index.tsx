import { ConclusionTimeItemProps } from "./conclusionTimeItem.interface";

export function ConclusionTimeItem({
  icon,
  title,
  value,
  color = "blue",
}: ConclusionTimeItemProps) {
  return (
    <dl className="flex flex-col gap-2 bg-popover-secondary/5 rounded-xl p-3">
      <i
        className={`
          flex items-center justify-center w-fit p-2 rounded-full
          text-2xl bg-icon-${color} text-icon-${color}-foreground`}
      >
        {icon}
      </i>

      <dt className="text-base">{title}</dt>

      <dd className="font-bold text-2xl">{Math.ceil(value)} dias</dd>
    </dl>
  );
}
