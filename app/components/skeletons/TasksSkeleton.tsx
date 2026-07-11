import React from "react";
import Skeleton from "@/app/components/ui/Skeleton";
import Card from "@/app/components/ui/Card";

export default function TasksSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <Skeleton variant="text" width="200px" className="h-8 mb-4" />

      {/* Tasks List Grid */}
      <div className="space-y-3 max-w-xl">
        {[1, 2, 3].map((idx) => (
          <Card key={idx} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <Skeleton variant="text" width="50%" className="h-5" />
                <Skeleton variant="text" width="25%" className="h-4" />
              </div>
              <Skeleton variant="text" width="60px" className="h-5" />
            </div>
            <div className="flex gap-2">
              <Skeleton variant="rectangular" width={80} className="h-7" />
              <Skeleton variant="rectangular" width={80} className="h-7" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
