import eventsData from "@/data/events.json";
import { createClient } from "@/lib/supabase";
import type { Event } from "@/lib/types/content";

function getEventsFromJson(): Event[] {
  return (eventsData as unknown as Event[]).filter((event) => event.published);
}

export async function getEvents(): Promise<Event[]> {
  const supabase = createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true);

    if (!error && data) {
      return data as Event[];
    }

    console.warn("Supabase fetch failed, falling back to JSON:", error?.message);
  }

  return getEventsFromJson();
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  return events
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= now;
    })
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );
}

export async function getPastEventsWithReplays(): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  return events
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate < now && event.replay_url !== null;
    })
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
}

export async function getPastEvents(): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  return events
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate < now;
    })
    .sort(
      (a, b) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
}
