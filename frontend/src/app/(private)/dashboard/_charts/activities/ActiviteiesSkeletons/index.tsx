import { Skeleton } from "@unidash/components/Skeleton";

export function ActivitiesSkeletons() {
  return (
    <>
      <Skeleton className="w-ful h-[46px] max-w-[300px] rounded-xl" />

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <Skeleton className="w-ful h-[568px]" />
        <Skeleton className="w-ful h-[568px]" />
      </div>
    </>
  );
}
