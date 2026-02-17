import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Play, ExternalLink, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatEventDate } from "@/lib/utils";
import { CITY_BADGE_COLORS } from "@/lib/utils/filter-events";
import type { Event } from "@/lib/types/content";

interface EventCardProps {
  event: Event;
  onReplayClick?: (event: Event) => void;
}

export function EventCard({ event, onReplayClick }: EventCardProps) {
  const isPast = event.is_past || new Date(event.event_date) < new Date();

  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
      {/* Image or Fallback */}
      <div className="relative aspect-video">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-muted-foreground/40" />
          </div>
        )}
        {isPast && event.replay_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Play className="h-12 w-12 text-primary" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant={isPast ? "secondary" : "default"}>
            {event.event_type}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-xs", CITY_BADGE_COLORS[event.city])}
          >
            {event.city}
          </Badge>
          {isPast && event.replay_url && (
            <Badge variant="outline">Replay disponible</Badge>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{formatEventDate(event.event_date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>{event.capacity} places</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isPast && event.replay_url ? (
          onReplayClick ? (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => onReplayClick(event)}
            >
              <Play className="h-4 w-4 mr-2" />
              Voir le replay
            </Button>
          ) : (
            <Button asChild variant="secondary" className="w-full">
              <Link href={event.replay_url} target="_blank">
                <Play className="h-4 w-4 mr-2" />
                Voir le replay
              </Link>
            </Button>
          )
        ) : event.registration_url ? (
          <Button asChild className="w-full">
            <Link href={event.registration_url} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              S&apos;inscrire
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
