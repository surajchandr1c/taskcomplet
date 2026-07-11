import React from "react";
import Skeleton from "@/app/components/ui/Skeleton";
import Card from "@/app/components/ui/Card";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome Card Skeleton */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" width="100px" className="h-4" />
            <Skeleton variant="text" width="300px" className="h-8" />
            <Skeleton variant="text" width="400px" className="h-4" />
          </div>
          <Skeleton variant="rectangular" width={150} className="h-10 shrink-0" />
        </div>
      </Card>

      {/* Main Grid: Calendar & Sidebar */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
        {/* Calendar Box */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-6">
            <div className="space-y-2">
              <Skeleton variant="text" width="120px" className="h-6" />
              <Skeleton variant="text" width="80px" className="h-4" />
            </div>
            <div className="flex gap-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </div>
          </div>
          {/* Calendar grid skeleton lines */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" className="h-14 rounded-lg" />
            ))}
          </div>
        </Card>

        {/* Sidebar widgets */}
        <div className="space-y-4">
          {/* Metrics */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[1, 2, 3].map((idx) => (
              <Card key={idx} className="p-4 space-y-3">
                <Skeleton variant="text" width="80px" className="h-4" />
                <Skeleton variant="text" width="40px" className="h-8" />
              </Card>
            ))}
          </div>

          {/* Quick Tasks List */}
          <Card className="p-4 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
              <Skeleton variant="text" width="100px" className="h-6" />
              <Skeleton variant="text" width="80px" className="h-4" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((taskIdx) => (
                <div key={taskIdx} className="flex justify-between items-center py-2 border-b border-zinc-900/30">
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" width="60%" className="h-4" />
                    <Skeleton variant="text" width="30%" className="h-3" />
                  </div>
                  <Skeleton variant="text" width="30px" className="h-4" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
