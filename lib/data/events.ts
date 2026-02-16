import eventsData from "@/data/events.json";
import type { Event } from "@/lib/types/content";

export function getEvents(): Event[] {
  return (eventsData as unknown as Event[]).filter((event) => event.published);
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return getEvents()
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= now;
    })
    .sort((a, b) => 
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );
}

export function getPastEventsWithReplays(): Event[] {
  const now = new Date();
  return getEvents()
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate < now && event.replay_url !== null;
    })
    .sort((a, b) => 
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
}

export function getPastEvents(): Event[] {
  const now = new Date();
  return getEvents()
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate < now;
    })
    .sort((a, b) => 
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
}
