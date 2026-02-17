import { Suspense } from "react";
import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { EventsPageClient } from "@/components/events/events-page-client";
import { getEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Meetups, webinars et workshops GenAI. Rejoins la communaute GAB.",
};

function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mb-12">
        <Skeleton className="h-9 w-48 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>
      <div className="flex gap-8">
        <div className="hidden lg:block w-64 shrink-0 space-y-4">
          <Skeleton className="h-6 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
          <Skeleton className="h-6 w-32 mt-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Suspense fallback={<EventsLoading />}>
      <EventsPageClient events={events} />
    </Suspense>
  );
}
