import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EventCardCompactProps {
  title: string;
  date: string;
  registrationUrl: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export function EventCardCompact({
  title,
  date,
  registrationUrl,
  imageUrl = "/images/thumbnail_gab4.webp",
  imageAlt,
  className,
}: EventCardCompactProps) {
  return (
    <Card className={`overflow-hidden border-white/20 bg-black/60 backdrop-blur-md ${className || ""}`}>
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <h3 className="font-heading text-lg font-semibold mb-3 text-white">
          {title}
        </h3>
        <Button asChild className="w-full">
          <Link href={registrationUrl}>
            S&apos;inscrire
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
