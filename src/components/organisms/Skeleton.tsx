import { Skeleton } from '../ui/skeleton';

export const ProductSkeleton = () => {
  return (
    <div className="w-60 flex flex-col p-4 shadow gap-3 rounded-lg">
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-1/2 h-8" />
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </div>
  );
};

export const DetailProductSkeleton = () => {
  return (
    <>
      <div className="col-start-2 col-span-5">
        <Skeleton className="w-full aspect-square" />
      </div>
      <div className="col-span-6 space-y-4">
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/4 h-4" />
      </div>
    </>
  );
};
