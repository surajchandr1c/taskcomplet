import React from "react";
import Skeleton from "@/app/components/ui/Skeleton";
import Card from "@/app/components/ui/Card";

export default function RoadmapSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Header Card Skeleton */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" width="60%" className="h-7" />
            <Skeleton variant="text" width="40%" className="h-4" />
          </div>
          <Skeleton variant="rectangular" width={120} className="h-10 shrink-0" />
        </div>
      </Card>

      {/* Progress Card Skeleton */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Skeleton variant="text" width="30%" className="h-4" />
          <Skeleton variant="text" width="10%" className="h-4" />
        </div>
        <Skeleton variant="rectangular" width="100%" className="h-2.5 rounded-full" />
      </Card>

      {/* Checklist Sections Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((idx) => (
          <Card key={idx} className="p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
              <Skeleton variant="text" width="40%" className="h-6" />
              <div className="flex gap-2">
                <Skeleton variant="rectangular" width={60} className="h-7" />
                <Skeleton variant="rectangular" width={80} className="h-7" />
              </div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((taskIdx) => (
                <div key={taskIdx} className="flex items-center justify-between py-2 border-b border-zinc-900/40">
                  <div className="flex items-center gap-3 flex-1">
                    <Skeleton variant="circular" width={20} height={20} className="shrink-0" />
                    <Skeleton variant="text" width="70%" className="h-4" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton variant="rectangular" width={50} className="h-6" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
