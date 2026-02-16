"use client";

import { Calendar, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn, formatEventDate } from "@/lib/utils";
import { CITY_BADGE_COLORS } from "@/lib/utils/filter-events";
import type { Event } from "@/lib/types/content";

interface VideoPlayerModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;

    if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  } catch {
    // Invalid URL
  }
  return null;
}

export function VideoPlayerModal({
  event,
  open,
  onOpenChange,
}: VideoPlayerModalProps) {
  const embedUrl = event?.replay_url
    ? getYouTubeEmbedUrl(event.replay_url)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        {event && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{event.title}</DialogTitle>
              <DialogDescription asChild>
                <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatEventDate(event.event_date)}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  )}
                  <Badge
                    variant="outline"
                    className={cn("text-xs", CITY_BADGE_COLORS[event.city])}
                  >
                    {event.city}
                  </Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            {/* Video embed - unmounted when dialog closes to stop playback */}
            {embedUrl && (
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                <iframe
                  src={embedUrl}
                  title={event.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {event.description && (
              <div className="text-sm text-muted-foreground whitespace-pre-line line-clamp-6">
                {event.description.replace(/[#*_]/g, "")}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
