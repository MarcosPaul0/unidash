import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { IndicatorCardProps } from "./indicatorCardProps.interface";
import { cn } from "@unidash/lib/cn";
import {
  iconVariants,
  indicatorVariants,
  SITUATION_ICON,
} from "./indicatorCard.constant";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@unidash/components/Tooltip";
import { InfoIcon, SparkleIcon } from "@phosphor-icons/react/dist/ssr";

export function IndicatorCard({
  icon,
  title,
  value,
  observation,
  situation,
  variant,
  size,
  tooltip,
}: IndicatorCardProps) {
  return (
    <Card>
      <CardHeader>
        <i className={cn(iconVariants({ variant }))}>{icon}</i>

        <CardTitle className="font-semibold">{title}</CardTitle>

        {tooltip && (
          <Tooltip>
            <TooltipTrigger className="absolute top-0 right-6">
              <InfoIcon className="size-6" />
            </TooltipTrigger>

            <TooltipContent className="flex flex-col gap-2  p-4 max-w-lg">
              <strong className="text-sm flex items-center gap-2">
                <SparkleIcon weight="fill" />
                {title}
              </strong>

              <p className="p-2 bg-popover-secondary rounded-xl text-base">
                {tooltip}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardHeader>

      <CardContent className="flex items-center gap-2">
        <strong className={cn(indicatorVariants({ size }))}>{value}</strong>

        {situation && SITUATION_ICON[situation]}

        {observation && <span className="text-xs flex-1">{observation}</span>}
      </CardContent>
    </Card>
  );
}
