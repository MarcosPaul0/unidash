import { Skeleton } from "@unidash/components/Skeleton";

export function TeacherProductionsSkeletons() {
  return (
    <>
      <Skeleton className="w-ful h-[46px] max-w-[300px] rounded-xl" />

      <Skeleton className="w-ful h-[568px]" />
      <Skeleton className="w-ful h-[568px]" />

      {/* <div className="grid grid-cols-7 gap-8">
        <Skeleton className="w-ful h-[568px] col-span-3" />
        <Skeleton className="w-ful h-[568px] col-span-4" />
      </div> */}
    </>
  );
}
