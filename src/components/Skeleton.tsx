import { Skeleton } from "./ui/skeleton";

const SkeletonLoader = () => (
  <div className="flex items-center space-x-4 h-screen w-full">
    <Skeleton className="h-[100px] w-[100px]  rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export default SkeletonLoader;
