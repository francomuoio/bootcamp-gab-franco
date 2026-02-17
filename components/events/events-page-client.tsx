"use client";

import { useMemo, useState } from "react";
import { Calendar, Play, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EventCard } from "@/components/events/event-card";
import { EventFilters } from "@/components/events/event-filters";
import { VideoPlayerModal } from "@/components/events/video-player-modal";
import { useEventFilters } from "@/hooks/use-event-filters";
import {
  filterEvents,
  sortEvents,
  computeCityCounts,
  computeTypeCounts,
  computePeriodCounts,
  isDefaultFilters,
} from "@/lib/utils/filter-events";
import type { Event } from "@/lib/types/content";

interface EventsPageClientProps {
  events: Event[];
}

export function EventsPageClient({ events }: EventsPageClientProps) {
  const { filters, toggleCity, setType, setPeriod, resetFilters } =
    useEventFilters();
  const [replayEvent, setReplayEvent] = useState<Event | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  const { upcoming, past } = useMemo(
    () => sortEvents(filteredEvents),
    [filteredEvents]
  );

  const cityCounts = useMemo(
    () => computeCityCounts(events, filters),
    [events, filters]
  );
  const typeCounts = useMemo(
    () => computeTypeCounts(events, filters),
    [events, filters]
  );
  const periodCounts = useMemo(
    () => computePeriodCounts(events, filters),
    [events, filters]
  );

  const filtersPanel = (
    <EventFilters
      filters={filters}
      cityCounts={cityCounts}
      typeCounts={typeCounts}
      periodCounts={periodCounts}
      onToggleCity={toggleCity}
      onSetType={setType}
      onSetPeriod={setPeriod}
      onReset={resetFilters}
    />
  );

  const hasActiveFilters = !isDefaultFilters(filters);
  const totalCount = filteredEvents.length;

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="font-heading text-3xl font-bold mb-4">Events</h1>
          <p className="text-lg text-muted-foreground">
            Meetups, webinars et workshops avec des experts GenAI. Participe en
            direct ou regarde les replays.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">{filtersPanel}</div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Results count + mobile filter button */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {totalCount} événement{totalCount !== 1 ? "s" : ""}
                {hasActiveFilters ? " (filtré)" : ""}
              </p>

              {/* Mobile filter trigger */}
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtrer
                    {hasActiveFilters && (
                      <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                    <SheetDescription>
                      Affinez votre recherche d&apos;événements
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">{filtersPanel}</div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Empty state */}
            {filteredEvents.length === 0 && (
              <div className="rounded-lg border border-border/50 p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Aucun événement ne correspond à vos critères.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}

            {/* Upcoming Events */}
            {upcoming.length > 0 && (
              <section className="mb-12">
                <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Prochains events ({upcoming.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}

            {/* Past Events / Replays */}
            {past.length > 0 && (
              <section>
                <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Événements passés ({past.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {past.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onReplayClick={
                        event.replay_url ? setReplayEvent : undefined
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        event={replayEvent}
        open={replayEvent !== null}
        onOpenChange={(open) => {
          if (!open) setReplayEvent(null);
        }}
      />
    </>
  );
}
