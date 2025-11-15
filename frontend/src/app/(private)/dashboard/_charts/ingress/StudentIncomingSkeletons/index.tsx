import { Skeleton } from "@unidash/components/Skeleton";

export function StudentIncomingSkeletons() {
  return (
    <>
      <Skeleton className="w-ful h-[46px] max-w-[300px] rounded-xl" />

      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8">
        <Skeleton className="w-ful h-[486px] col-span-2" />
        <Skeleton className="w-ful h-[486px] col-span-1" />
      </div>

      <Skeleton className="w-ful h-[568px]" />
    </>
  );
}
