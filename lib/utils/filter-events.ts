import type { City, Event, EventType } from "@/lib/types/content";

// --- Constants ---

export const CITIES: City[] = ["Lille", "Paris", "Lyon", "Remote", "Autre"];

export const EVENT_TYPES: EventType[] = [
  "meetup",
  "webinar",
  "workshop",
  "conference",
];

export const PERIODS = ["all", "upcoming", "replays"] as const;
export type Period = (typeof PERIODS)[number];

export const PERIOD_LABELS: Record<Period, string> = {
  all: "Tous les événements",
  upcoming: "À venir uniquement",
  replays: "Replays disponibles",
};

export const EVENT_TYPE_LABELS: Record<"all" | EventType, string> = {
  all: "Tous",
  meetup: "Meetup",
  webinar: "Webinar",
  workshop: "Workshop",
  conference: "Conférence",
};

export const CITY_BADGE_COLORS: Record<City, string> = {
  Lille: "bg-green-100 text-green-800 border-green-200",
  Paris: "bg-blue-100 text-blue-800 border-blue-200",
  Lyon: "bg-red-100 text-red-800 border-red-200",
  Remote: "bg-purple-100 text-purple-800 border-purple-200",
  Autre: "bg-gray-100 text-gray-800 border-gray-200",
};

// --- Filter State ---

export interface FilterState {
  cities: City[];
  type: EventType | "all";
  period: Period;
}

export const DEFAULT_FILTERS: FilterState = {
  cities: [],
  type: "all",
  period: "all",
};

// --- Filtering ---

export function filterEvents(events: Event[], filters: FilterState): Event[] {
  const now = new Date();

  return events.filter((event) => {
    // City filter (multi-select: empty means all)
    if (filters.cities.length > 0 && !filters.cities.includes(event.city)) {
      return false;
    }

    // Type filter
    if (filters.type !== "all" && event.event_type !== filters.type) {
      return false;
    }

    // Period filter
    const eventDate = new Date(event.event_date);
    if (filters.period === "upcoming" && eventDate < now) {
      return false;
    }
    if (
      filters.period === "replays" &&
      (eventDate >= now || !event.replay_url)
    ) {
      return false;
    }

    return true;
  });
}

export function sortEvents(events: Event[]): {
  upcoming: Event[];
  past: Event[];
} {
  const now = new Date();

  const upcoming = events
    .filter((e) => new Date(e.event_date) >= now)
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );

  const past = events
    .filter((e) => new Date(e.event_date) < now)
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );

  return { upcoming, past };
}

// --- Counts ---

export function computeCityCounts(
  events: Event[],
  filters: FilterState
): Record<City, number> {
  const counts = Object.fromEntries(
    CITIES.map((city) => [city, 0])
  ) as Record<City, number>;

  // Apply all filters except city
  const filtersWithoutCity: FilterState = { ...filters, cities: [] };
  const filtered = filterEvents(events, filtersWithoutCity);

  for (const event of filtered) {
    if (counts[event.city] !== undefined) {
      counts[event.city]++;
    }
  }

  return counts;
}

export function computeTypeCounts(
  events: Event[],
  filters: FilterState
): Record<"all" | EventType, number> {
  const counts: Record<string, number> = { all: 0 };
  for (const type of EVENT_TYPES) counts[type] = 0;

  // Apply all filters except type
  const filtersWithoutType: FilterState = { ...filters, type: "all" };
  const filtered = filterEvents(events, filtersWithoutType);

  counts.all = filtered.length;
  for (const event of filtered) {
    counts[event.event_type]++;
  }

  return counts as Record<"all" | EventType, number>;
}

export function computePeriodCounts(
  events: Event[],
  filters: FilterState
): Record<Period, number> {
  const now = new Date();

  // Apply all filters except period
  const filtersWithoutPeriod: FilterState = { ...filters, period: "all" };
  const filtered = filterEvents(events, filtersWithoutPeriod);

  const all = filtered.length;
  const upcoming = filtered.filter(
    (e) => new Date(e.event_date) >= now
  ).length;
  const replays = filtered.filter(
    (e) => new Date(e.event_date) < now && e.replay_url
  ).length;

  return { all, upcoming, replays };
}

// --- URL Serialization ---

export function filtersToSearchParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.cities.length > 0) {
    params.set(
      "cities",
      filters.cities.map((c) => c.toLowerCase()).join(",")
    );
  }
  if (filters.type !== "all") {
    params.set("type", filters.type);
  }
  if (filters.period !== "all") {
    params.set("period", filters.period);
  }

  return params;
}

export function searchParamsToFilters(
  searchParams: URLSearchParams
): FilterState {
  const citiesParam = searchParams.get("cities");
  const typeParam = searchParams.get("type");
  const periodParam = searchParams.get("period");

  const cities: City[] = citiesParam
    ? (citiesParam
        .split(",")
        .map((c) => {
          const found = CITIES.find((city) => city.toLowerCase() === c.trim());
          return found;
        })
        .filter(Boolean) as City[])
    : [];

  const type: EventType | "all" =
    typeParam && EVENT_TYPES.includes(typeParam as EventType)
      ? (typeParam as EventType)
      : "all";

  const period: Period =
    periodParam && PERIODS.includes(periodParam as Period)
      ? (periodParam as Period)
      : "all";

  return { cities, type, period };
}

export function isDefaultFilters(filters: FilterState): boolean {
  return (
    filters.cities.length === 0 &&
    filters.type === "all" &&
    filters.period === "all"
  );
}
