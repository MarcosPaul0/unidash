import { Skeleton } from "@unidash/components/Skeleton";

export function CourseSkeletons() {
  return (
    <>
      <Skeleton className="w-ful h-[46px] max-w-[300px] rounded-xl" />

      <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
        <Skeleton className="w-ful h-[184px]" />
        <Skeleton className="w-ful h-[184px]" />
        <Skeleton className="w-ful h-[184px]" />
        <Skeleton className="w-ful h-[184px]" />
      </div>

      <div className="flex flex-col md:grid md:grid-cols-7 gap-4 md:gap-8">
        <Skeleton className="w-ful h-[581px] col-span-3" />
        <Skeleton className="w-ful h-[581px] col-span-4" />
      </div>
    </>
  );
}
